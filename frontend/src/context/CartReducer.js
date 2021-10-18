const storeCartItems = (cartItems) => {
    const cart = cartItems.length > 0 ? cartItems : [];
    localStorage.setItem('cart', JSON.stringify(cart));
}

export const sumItems = (cartItems) => {
    storeCartItems(cartItems);
    return {
        itemCount: cartItems.reduce((total, prod) => total + prod.cartQuantity, 0),
        total: cartItems.reduce((total, prod) => total + (prod.price * prod.cartQuantity),0)
    }
}

const cartReducer = (state, action) => {
    switch(action.type) {
        case 'ADD_ITEM':
            // check if item is in cart already.
            if(!state.cartItems.find(item => item.id === action.payload.id)) {
                state.cartItems.push({
                    ...action.payload,
                    cartQuantity: 1
                })
            }

            return {
                ...state,
                cartItems: [...state.cartItems],
                ...sumItems(state.cartItems)
            }
        
        case 'INCREASE':
            const increaseIndex = state.cartItems.findIndex(item => item.id === action.payload.id);
            state.cartItems[increaseIndex].cartQuantity++;

            return {
                ...state,
                cartItems: [...state.cartItems],
                ...sumItems(state.cartItems)
            }

        case 'DECREASE':
            const decreaseIndex = state.cartItems.findIndex(item => item.id === action.payload.id);
            const product = state.cartItems[decreaseIndex];
            if(product.cartQuantity > 1) {
                product.cartQuantity--;
            }

            return {
                ...state,
                cartItems: [...state.cartItems],
                ...sumItems(state.cartItems)
            }
        
        case 'REMOVE_ITEM':
            const newCartItems = state.cartItems.filter(item => item.id !== action.payload.id);
        
        return {
            ...state,
            cartItems: [...newCartItems],
            ...sumItems(newCartItems)
        }

        case 'CLEAR':
            localStorage.removeItem('cart');
            return {
                cartItems: [],
                itemCount: 0,
                total: 0
            }

        default:
            return state;
    }
}

export default cartReducer;