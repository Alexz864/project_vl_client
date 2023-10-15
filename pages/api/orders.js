import { mongooseConnect } from "@/lib/mongoose.js";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth].js";
import { Order } from "@/models/Order.js";

export default async function handle(req, res) {
  await mongooseConnect();
  const { user } = await getServerSession(req, res, authOptions);
  res.json(await Order.find({ userEmail: user.email }));
}