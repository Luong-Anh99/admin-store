export const SET_PRODUCT = "SET_PRODUCT";
export const SET_PRODUCT_BY_ID = "SET_PRODUCT_BY_ID";
export const ADD_PRODUCT = "ADD_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const DELETE_PRODUCT = "DELETE_PRODUCT";

export const setProduct = (product = []) => {
  return {
    product,
    type: SET_PRODUCT,
  };
};

export const setProductById = (id = "", product = {}) => {
  return {
    id,
    product,
    type: SET_PRODUCT_BY_ID,
  };
};

export const addProduct = (product = {}) => {
  return {
    product,
    type: ADD_PRODUCT,
  };
};

export const updateProduct = (id = "", newValue = "") => {
  return {
    id,
    newValue,
    type: UPDATE_PRODUCT,
  };
};

export const deleteProduct = (id) => {
  return {
    id,
    type: DELETE_PRODUCT,
  };
};
