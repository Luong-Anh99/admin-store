
import {SET_CATEGORY, ADD_CATEGORY, UPDATE_CATEGORY, DELETE_CATEGORY} from './categoryAction'

const INIT_STATE ={
    categories: []
}

const categoryReducer=(state=INIT_STATE, action) => {
    const {categories} = state;
    const list = JSON.parse(JSON.stringify(categories));

    
    switch (action.type) {
        case SET_CATEGORY: 
            return {...state, categories: action.category}
        case DELETE_CATEGORY: 
            return Object.assign({}, state, {
                categories: list.filter((category) => category._id !== action.id)
            })
        case ADD_CATEGORY:
            return Object.assign({}, state, {
                categories: [...list, action.category]
            })
        default:
            return state;
    }
}

export default categoryReducer;