import React, { useReducer } from 'react';

const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  addItem: item => { },
  removeItem: id => { }
});

export default CartContext;

const defaultCartState = {
  items: [],
  totalAmount: 0
};

const cartReducer = (state, action) => {
  if (action.type === 'ADD') {
    const totalAmount = state.totalAmount + (action.item.price * action.item.amount);

    const existingItemIndex = state.items.findIndex(item => item.id === action.item.id);
    const existingItem = state.items[existingItemIndex];

    let totalItems;

    if (existingItem) {
      const updatedItem = {
        ...existingItem,
        amount: existingItem.amount + action.item.amount
      };
      totalItems = [...state.items];
      totalItems[existingItemIndex] = updatedItem;
    } else {
      totalItems = state.items.concat(action.item);
    }

    return {
      items: totalItems,
      totalAmount: totalAmount
    };
  }
  if (action.type === 'REMOVE') {
    const existingItemIndex = state.items.findIndex(item => item.id === action.id);
    const existingItem = state.items[existingItemIndex];
    const totalAmount = state.totalAmount - existingItem.price;
    let totalItems;

    if (existingItem.amount > 1) {
      const updatedItem = {
        ...existingItem,
        amount: existingItem.amount - 1
      };
      totalItems = [...state.items];
      totalItems[existingItemIndex] = updatedItem;
    } else if (existingItem.amount === 1) {
      totalItems = state.items.filter(item => item.id !== action.id);
    }

    return {
      items: totalItems,
      totalAmount: totalAmount
    };
  }
  return defaultCartState;
};

export const CartProvider = props => {

  const [cartState, setCart] = useReducer(cartReducer, defaultCartState);

  const addItem = item => {
    setCart({
      type: "ADD",
      item: item
    });
  };
  const removeItem = id => {
    setCart({
      type: "REMOVE",
      id: id
    });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItem,
    removeItem: removeItem
  };

  return (
    <CartContext.Provider
      value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

