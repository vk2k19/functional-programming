import { createContext, ReactElement, useContext, useReducer } from "react";
import { Product } from "../data/products";
import * as R from "ramda";

export type CartItem = Product & { quantity: number };

export type CartState = {
  items: CartItem[];
  addItemDispatcher?: (payload: CartItem) => void;
  removeItemDispatcher?: (payload: { id: number }) => void;
  clearItemDispatcher?: () => void;
  quantityUpdateDispatcher?: (payload: {
    id: number;
    quantity: number;
  }) => void;
};

export type CartDispatch =
  | {
      type: "ADD_ITEM";
      payload: CartItem;
    }
  | {
      type: "REMOVE_ITEM";
      payload: { id: number };
    }
  | {
      type: "CLEAR_ITEMS";
    }
  | {
      type: "UPDATE_QUANTITY";
      payload: { id: number; quantity: number };
    };

const initialState: CartState = {
  items: [],
};

const CartContext = createContext(initialState);

const cartReducer = (state: CartState, action: CartDispatch): CartState => {
  switch (action.type) {
    case "UPDATE_QUANTITY":
      return {
        ...state,
        items: R.map((item: CartItem) =>
          item.id !== action.payload.id
            ? item
            : R.assoc("quantity", Math.max(1, action.payload.quantity))(item)
        )(state.items),
      };
    case "ADD_ITEM":
      return { ...state, items: [...state.items, action.payload] };
    case "REMOVE_ITEM":
      return {
        ...state,
        items: R.filter((item) => item.id !== action.payload.id, state.items),
      };
    case "CLEAR_ITEMS":
      return {
        ...state,
        items: [],
      };
    default:
      return state;
  }
};

export const CartProvider = ({ children }: { children: ReactElement }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addItemDispatcher = (payload: CartItem) =>
    dispatch({ type: "ADD_ITEM", payload });

  const removeItemDispatcher = (payload: { id: number }) =>
    dispatch({ type: "REMOVE_ITEM", payload });

  const clearItemDispatcher = () => dispatch({ type: "CLEAR_ITEMS" });

  const quantityUpdateDispatcher = (payload: {
    id: number;
    quantity: number;
  }) => dispatch({ type: "UPDATE_QUANTITY", payload });

  return (
    <CartContext.Provider
      value={{
        ...state,
        addItemDispatcher,
        removeItemDispatcher,
        clearItemDispatcher,
        quantityUpdateDispatcher,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
