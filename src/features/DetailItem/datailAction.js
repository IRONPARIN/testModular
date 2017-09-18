import { 
  INVALIDATE_DETAIL, 
  RECEIVE_DETAIL, 
  REQUEST_DETAIL 
} from '../../constants/ActionTypes';
import { project } from '../../config';

export const invalidateReddit = (dataName) => ({
  type: INVALIDATE_DETAIL,
  dataName
})

export const requestDetail = (dataName) => ({
  type: REQUEST_DETAIL,
  dataName
})

export const receiveDetail = (dataName, json) => ({  
  type: RECEIVE_DETAIL,
  dataName,
  posts: json.data.children.map(child => child.data),
  after: json.data.after,
  receivedAt: Date.now()
})

export const fecthDetail = (dataName) => {
  return (dispatch) => {
    dispatch(requestDetail(dataName))    
    return fetch(`https://www.reddit.com/by_id/${dataName}.json`)
      .then(response => response.json())
      .then(json => dispatch(receiveDetail(dataName, json)))      
  }
}

const shouldFetchDetail = (state, dataName) => {
  const posts = state[project.name].detail[dataName]
  if (!posts) {
    return true
  }
  if (posts.isFetching) {
    return false    
  }
  return posts.didInvalidate
}

export const fetchDetailIfNeeded = (dataName) => {
  return (dispatch, getState) => {
    if (shouldFetchDetail(getState(), dataName)) {
      return dispatch(fecthDetail(dataName))
    }
    return dispatch(fecthDetail(dataName))
  }
}