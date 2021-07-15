const express = require("express");
const router = express.Router();

const orderController = require("../controllers/orderController");

router
  .route("/")
  .post(orderController.newOrder)
  .get(orderController.getAllOrders);

router.get("/getuserorders/:userId", orderController.getUserOrder);

router.get("/getmultipleorders", orderController.getMultipleOrders);

router
  .route("/:id")
  .patch(orderController.updateOrder)
  .get(orderController.getOneOrder);

module.exports = router;
