import { REQUEST_CAT, RECEIVE_CAT, REQUEST_AFTERCAT, RECEIVE_AFTERCAT } from '../../constants/ActionTypes';

const catByReddit = (state = {
  isFetching: false,
  didInvalidate: false,
  itemsCat: []
}, action) => {
  switch (action.type) {
    case REQUEST_CAT:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_CAT:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        itemsCat: action.posts,
        lastUpdated: action.receivedAt
      }
    case REQUEST_AFTERCAT:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_AFTERCAT:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        itemsCat: [ ...state.itemsCat, ...action.posts],
        lastUpdated: action.receivedAt
      }
    default:
      return state
  }
}

export default catByReddit