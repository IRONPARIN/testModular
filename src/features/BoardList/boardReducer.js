import { 
  INVALIDATE_REDDIT,
  INVALIDATE_AFTER, 
  REQUEST_POSTS, 
  RECEIVE_POSTS, 
  REQUEST_AFTER, 
  RECEIVE_AFTER, 
  REQUEST_TOP
} from '../../constants/ActionTypes';

const posts = (state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) => {
  switch (action.type) {
    case INVALIDATE_REDDIT:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_POSTS:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_POSTS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: action.posts,
        lastUpdated: action.receivedAt,
        after: action.after
      }
    case REQUEST_AFTER:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_AFTER:
    return {
      ...state,
      isFetching: false,
      didInvalidate: false,
      items: [...state.items, ...action.posts],
      lastUpdated: action.receivedAt,
      after: action.after
    }
    case REQUEST_TOP:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    default:
      return state
  }
}

const boardByReddit = (state = { }, action) => {
  switch (action.type) {
    case INVALIDATE_REDDIT:
    case RECEIVE_POSTS:
    case REQUEST_POSTS:
    case RECEIVE_AFTER:
    case REQUEST_AFTER:
    case INVALIDATE_AFTER:
      return {
        ...state,
        catBoard: action.catBoard,
        [action.catBoard]: posts(state[action.catBoard], action)
      }
    default:
      return state
  }
}

export default boardByReddit