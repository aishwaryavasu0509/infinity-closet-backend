exports.addToCart = async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.body.params.productID);
    const response = await Product.findOneAndUpdate(
      {
        _id: req.body.params.userID,
      },
      {
        $addToSet: {
          cartItems: req.body.params.productID,
        },
      }
    );
    // console.log(response);
    res.send("ok");
  } catch (error) {
    console.log(error);
    res.status(404).send({
      message: "fail to add",
    });
  }
};
