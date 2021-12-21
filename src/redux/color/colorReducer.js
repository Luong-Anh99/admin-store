
import {SET_COLOR, ADD_COLOR, DELETE_COLOR} from './colorAction'

const INIT_STATE ={
    colors: []
}

const colorReducer=(state=INIT_STATE, action) => {
    const {colors} = state;
    const list = JSON.parse(JSON.stringify(colors));

    
    switch (action.type) {
        case SET_COLOR: 
            return {...state, colors: action.color}
        case DELETE_COLOR: 
            return Object.assign({}, state, {
                colors: list.filter((color) => color._id !== action.id)
            })
        case ADD_COLOR:
            return Object.assign({}, state, {
                colors: [...list, action.color]
            })
        default:
            return state;
    }
}

export default colorReducer;