import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

export const currentUserId = (currentUserId = null, action) => {
    switch (action.type) {
        case 'USER_INFO':
            return action.payload;
        default:
            return currentUserId;
    }
}

export const allSnaps = (snaps = null, action) => {
    switch (action.type){
        case 'ALL_SNAPS':
          return action.payload
        case 'CREATE_SNAP':
          return { }
        default:
            return snaps
    }
}

export default combineReducers({
    currentUserId: currentUserId,
    snaps: allSnaps,
    form: formReducer
})