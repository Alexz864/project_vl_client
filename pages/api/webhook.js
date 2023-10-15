import { mongooseConnect } from "@/lib/mongoose.js";
import { Order } from "@/models/Order.js";
const stripe = require("stripe")(process.env.STRIPE_SK);
import { buffer } from "micro";

const endpointSecret = process.env.STRIPE_SIGNING_SECRET;

export default async function handler(req, res) {
  await mongooseConnect();

  const sig = request.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      await buffer(req),
      sig,
      endpointSecret
    );
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  console.log(event.type)
  switch (event.type) {
    case "checkout.session.completed":
      const data = event.data.object;
      const orderId = data.metadata.orderId;

      const paid = data.payment_status === "paid";
      if (orderId && paid) {
        await Order.findByIdAndUpdate(orderId, {
          paid: true,
        });
      }
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
  res.status(200).send("ok");
}

export const config = {
  api: { bodyParser: false },
};

// strife data
// key: fans-yay-won-vouch
// accountID: acct_1NhtDrJLX6RyPOpR
// strife listen cmd: stripe listen --forward-to localhost:3001/webhook
