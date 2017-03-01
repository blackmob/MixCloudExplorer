import {
    GET_SHOW_DATA,
    GET_SHOW_DATA_ERROR,
    GET_SHOW_DATA_RECEIVED,
} from '../constants/actionTypes';

import { handleActions } from 'redux-actions';

const initialState = {
    shows :[],
    selectedShowUrl : null
};

export default handleActions({
    [GET_SHOW_DATA]: (state, action) => {
        return initialState;
    },
    [GET_SHOW_DATA_ERROR]: (state, action) => {
        return initialState;
    },
    [GET_SHOW_DATA_RECEIVED]: (state, action) => {
        return {...state, shows: action.payload.shows, selectedShowUrl : action.payload.selectedShowUrl };
    }
}, initialState);