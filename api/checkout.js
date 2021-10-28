const { BadRequestError } = require('../expressError');
const stripeAPI = require('../stripe');
//const { WEB_APP_URL } = require('../config.js');

async function createCheckoutSession(req, res) {
    const domainUrl = `https://localhost:3000`;
    const { line_items, customer_email } = req.body;
    //check if req contains the above info.
    if (!line_items || !customer_email) {
        throw new BadRequestError();
    }

    let session;

    try {
        session = await stripeAPI.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items,
            customer_email,
            success_url: `${domainUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${domainUrl}/cancelled`,
            shipping_address_collection: { allowed_countries: ['US'] }
        })
        res.status(200).json({ sessionId: session.id });
    } catch(error) {
        console.log(error);
        throw new BadRequestError();
    }
}

module.exports = createCheckoutSession;