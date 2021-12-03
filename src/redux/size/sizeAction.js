export const SET_SIZE='SET_SIZE';
export const SET_SIZE_BY_ID='SET_SIZE_BY_ID';
export const ADD_SIZE= 'ADD_SIZE';
export const UPDATE_SIZE = 'UPDATE_SIZE';
export const DELETE_SIZE = 'DELETE_SIZE';


export const setSize =(size=[]) => {
    return {
        size,
        type:SET_SIZE
    }
}

export const setSizeById =(id='', size={}) => {
    return {
        id,
        size,
        type:SET_SIZE_BY_ID
    }
}

export const addSize =(size={}) => {
    return {
        size,
        type: ADD_SIZE
    }
}

export const updateSize = (id ='', newValue='') =>{
    return {
        id,
        newValue,
        type: UPDATE_SIZE
    }
}

export const deleteSize =(id) => {
    return {
        id,
        type: DELETE_SIZE
    }
}