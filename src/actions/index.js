
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

