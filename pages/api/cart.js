import { mongooseConnect } from "@/lib/mongoose.js";
import { Product } from "@/models/Product.js";

export default async function handle(req, res) {
  await mongooseConnect();
  const ids = req.body.ids;
  res.json(await Product.find({ _id: ids }));
}
