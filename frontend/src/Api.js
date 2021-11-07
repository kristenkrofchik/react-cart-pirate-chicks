import axios from 'axios';

let BASE_URL;

if(process.env.NODE_ENV === 'production') {
    BASE_URL = 'https://react-pirate-chicks.herokuapp.com/';
}

if(process.env.NODE_ENV === 'development') {
    BASE_URL = 'http://localhost:3001';
}

/**Handles methods on frontend side for communicating with API.
 */

class PirateApi {
    static token;

    static async request(endpoint, data={}, method = 'get') {

        //pass authorization token in header.
        const url = `${BASE_URL}/${endpoint}`;
        const headers = {Authorization: `Bearer ${PirateApi.token}`};
        const params = (method === 'get') 
            ? data
            : {};

        try {
            return (await axios({ url, method, data, params, headers})).data;
        } catch (err) {
            console.error('API Error:', err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        };
    }


    /**Get list of all products, filtered by searchTerm if present */
    static async getProducts(searchTerm) {
        let res = await this.request('products', { searchTerm }, 'get');
        return res.products;
    }

    /**Get details on a product by id */
    static async getProduct(id) {
        let res = await this.request(`products/${id}`);
        return res.product;
    }

    /**Edit product quantity by id */
    static async editProductQuantity(id, data) {
        let res = await this.request(`products/${id}`, data, 'patch');
        return res.product;
    }

    /**Login user */
    static async loginUser(data) {
        let res = await this.request(`auth/token`, data, 'post');
        return res.token;
    }
    
    /** Signup user */
    static async signUpUser(data) {
        let res = await this.request(`auth/token`, data, 'post');
        return res.token;
    }

    /** Save updated profile */
    static async saveProfile(username, data) {
        let res = await this.request(`users/${username}`, data, 'patch');
        return res.user;
    }

    /** Get current user */
    static async getCurrentUser(username) {
        let res = await this.request(`users/${username}`);
        return res.user;
    }

    /** Call Stripe API */
    static async fetchFromAPI(data) {
        let res = await this.request(`checkouts/create-checkout-session`, data, 'post');
        return res;
    }
    
}


PirateApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
    "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
    "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

export default PirateApi;