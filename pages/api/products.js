import { mongooseConnect } from "@/lib/mongoose.js";
import { Product } from "@/models/Product.js";

export default async function handle(req, res) {
  await mongooseConnect();
  const { categories, sort, phrase } = req.query;
  let [sortField, sortOrder] = (sort || "_id-desc").split("-");

  const productsQuery = {};
  if (categories) {
    productsQuery.category = categories.split(",");
  }
  if (phrase) {
    productsQuery["$or"] = [
      { title: { $regex: phrase, $options: "i" } },
      { author: { $regex: phrase, $options: "i" } },
    ];
  }

  res.json(
    await Product.find(productsQuery, null, {
      sort: { [sortField]: sortOrder === "asc" ? 1 : -1 },
    })
  );
}
