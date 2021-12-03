export const SET_CATEGORY='SET_CATEGORY';
export const SET_CATEGORY_BY_ID='SET_CATEGORY_BY_ID';
export const ADD_CATEGORY= 'ADD_CATEGORY';
export const UPDATE_CATEGORY = 'UPDATE_CATEGORY';
export const DELETE_CATEGORY = 'DELETE_CATEGORY';


export const setCategory =(category=[]) => {
    return {
        category,
        type:SET_CATEGORY
    }
}

export const setCategoryById =(id='', category={}) => {
    return {
        id,
        category,
        type:SET_CATEGORY_BY_ID
    }
}

export const addCategory =(category={}) => {
    return {
        category,
        type: ADD_CATEGORY
    }
}

export const updateCategory = (id ='', newValue='') =>{
    return {
        id,
        newValue,
        type: UPDATE_CATEGORY
    }
}

export const deleteCategory =(id) => {
    return {
        id,
        type: DELETE_CATEGORY
    }
}