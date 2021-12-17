
import {SET_PRODUCT, ADD_PRODUCT, DELETE_PRODUCT} from './productAction'

const INIT_STATE ={
    products: []
}

const productReducer=(state=INIT_STATE, action) => {
    const {products} = state;
    const list = JSON.parse(JSON.stringify(products));
    
    switch (action.type) {
        case SET_PRODUCT: 
            return {...state, products: action.product}
        case DELETE_PRODUCT: 
            return Object.assign({}, state, {
                products: list.filter((product) => product._id !== action.id)
            })
        case ADD_PRODUCT:
            return Object.assign({}, state, {
                products: [...list, action.product]
            })
        default:
            return state;
    }
}

export default productReducer;