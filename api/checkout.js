const { BadRequestError } = require('../expressError');
const stripeAPI = require('../stripe');

let BASE_URL;

if(process.env.NODE_ENV === 'production') {
    BASE_URL = 'https://react-pirate-chicks.herokuapp.com';
}

if(process.env.NODE_ENV === 'development') {
    BASE_URL = 'http://localhost:3001';
}

async function createCheckoutSession(req, res) {
    const { line_items, customer_email } = req.body;
    //check if req contains the above info.
    if (!line_items || !customer_email) {
        throw new BadRequestError(message= 'Missing required paramter for Stripe API.');
    }

    let session;

    //make request to stripe API, return sessionId
    try {
        session = await stripeAPI.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items,
            customer_email,
            success_url: `${BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${BASE_URL}/cancelled`,
            shipping_address_collection: { allowed_countries: ["US"] }
        })
        res.status(200).json({ sessionId: session.id });
    } catch(error) {
        console.log(error);
        throw new BadRequestError(message= 'The session was not created. Please try again.');
    }
}

module.exports = createCheckoutSession;