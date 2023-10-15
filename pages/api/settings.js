import { mongooseConnect } from "@/lib/mongoose.js";
import { Setting } from "@/models/Setting.js";

export default async function handle(req, res) {
  await mongooseConnect();

  if (req.method === "GET") {
    const { name } = req.query;
    res.json(await Setting.findOne({ name }));
  }
}
