import { mongooseConnect } from "@/lib/mongoose.js";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth].js";
import { Order } from "@/models/Order.js";

export default async function handle(req, res) {
  await mongooseConnect();
  await Order.findByIdAndUpdate(req.body.orderId, {
    paid: req.body.paid,
  });
}