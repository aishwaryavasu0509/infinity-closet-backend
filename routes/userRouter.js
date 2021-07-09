const router = require("express").Router();
const userController = require("../controllers/userController");


//Bring in the User Registration function
const {
  userRegister,
  userLogin,
  checkRole,
  userAuth,
  serializeUser,
} = require("../controllers/authController");

//Users Registration Route
router.post("/register-user", async (req, res) => {
  await userRegister(req.body, "user", res);
});

//Admin Registration Route
router.post("/register-admin", async (req, res) => {
  await userRegister(req.body, "admin", res);
});

//Super Admin Registration Route
router.post("/register-super-admin", async (req, res) => {
  await userRegister(req.body, "superadmin", res);
});

//Users Login Route
router.post("/login-user", async (req, res) => {
  await userLogin(req.body, "user", res);
});

//Admin Login  Route
router.post("/login-admin", async (req, res) => {
  await userLogin(req.body, "admin", res);
});

//Super Admin Login Route
router.post("/login-super-admin", async (req, res) => {
  await userLogin(req.body, "superadmin", res);
});

//Profile Route
router.get("/profile", userAuth, async (req, res) => {
  return res.json(serializeUser(req.user));
});

//Users Protected Route
router.get(
  "/user-protected",
  userAuth,
  checkRole(["user"]),
  async (req, res) => {
    return res.json("hello user");
  }
);

//Admin Protected Route
router.get(
  "/admin-protected",
  userAuth,
  checkRole(["admin"]),
  async (req, res) => {
    return res.json("hello admin");
  }
);

//Super Admin Protected Route
router.get(
  "/superadmin-protected",
  userAuth,
  checkRole(["superadmin"]),
  async (req, res) => {
    return res.json("super admin");
  }
);

router.get(
  "/superadminandadmin-protected",
  userAuth,
  checkRole(["superadmin", "admin"]),
  async (req, res) => {
    return res.json("super admin and admin");
  }
);



// PRODUCTS RELATED TO THE USER [routes]

// Adding the product to cart and wishlist
router.post("/addToCart", userController.addToCart);
router.post("/addToWishlist", userController.addToWishlist);

// Removing the product from cart and wishlist
router.patch("/removeFromCart", userController.removeFromCart);
router.patch("/removeFromWishlist", userController.removeFromWishlist);

// Getting all the products from cart and wishlist
router.get("/cartItems", userController.getMultipleItems);
router.get("/wishlistItems", userController.getMultipleItems);
// router.get("/wishlistItems", userController.getWishItems)

module.exports = router;
