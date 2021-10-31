//return truthy or falsey val
export const isInCart = (product, cartItems) => {
    return cartItems.find(item => item.id === product.id);
}

export async function fetchFromAPI(endpoint, opts) {
    const { method, body } = { method: 'POST', body: null, ...opts };

    const res = await fetch(`${process.env.REACT_APP_API}/${endpoint}`, {
        method,
        ...(body && { body: JSON.stringify(body) }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    return res.json();
}