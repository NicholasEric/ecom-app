"use client";

import { useReducer, useEffect, createContext} from "react";
let count = 0

const initialState = {
  items: [],
  isCartOpen: false,
}

const cartReducer = (state, action) => {
  switch (action.type) {
    
    case "ADD_ITEM": {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      return {
        ...state,
        items: existingItem
          ? state.items.map(item =>
              item.id === action.payload.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          : [...state.items, { ...action.payload, quantity: 1 }]
      };
    };

    case "REMOVE_ITEM": {
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };
    }

    case "INCREMENT": {
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      };
    }

    case "DECREMENT": {
      return {
        ...state,
        items: state.items
          .map(item =>
            item.id === action.payload && item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
      };
    }

    case "LOAD_CART": {
      return {
        ...state,
        items: action.payload || [],
      };
    }

    case "CLEAR_CART": {
      return {
        ...state,
        items: []
      };
    }

    case "TOGGLE_CART": {
      return {
        ...state,
        isCartOpen: !state.isCartOpen
      };
    }

    default:
      return state;
  }
}

export const CartContext = createContext({
  ...initialState,
  dispatch: () => {}
});

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      dispatch({ type: "LOAD_CART", payload: JSON.parse(storedCart) });
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem("cart", JSON.stringify(state.items));
    }, 300);
    return () => clearTimeout(timer);
  }, [state.items]);

  const contextValue = {
    items: state.items,
    isCartOpen: state.isCartOpen,
    dispatch
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );

}