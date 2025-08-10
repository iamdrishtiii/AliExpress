import * as actions from './actionTypes'
export const initState = {
       cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
       wishlistItems: JSON.parse(localStorage.getItem("wishlistItems")) || [],
       products: [],
       categories: []
};

const reducer = (state = initState, action) => {
       switch (action.type) {
              case actions.GET_PRODUCTS:
                     return { ...state, products: action.payload }
              case actions.GET_CATEGORIES:
                     return { ...state, categories: action.payload }

              case actions.ADD_TO_CART: {
                     const item = action.payload;
                     const exists = state.cartItems.find((x) => x.id === item.id);
                     let updatedCart;

                     if (exists) {
                            updatedCart = state.cartItems.map((x) =>
                                   x.id === item.id ? { ...x, quantity: x.quantity + (item.quantity || 1) } : x
                            );
                     } else {
                            updatedCart = [...state.cartItems, { ...item, quantity: (item.quantity || 1) }];
                     }

                     localStorage.setItem("cartItems", JSON.stringify(updatedCart));

                     return { ...state, cartItems: updatedCart };
              }

              case actions.ADD_TO_WISHLIST: {
                     const itemm = action.payload;
                     const existss = state.wishlistItems.find((x) => x.id === itemm.id);
                     let updatedWishlist;

                     if (existss) {
                            updatedWishlist = state.wishlistItems.map((x) =>
                                   x.id === itemm.id ? { ...x, quantity: x.quantity + 1 } : x
                            );
                     } else {
                            updatedWishlist = [...state.wishlistItems, { ...itemm, quantity: 1 }];
                     }

                     localStorage.setItem("wishlistItems", JSON.stringify(updatedWishlist));

                     return { ...state, wishlistItems: updatedWishlist };
              }

              case actions.INCREASE_QUANTITY: {
                     const updatedCart = state.cartItems.map((item) =>
                            item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
                     );
                     localStorage.setItem("cartItems", JSON.stringify(updatedCart));
                     return { ...state, cartItems: updatedCart };
              }

              case actions.DECREASE_QUANTITY: {
                     const updatedCart = state.cartItems
                            .map((item) =>
                                   item.id === action.payload && item.quantity > 1
                                          ? { ...item, quantity: item.quantity - 1 }
                                          : item
                            )
                            .filter((item) => item.quantity > 0);

                     localStorage.setItem("cartItems", JSON.stringify(updatedCart));
                     return { ...state, cartItems: updatedCart };
              }

              case actions.REMOVE_FROM_CART: {
                     const updatedCart = state.cartItems.filter((item) => item.id !== action.payload);
                     localStorage.setItem("cartItems", JSON.stringify(updatedCart));
                     return { ...state, cartItems: updatedCart };
              }

              case actions.REMOVE_FROM_WISHLIST: {
                     const updatedWishlist = state.wishlistItems.filter((item) => item.id !== action.payload);
                     localStorage.setItem("wishlistItems", JSON.stringify(updatedWishlist));
                     return { ...state, wishlistItems: updatedWishlist };
              }

              default:
                     return state
       }
}
export default reducer