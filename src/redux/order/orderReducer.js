import { SET_ORDER, ADD_ORDER, DELETE_ORDER } from "./orderAction";

const INIT_STATE = {
  orders: [],
};

const orderReducer = (state = INIT_STATE, action) => {
  const { orders } = state;
  const list = JSON.parse(JSON.stringify(orders));

  switch (action.type) {
    case SET_ORDER:
      return { ...state, orders: action.order };
    case DELETE_ORDER:
      return Object.assign({}, state, {
        orders: list.filter((order) => order.id !== action.id),
      });
    case ADD_ORDER:
      return Object.assign({}, state, {
        orders: [...list, action.order],
      });
    default:
      return state;
  }
};

export default orderReducer;
