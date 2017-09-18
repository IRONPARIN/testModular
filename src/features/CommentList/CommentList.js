import React, { Component } from 'react';
import { View, Text, StyleSheet, List, FlatList } from 'react-native';
import { connect } from 'react-redux'
import { fetchCommentIfNeeded } from './commentAction';
import CommentCard from './CommentCard';
import Loading from '../../common/loading/Loading';
import { project } from '../../config';

const projectName = project.name

class CommentList extends Component {
  componentDidMount() {
    const { dispatch, comment } = this.props
    dispatch(fetchCommentIfNeeded(comment))
  }

  mapCommentItem = (item) => {
    //console.log('tesd',item)
    let commentCardData = []
    let repileData = []
    for (let i = 0; i < item.length-1; i++) {
      commentCardData = [...commentCardData,
        <View style={{paddingLeft:10}}>
          <CommentCard 
            user={item[i].author}
            time={item[i].created}
            comment={item[i].body}
            key={item[i].id}
          />  
          {
            item[i].replies ?    
            this.mapCommentItem(item[i].replies.data.children.map(child => child.data)) : null
          }
        </View>        
      ]        
    }
    //console.log('item i : ', commentCardData)
    return commentCardData
  }

  render() { 
    const commentData = this.props.items
    return (
      <View style={styles.container}> 
        { this.props.isFetching ? <Loading /> : null } 
        { commentData ? this.mapCommentItem(commentData) : null }                 
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: '#fff',
  },
});

const mapStateToProps = (state, ownProps) => {
  const { comment } = state[projectName]
  const { 
    isFetching, 
    lastUpdated, 
    items, 
    didInvalidate 
  } = comment[ownProps.comment] || { isFetching: true, itemsDetail: [] }
  return {    
    isFetching, 
    lastUpdated, 
    items, 
    didInvalidate 
  }
}

export default connect(mapStateToProps)(CommentList);
