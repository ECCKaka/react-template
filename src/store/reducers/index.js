
import * as actionTypes from "../action-types";
import { combineReducers } from 'redux';
import loading from './loading';
let reducers = {
    loading,
}
let combinedReducer = combineReducers(reducers) ;
const rootReducer = (state, action) => {
    if (action.type === actionTypes.LOGOUT) {
      return combinedReducer(undefined, action)
    }
  
    return combinedReducer(state, action)
  }
export default rootReducer;
