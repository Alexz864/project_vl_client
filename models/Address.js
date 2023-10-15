import { Schema, models, model } from "mongoose";

const AddressSchema = new Schema({
  userEmail: { type: String, unique: true, required: true },
  name: String,
  lastName: String,
  email: String,
  city: String,
  postalCode: String,
  streetAddress: String,
  country: String,
});

export const Address = models?.Address || model("Address", AddressSchema);
