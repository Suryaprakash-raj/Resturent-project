const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false }, // <-- Hide in queries by default
    role: { type: String, enum: ["customer", "admin"], default: "customer" },
    avatar: { type: String },
    bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Booking" }], // <-- Bookings array
  },
  { timestamps: true }
);

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

module.exports = mongoose.model("User", UserSchema);
