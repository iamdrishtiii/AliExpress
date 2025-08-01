import * as actions from './actionTypes'
export const initState = {
       products: [],
       categories: [],
       cartItems: [],
       wishlistItems: [],
}
const reducer = (state = initState, action) => {
       switch (action.type) {
              case actions.GET_PRODUCTS:
                     return { ...state, products: action.payload }
              case actions.GET_CATEGORIES:
                     return { ...state, categories: action.payload }

              case actions.ADD_TO_CART:
                     const item = action.payload;
                     const exists = state.cartItems.find((x) => x.id === item.id);
                     if (exists) {
                            return {
                                   ...state,
                                   cartItems: state.cartItems.map((x) =>
                                          x.id === item.id ? { ...x, quantity: x.quantity + 1 } : x
                                   ),
                            };
                     } else {
                            return {
                                   ...state,
                                   cartItems: [...state.cartItems, { ...item, quantity: 1 }],
                            };
                     }
              case actions.ADD_TO_WISHLIST:
                     const itemm = action.payload;
                     const existss = state.wishlistItems.find((x) => x.id === itemm.id);
                     if (existss) {
                            return {
                                   ...state,
                                   wishlistItems: state.wishlistItems.map((x) =>
                                          x.id === itemm.id ? { ...x, quantity: x.quantity + 1 } : x
                                   ),
                            };
                     } else {
                            return {
                                   ...state,
                                   wishlistItems: [...state.wishlistItems, { ...itemm, quantity: 1 }],
                            };
                     }

              case actions.INCREASE_QUANTITY:
                     return {
                            ...state,
                            cartItems: state.cartItems.map((item) =>
                                   item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
                            ),
                     };


              case actions.DECREASE_QUANTITY:
                     return {
                            ...state,
                            cartItems: state.cartItems
                                   .map((item) =>
                                          item.id === action.payload && item.quantity > 1
                                                 ? { ...item, quantity: item.quantity - 1 }
                                                 : item
                                   )
                                   .filter((item) => item.quantity > 0),
                     };


              case actions.REMOVE_FROM_CART:
                     return {
                            ...state,
                            cartItems: state.cartItems.filter((item) => item.id !== action.payload),
                     };
              case actions.REMOVE_FROM_WISHLIST:
                     return {
                            ...state,
                            wishlistItems: state.wishlistItems.filter((item) => item.id !== action.payload),
                     };

              default:
                     return state
       }
}
export default reducer