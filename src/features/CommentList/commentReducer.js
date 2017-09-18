import { REQUEST_COM, RECEIVE_COM, INVALIDATE_COM } from '../../constants/ActionTypes';

const commentData = (state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) => {
  switch (action.type) {
    case INVALIDATE_COM:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_COM:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_COM:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: action.posts,
        lastUpdated: action.receivedAt
      }
    default:
      return state
  }
}

const commentByReddit = (state = { }, action) => {
  switch (action.type) {
    case INVALIDATE_COM:
    case RECEIVE_COM:
    case REQUEST_COM:
      return {
        ...state,
        [action.comment]: commentData(state[action.comment], action)
      }
    default:
      return state
  }
}

export default commentByReddit