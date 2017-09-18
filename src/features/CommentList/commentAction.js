import { REQUEST_COM, RECEIVE_COM } from '../../constants/ActionTypes';
import { project } from '../../config';

export const requestCom = (comment) => ({
  type: REQUEST_COM,
  comment
})

export const receiveCom = (json, comment) => ({  
  type: RECEIVE_COM,
  comment,
  posts: json[1].data.children.map(child => child.data),
  receivedAt: Date.now()
})

export const fecthComment = (comment) => {
  console.log('commentlink : ', `https://www.reddit.com${comment}.json`)
  return (dispatch) => {
    dispatch(requestCom(comment))    
    return fetch(`https://www.reddit.com${comment}.json`)
      .then(response => response.json())
      .then(json => dispatch(receiveCom(json, comment)))
  }
}

const shouldFetchCom = (state, comment) => {
  console.log('ssstate : ',state)
  const posts = state[project.name].comment[comment]
  if (!posts) {
    return true
  }
  if (posts.isFetching) {
    return false
  }
  return posts.didInvalidate
}

export const fetchCommentIfNeeded = (comment) => {
  return (dispatch, getState) => {
    if (shouldFetchCom(getState(), comment)) {
      return dispatch(fecthComment(comment))
    }
    return dispatch(fecthComment(comment))
  }
}