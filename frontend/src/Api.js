import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";


/**Handles methods on frontend side for communicating with API.
 * This will be the only location for API-aware code
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
        }
    }

    /**Get list of all products, filtered by searchTerm if present */
    static async getProducts(searchTerm) {
        let res = await this.request('products', { searchTerm });
        return res.products;
    }

    /**Get details on a product by id */
    static async getProduct(id) {
        let res = await this.request(`products/${id}`);
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
}


export async function fetchFromAPI(endpoint, opts) {
  const { body } = { body: null, ...opts };
  const res = await axios.post(`${BASE_URL}/${endpoint}`, {
    ...(body && { body: JSON.stringify(body) }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (res.status === 200) {
    return res.json();
  } else {
    throw new Error(res.statusText);
  }
}



PirateApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
    "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
    "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

export default PirateApi;