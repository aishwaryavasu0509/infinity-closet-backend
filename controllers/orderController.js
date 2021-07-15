const Order = require("../model/orderSchema");
const uniqid = require("uniqid");

exports.newOrder = async (req, res) => {
  try {
    req.body.orderTrakingId = uniqid();
    const order = new Order(req.body);
    const response = await order.save();
    console.log(response);
    res.status(201).json({
      status: "success",
      data: {
        data: response,
      },
    });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const order = await Order.find();
    res.status(200).json({
      result: order.length,
      status: "success",
      data: order,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "error",
      error: err,
    });
  }
};

exports.getOneOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    res.status(202).json({
      status: "success",
      data: order,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "error",
      error: err,
    });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(202).json({
      status: "success",
      data: order,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "error",
      error: err,
    });
  }
};

exports.getUserOrder = async (req, res) => {
  try {
    const order = await Order.findOne({ userId : req.params.userId});
    res.status(202).json({
      status: "success",
      data: order,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "error",
      error: err,
    });
  }
};

exports.getMultipleOrders = async (req, res) => {
  console.log(req.query.id);
  try {
    const IDs = req.query.id.split(",");
    const userOrders = await Order.find({ _id: { $in: IDs } });
    res.status(200).send({
      status: "success",
      result: userOrders.length,
      data: userOrders,
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
