import * as types from '../constants/actionTypes';

import { createAction } from 'redux-actions';

export const getShowData = createAction(
    types.GET_SHOW_DATA, () => ({shows : null, selectedShowUrl : null}));

export const getShowDataError = createAction(
    types.GET_SHOW_DATA_ERROR, () => ({shows : null, selectedShowUrl : null}));

export const getShowDataReceived = createAction(
    types.GET_SHOW_DATA_RECEIVED, (shows) => ({        
        shows: shows.map(i => i)
    }));

export const fetchShowFeeds = (show) => {
    return (dispatch, getState) => {
        dispatch(getShowData());
        return fetch(`https://api.mixcloud.com/search/?q=${show}&type=cloudcast`).then((results)=>{   
            return results.json().then((r)=>{
                return dispatch(getShowDataReceived(r.data));
            });
        }).catch((e) => {
            dispatch(getShowDataError());
        });
    };
};