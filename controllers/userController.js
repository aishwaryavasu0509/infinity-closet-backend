const User = require("../model/userSchema");

// Add the item to the cart
exports.addToCart = async (req, res) => {
  try {
    console.log(req.body);
    // console.log(req.body.params.productID);
    const response = await User.findOneAndUpdate(
      {
        _id: req.body.userID,
      },
      {
        $addToSet: {
          cartItems: req.body.productID,
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

// Add the item to the wishlist
exports.addToWishlist = async (req, res) => {
  try {
    const response = await User.findOneAndUpdate(
      {
        _id: req.body.userID,
      },
      {
        $addToSet: {
          wishlistItems: req.body.productID,
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

// Remove the item from the cart
exports.removeFromCart = async (req, res) => {
  try {
    const response = await User.updateOne(
      {
        _id: req.body.userID,
      },
      {
        $pullAll: {
          cartItems: [req.body.productID],
        },
      },
      {
        new: true,
      }
    );
    console.log(response);
    res.status(200).json({
      status: "success",
      message: "Item successfully removed from the cart."
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

// Remove the item from the wishlist
exports.removeFromWishlist = async (req, res) => {
  try {
    const response = await User.updateOne(
      {
        _id: req.body.userID,
      },
      {
        $pullAll: {
          wishlistItems: [req.body.productID],
        },
      },
      {
        new: true,
      }
    );
    console.log(response);
    res.status(200).json({
      status: "success",
      message: "Item successfully removed from the cart."
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};
