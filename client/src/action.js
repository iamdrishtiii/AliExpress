import * as actions from "./actionTypes"
import { categoryurl, producturl } from "./assets/api"

export const getproducts = () => {
       return async (dispatch) => {
              const url = producturl
              try {
                     const response = await fetch(url);
                     const result = await response.json();


                     // console.log(result)
                     dispatch(
                            ((product) => {
                                   return {
                                          type: actions.GET_PRODUCTS,
                                          payload: product,
                                   }
                            })(result)
                     )
              }
              catch (error) {
                     console.log(error)
              }
       }
}


export const getcategories = () => {
       return async (dispatch) => {
              const url = categoryurl
              try {
                     const response = await fetch(url);
                     const result = await response.json();

                     // console.log(result)
                     dispatch(
                            ((category) => {
                                   return {
                                          type: actions.GET_CATEGORIES,
                                          payload: category,
                                   }
                            })(result)
                     )
              }
              catch (error) {
                     console.log(error)
              }
       }
}

export const addToCart = (item) => {
  return {
    type: actions.ADD_TO_CART,
    payload: item,
  };
};

export const addToWishlist = (item) => {
  return {
    type: actions.ADD_TO_WISHLIST,
    payload: item,
  };
};

export const increaseQuantity = (id) => ({
  type: actions.INCREASE_QUANTITY,
  payload: id,
});

export const decreaseQuantity = (id) => ({
  type: actions.DECREASE_QUANTITY,
  payload: id,
});

export const removeFromCart = (id) => ({
  type: actions.REMOVE_FROM_CART,
  payload: id,
});


export const removeFromWishlist = (id) => ({
  type: actions.REMOVE_FROM_WISHLIST,
  payload: id,
});