import cityReducer from './cityReducer';
import {combineReducers} from 'redux';
import showReducer from './showReducer';

const rootReducer = combineReducers({city : cityReducer, show : showReducer });
export default rootReducer;

