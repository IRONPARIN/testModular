import React, { Component } from 'react';
import { 
  View, 
  Text, 
  StyleSheet,
  ListView,
  FlatList,
  ActivityIndicator,
  Dimensions
} from 'react-native';
import { 
  List, 
  ListItem
} from 'react-native-elements';
import { connect } from 'react-redux'
import { assign } from 'lodash';
import { Actions } from 'react-native-router-flux';
import ItemBoardList from './ItemBoardList';
import Loading from '../../common/loading/Loading';
import { fetchPostsAfterIfNeeded, fetchPostsIfNeeded } from './boardAction';
import { project } from '../../config';

const { height, width } = Dimensions.get('screen')
const projectName = project.name

class ListBoard extends Component {
  constructor(props) {
    super(props) 
  }

  componentDidMount = () => {
    this.props.dispatch(fetchPostsIfNeeded('all'))
  }
  
  _keyExtractor = (item, index) => index;
  
  _renderItem = ({item}) => {      
    //console.log('item',item)
    const img = item.preview ? item.preview.images[0].source.url : null
    return (
      <ItemBoardList
        title={item.title}
        avatar={img} 
        name={item.name}  
        comment={item.permalink} 
        numComment={item.num_comments}
        score={item.score}
        date={item.created}
        user={item.author}
        onPress={() => Actions.modularDetail({dataName: item.name , comment: item.permalink})}
      />
    )
  }

  _onEndReached = (getAfter, catBoard) => {    
    this.props.dispatch(fetchPostsAfterIfNeeded(getAfter, catBoard))
  }

  render() {        
    console.log('props',this.props)    
    return (
      <View style={{height: height+180}}>
        { this.props.isFetching ? <Loading /> : null }
        <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0, marginTop: 0 }}>
          <FlatList
            ref="listRef"
            data={this.props.items}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
            horizontal={false}       
            showsHorizontalScrollIndicator={false}  
            onEndReached={ () => this._onEndReached(this.props.after,this.props.typeBoard) }    
          />
        </List>        
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { board } = state[projectName]
  const typeBoard = board.catBoard
  console.log('bbr : ',state[projectName].board)
  const { 
    isFetching, 
    lastUpdated, 
    items, 
    after, 
    didInvalidate 
  } = board[typeBoard] || { isFetching: true, items: [] }
  return {    
    items,
    isFetching,
    lastUpdated,
    after,
    didInvalidate,
    typeBoard
  }
}

export default connect(mapStateToProps)(ListBoard);
