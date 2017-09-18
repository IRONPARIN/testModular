import { 
  RECEIVE_CAT, 
  REQUEST_CAT,
  INVALIDATE_AFTERCAT,
  RECEIVE_AFTERCAT,
  REQUEST_AFTERCAT 
} from '../../constants/ActionTypes';
import { project } from '../../config';

export const requestCat = () => ({
  type: REQUEST_CAT
})

export const receiveCat = (json) => ({  
  type: RECEIVE_CAT,
  posts: json.data.children.map(child => child.data),
  after: json.data.after,
  receivedAt: Date.now()
})

export const fecthCat = () => {
  return (dispatch) => {
    dispatch(requestCat())    
    return fetch(`https://www.reddit.com/subreddits.json`)
      .then(response => response.json())
      .then(json => dispatch(receiveCat(json)))
  }
}

const shouldFetchCat = (state) => {
  const posts = state[project.name].catagories
  if (!posts) {
    return true
  }
  if (posts.isFetching) {
    return false
  }
  return posts.didInvalidate
}

export const fetchCatIfNeeded = () => {
  return (dispatch, getState) => {
    if (shouldFetchCat(getState())) {
      return dispatch(fecthCat())
    }
    return dispatch(fecthCat())
  }
}

//fetchAfterCatagories
export const requestCatAfter = (afterCat) => ({
  type: REQUEST_AFTERCAT
})

export const receiveCatAfter = (afterCat, json) => ({  
  type: RECEIVE_AFTERCAT,
  posts: json.data.children.map(child => child.data),
  after: json.data.after,
  receivedAt: Date.now()
})

export const fecthCatAfter = (afterCat) => {
  return (dispatch) => {
    dispatch(requestCatAfter(afterCat))    
    return fetch(`https://www.reddit.com/subreddits.json?after=${afterCat}`)
      .then(response => response.json())
      .then(json => dispatch(receiveCatAfter(afterCat, json)))
  }
}

const shouldFetchCatAfter = (state, afterCat) => {
  const posts = state.catagories
  if (!posts) {
    return true
  }
  if (posts.isFetching) {
    return false    
  }
  return posts.didInvalidate
}

export const fetchCatAfterIfNeeded = (afterCat) => {
  return (dispatch, getState) => {
    if (shouldFetchCatAfter(getState(), afterCat)) {
      return dispatch(fecthCatAfter(afterCat))
    }
    return dispatch(fecthCatAfter(afterCat))
  }
}