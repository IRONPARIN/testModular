import { combineReducers } from 'redux'
import catByReddit from './CatList/catListReducer'
import boardByReddit from './BoardList/boardReducer';
import commentByReddit from './CommentList/commentReducer';
import detailByReddit from './DetailItem/detailReducer';

export default combineReducers({
  catagories: catByReddit,
  board: boardByReddit,
  comment: commentByReddit,
  detail: detailByReddit
});
