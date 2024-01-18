import { createSelector } from "reselect";

const ADD_TO_CART = 'cart/ADD_TO_CART';
const REMOVE_FROM_CART = 'cart/REMOVE_FROM_CART';
const EMPTY_CART = 'cart/EMPTY_CART';

export function addToCart(id, count = 1) {
  return {
    type: ADD_TO_CART,
    id,
    count
  }
}

export function removeFromCart(id) {
  return {
    type: REMOVE_FROM_CART,
    id
  }
}

export function emptyCart() {
  return {
    type: EMPTY_CART
  }
}

export const selectCart = state => state.cart;
export const selectCartItems = createSelector(state => state, state => Object.values(state.cart).map(item => ({ ...item, ...state.produce[item.id] })).sort((a, b) => a.at.getTime() - b.at.getTime()));

export default function cartReducer(state = {}, action) {
  switch (action.type) {
    case ADD_TO_CART:
      return { ...state, [action.id]: { id: action.id, count: action.count, at: new Date() } }
    case REMOVE_FROM_CART: {
      const newState = { ...state };
      delete newState[action.id];
      return newState;
    }
    case EMPTY_CART:
      return {};
    default:
      return state;
  }
}
