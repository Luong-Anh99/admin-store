
import {SET_USER, ADD_USER, UPDATE_USER, DELETE_USER} from './userAction'

const INIT_STATE ={
    users: []
}

const userReducer=(state=INIT_STATE, action) => {
    const {users} = state;
    const list = JSON.parse(JSON.stringify(users));

    
    switch (action.type) {
        case SET_USER: 
            return {...state, users: action.user}
        case DELETE_USER: 
            return Object.assign({}, state, {
                users: list.filter((user) => user._id !== action.id)
            })
        case ADD_USER:
            return Object.assign({}, state, {
                users: [...list, action.user]
            })
        default:
            return state;
    }
}

export default userReducer;