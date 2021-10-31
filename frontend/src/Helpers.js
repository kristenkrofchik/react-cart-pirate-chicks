import axios from "axios";

//return truthy or falsey val
export const isInCart = (product, cartItems) => {
    return cartItems.find(item => item.id === product.id);
}

let API = `http://localhost:3001`;

/*if(process.env.NODE_ENV === 'production') {
    API = 'https://react-pirate-chicks.herokuapp.com/';
}

if(process.env.NODE_ENV === 'development') {
    API = 'http://localhost:3001';
}*/

export async function fetchFromAPI(endpoint, options) {
    //setting defaults
    const { body } = { method: 'POST', body: null, ...options };

    const res = await axios.post(`${API}/${endpoint}`, {
        ...(body && { body: JSON.stringify(body) }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    return res.json();
}