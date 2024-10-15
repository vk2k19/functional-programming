import { createContext, ReactElement, useContext, useReducer } from "react";
import { Product } from "../data/products";

export type CartState = {
  items: Product[];
  addItemDispatcher?: (payload: Product) => void;
  removeItemDispatcher?: (payload: { id: number }) => void;
  clearItemDispatcher?: () => void;
};

export type CartDispatch = {
  type: "ADD_ITEM" | "REMOVE_ITEM" | "CLEAR_ITEM";
  payload: Product | { id: number };
};

const initialState: CartState = {
  items: [],
};

const CartContext = createContext(initialState);

const cartReducer = (state: CartState, action: CartDispatch) => {
  switch (action.type) {
    case "ADD_ITEM":
      return { ...state, items: [...state.items, action.payload] };
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id),
      };
    case "CLEAR_ITEM":
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

  const addItemDispatcher = (payload: Product) =>
    dispatch({ type: "ADD_ITEM", payload });

  const removeItemDispatcher = (payload: { id: number }) =>
    dispatch({ type: "REMOVE_ITEM", payload });

  const clearItemDispatcher = () => dispatch({ type: "CLEAR_ITEM" });

  return (
    <CartContext.Provider
      value={{
        ...state,
        addItemDispatcher,
        removeItemDispatcher,
        clearItemDispatcher,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
