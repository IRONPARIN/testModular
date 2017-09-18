import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { connect } from 'react-redux'
import Loading from '../../common/loading/Loading';
import { fetchDetailIfNeeded } from './datailAction';
import DetailCard from './DetailCard.js';
import { CommentList } from '../CommentList';
import { project } from '../../config';

const projectName = project.name

class DetailView extends Component {
  componentDidMount() {
    const { dispatch, dataName } = this.props
    dispatch(fetchDetailIfNeeded(dataName))
  }

  render() { 
    const dataItem = this.props.items
    const img = dataItem && dataItem[0] && dataItem[0].preview ? dataItem[0].preview.images[0].source.url : null
    return ( 
      <View style={styles.container}>
        <ScrollView>
          { this.props.isFetching ? <Loading /> : null }
          { dataItem && dataItem[0] ?  
            <DetailCard 
              image={img}
              title={dataItem[0].title}
              score={dataItem[0].score}
              user={dataItem[0].author}
              date={dataItem[0].created}
              numComment={dataItem[0].num_comments}
            />      
            : null
          }
          <CommentList 
            comment={this.props.comment}
          />
        </ScrollView>
      </View>
    )
    
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});

const mapStateToProps = (state, ownProps) => {
  const { detail } = state[projectName]
  console.log('dd : ',detail)
  const { 
    isFetching, 
    lastUpdated, 
    items, 
    didInvalidate 
  } = detail[ownProps.dataName] || { isFetching: true, itemsDetail: [] }  
  return {    
    isFetching, 
    lastUpdated, 
    items, 
    didInvalidate 
  }
}

export default connect(mapStateToProps)(DetailView)
