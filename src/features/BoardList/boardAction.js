import { 
  REQUEST_POSTS, 
  RECEIVE_POSTS, 
  INVALIDATE_REDDIT,
  INVALIDATE_AFTER,
  RECEIVE_AFTER,
  REQUEST_AFTER,
  REQUEST_TOP,
} from '../../constants/ActionTypes';
import { project } from '../../config';

export const invalidateReddit = (catBoard) => ({
  type: INVALIDATE_REDDIT,
  catBoard
})

export const requestPosts = (catBoard) => ({
  type: REQUEST_POSTS,
  catBoard
})

export const receivePosts = (catBoard, json) => ({  
  type: RECEIVE_POSTS,
  catBoard,
  posts: json.data.children.map(child => child.data),
  after: json.data.after,
  receivedAt: Date.now()
})

export const fecthBoard = (catBoard) => {
  return (dispatch) => {
    dispatch(requestPosts(catBoard))    
    return fetch(`https://www.reddit.com/r/${catBoard}.json`)
      .then(response => response.json())
      .then(json => dispatch(receivePosts(catBoard, json)))
  }
}

const shouldFetchPosts = (state, catBoard) => {
  const posts = state[project.name].board[catBoard]
  if (!posts) {
    return true
  }
  if (posts.isFetching) {
    return false    
  }
  return posts.didInvalidate
}

export const fetchPostsIfNeeded = (catBoard) => {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), catBoard)) {
      return dispatch(fecthBoard(catBoard))
    }
    return dispatch(fecthBoard(catBoard))
  }
}

//FecthAfterBoard
export const requestBoardAfter = (getAfter, catBoard) => ({
  type: REQUEST_AFTER,
  getAfter, 
  catBoard
})

export const receiveBoardAfter = (getAfter, catBoard, json) => ({  
  type: RECEIVE_AFTER,
  getAfter, 
  catBoard,
  posts: json.data.children.map(child => child.data),
  after: json.data.after,
  receivedAt: Date.now()
})

export const fecthBoardAfter = (getAfter, catBoard) => {
  return (dispatch) => {
    dispatch(requestBoardAfter(getAfter, catBoard))    
    return fetch(`https://www.reddit.com/r/${catBoard}/.json?after=${getAfter}`)
      .then(response => response.json())
      .then(json => dispatch(receiveBoardAfter(getAfter, catBoard, json)))
  }
}

const shouldFetchBoardAfter = (state, getAfter, catBoard) => {
  const postsAfter = state[project.name].board[catBoard]
  if (!postsAfter) {
    return true
  }
  if (postsAfter.isFetching) {
    return false    
  }
  return postsAfter.didInvalidate
}

export const fetchPostsAfterIfNeeded = (getAfter, catBoard) => {
  return (dispatch, getState) => {
    if (shouldFetchBoardAfter(getState(), getAfter, catBoard)) {
      return dispatch(fecthBoardAfter(getAfter, catBoard))
    }
    return dispatch(fecthBoardAfter(getAfter, catBoard))
  }
}

//fecthTopBoard
export const requestTopBoard = (catBoard) => ({
  type: REQUEST_TOP,  
  catBoard
})

export const receiveTopBoard = (catBoard, json) => ({  
  type: RECEIVE_POSTS,  
  catBoard,
  posts: json.data.children.map(child => child.data),
  after: json.data.after,
  receivedAt: Date.now()
})

export const fecthTopBoard = (topBoard, catBoard) => {
  return (dispatch) => {
    dispatch(requestTopBoard(catBoard))    
    return fetch(`https://www.reddit.com/r/${catBoard}/${topBoard}.json`)
      .then(response => response.json())
      .then(json => dispatch(receiveTopBoard(catBoard, json)))
  }
}

const shouldFetchTopBoard = (state, topBoard, catBoard) => {
  const postsTop = state[project.name].board[catBoard]
  if (!postsTop) {
    return true
  }
  if (postsTop.isFetching) {
    return false    
  }
  return postsTop.didInvalidate
}

export const fetchTopBoardIfNeed = (topBoard, catBoard) => {
  return (dispatch, getState) => {
    if (shouldFetchTopBoard(getState(), topBoard, catBoard)) {
      return dispatch(fecthTopBoard(topBoard, catBoard))
    }
    return dispatch(fecthTopBoard(topBoard, catBoard))
  }
}