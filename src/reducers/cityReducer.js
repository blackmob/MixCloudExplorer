import { handleActions } from 'redux-actions';
import {
    GET_CITY_DATA,
    GET_CITY_DATA_ERROR,
    GET_CITY_DATA_RECEIVED
} from '../constants/actionTypes';


const initialState = {
    feeds :[],
    selectedFeedUrl : null
};

export default handleActions({
    [GET_CITY_DATA]: (state, action) => {
        return initialState;
    },
    [GET_CITY_DATA_ERROR]: (state, action) => {
        return initialState;
    },
    [GET_CITY_DATA_RECEIVED]: (state, action) => {
        return {...state, feeds: action.payload.feeds, selectedFeedUrl : action.payload.selectedFeedUrl };
    }
}, initialState);