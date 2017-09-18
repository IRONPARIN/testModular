import { INVALIDATE_DETAIL, RECEIVE_DETAIL, REQUEST_DETAIL } from '../../constants/ActionTypes';

const detail = (state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) => {
  switch (action.type) {
    case INVALIDATE_DETAIL:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_DETAIL:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_DETAIL:
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

const detailByReddit = (state = { }, action) => {
  switch (action.type) {
    case INVALIDATE_DETAIL:
    case RECEIVE_DETAIL:
    case REQUEST_DETAIL:
      return {
        ...state,
        [action.dataName]: detail(state[action.dataName], action)
      }
    default:
      return state
  }
}

export default detailByReddit