const mongoose = require("mongoose");
const Product = require("../model/productSchema");
const User = require("../model/userSchema");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Order must belong to a user"],
    },
    paymentStatus: {
      type: String,
      required: [true, "Order must have a payment status."],
    },
    status: {
      type: String,
      required: [true, "Order must have a status."],
    },
    products: {
      type: Array,
      required: [true, "Order should contain atleast one product"],
    },
    totalAmount: {
      type: Number,
      required: [true, "Order should have total amount"],
    },
    amountPayed: {
      type: Number,
      required: true,
    },
    amountRemaining: {
      type: Number,
      required: true,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    orderTrakingId: {
      type: String,
      unique: true,
    },
    shippingAddress: {
      state: String,
      city: String,
      street1: String,
      street2: String,
      zip: Number,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

orderSchema.pre("save", async function (next) {
  const productPromises = this.products.map((id) => Product.findById(id));
  this.products = await Promise.all(productPromises);
  next();
});

orderSchema.statics.addOrderIdToUser = async function (userId, orderId) {
  try {
    const addOrderId = await User.findOneAndUpdate(
      {
        _id: userId,
      },
      {
        $addToSet: {
          myOrders: orderId,
        },
      }
    );
    console.log(addOrderId);
  } catch (err) {
    console.log(err);
  }
};

orderSchema.post("save", async function (doc, next) {
  console.log(doc.id);
  this.constructor.addOrderIdToUser(doc.userId, doc.id);
  next();
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
