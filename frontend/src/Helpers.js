//return truthy or falsey val
export const isInCart = (product, cartItems) => {
    return cartItems.find(item => item.id === product.id);
}

const API = process.env.NODE_ENV === 'production' ? 'https://react-pirate-chicks.herokuapp.com/' : 'http://localhost:3001';

export async function fetchFromAPI(endpoint, opts) {
    const { method, body } = { method: 'POST', body: null, ...opts };

    const res = await fetch(`${API}/${endpoint}`, {
        method,
        ...(body && { body: JSON.stringify(body) }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    return res.json();
}