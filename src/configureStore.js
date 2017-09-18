import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
//import logger from 'redux-logger'
import Sherlockholmes from 'sherlockholmes'
import reducers from './reducers'

const { inspector } = new Sherlockholmes()

export default (initialState) => {
  const middlewares = [thunk, inspector]

  const enhancer = compose(
    applyMiddleware(...middlewares)
  )

  const store = createStore(reducers, initialState, enhancer)
  
  return store
}