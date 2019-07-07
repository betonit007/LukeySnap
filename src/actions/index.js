import calls from '../apis/calls';

export const getUserId = id => {
    return {
        type: 'USER_INFO',
        payload: id
    };
};

export const getStoredSnaps = (snaps) => {
    
        return {
            type: 'ALL_SNAPS',
            payload: snaps
        }
    };

export const getGifs = () => async (dispatch) => {
  const res = await calls.get('video games&limit=25&offset=0&rating=G&lang=en');
  
  dispatch({ type: 'GET_GIFS', payload: res.data });
}

