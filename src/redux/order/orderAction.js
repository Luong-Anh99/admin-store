export const SET_ORDER='SET_ORDER';
export const SET_ORDER_BY_ID='SET_ORDER_BY_ID';
export const ADD_ORDER= 'ADD_ORDER';
export const UPDATE_ORDER = 'UPDATE_ORDER';
export const DELETE_ORDER = 'DELETE_ORDER';


export const setOrder =(order=[]) => {
    return {
        order,
        type:SET_ORDER
    }
}

export const setOrderById =(id='', order={}) => {
    return {
        id,
        order,
        type:SET_ORDER_BY_ID
    }
}

export const addOrder =(order={}) => {
    return {
        order,
        type: ADD_ORDER
    }
}

export const updateOrder = (id ='', newValue='') =>{
    return {
        id,
        newValue,
        type: UPDATE_ORDER
    }
}

export const deleteOrder =(id) => {
    return {
        id,
        type: DELETE_ORDER
    }
}