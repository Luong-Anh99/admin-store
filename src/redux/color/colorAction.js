export const SET_COLOR='SET_COLOR';
export const SET_COLOR_BY_ID='SET_COLOR_BY_ID';
export const ADD_COLOR= 'ADD_COLOR';
export const UPDATE_COLOR = 'UPDATE_COLOR';
export const DELETE_COLOR = 'DELETE_COLOR';


export const setColor =(color=[]) => {
    return {
        color,
        type:SET_COLOR
    }
}

export const setColorById =(id='', color={}) => {
    return {
        id,
        color,
        type:SET_COLOR_BY_ID
    }
}

export const addColor =(color={}) => {
    return {
        color,
        type: ADD_COLOR
    }
}

export const updateColor = (id ='', newValue='') =>{
    return {
        id,
        newValue,
        type: UPDATE_COLOR
    }
}

export const deleteColor =(id) => {
    return {
        id,
        type: DELETE_COLOR
    }
}