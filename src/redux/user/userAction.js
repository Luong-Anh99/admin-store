export const SET_USER='SET_USER';
export const SET_USER_BY_ID='SET_USER_BY_ID';
export const ADD_USER= 'ADD_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const DELETE_USER = 'DELETE_USER';


export const setUser =(user=[]) => {
    return {
        user,
        type:SET_USER
    }
}

export const setUserById =(id='', user={}) => {
    return {
        id,
        user,
        type:SET_USER_BY_ID
    }
}

export const addUser =(user={}) => {
    return {
        user,
        type: ADD_USER
    }
}

export const updateUser = (id ='', newValue='') =>{
    return {
        id,
        newValue,
        type: UPDATE_USER
    }
}

export const deleteUser =(id) => {
    return {
        id,
        type: DELETE_USER
    }
}