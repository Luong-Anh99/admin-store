
import {SET_SIZE, ADD_SIZE, DELETE_SIZE} from './sizeAction'

const INIT_STATE ={
    sizes: []
}

const sizeReducer=(state=INIT_STATE, action) => {
    const {sizes} = state;
    const list = JSON.parse(JSON.stringify(sizes));

    
    switch (action.type) {
        case SET_SIZE: 
            return {...state, sizes: action.size}
        case DELETE_SIZE: 
            return Object.assign({}, state, {
                sizes: list.filter((size) => size._id !== action.id)
            })
        case ADD_SIZE:
            return Object.assign({}, state, {
                sizes: [...list, action.size]
            })
        default:
            return state;
    }
}

export default sizeReducer;