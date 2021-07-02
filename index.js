const cors = require("cors");
const express = require("express");
const bodyparser = require("body-parser");
const passport = require("passport");
const { connect } = require("mongoose");
const { success, error } = require("consola");
const productRouter = require("./routes/productRouter");
const userRouter = require("./routes/userRouter");

//const express = require('express');
const path = require("path");
const exphbs = require("express-handlebars");
//const bodyparser = require('body-parser');

var app = express();
app.use(
  bodyparser.urlencoded({
    extended: true,
  })
);
app.use(bodyparser.json());
app.set("views", path.join(__dirname, "/views/"));
app.engine(
  "hbs",
  exphbs({
    extname: "hbs",
    defaultLayout: "mainLayout",
    layoutsDir: __dirname + "/views/layouts/",
  })
);
app.set("view engine", "hbs");

const { DB, PORT } = require("./config");

// Bring in the app constants

//initialise the application
//const app = express();

//Middlewares
app.use(cors());
app.use(bodyparser.json());
app.use(passport.initialize());

require("./middlewares/passport")(passport);

//User Router Middlewares

app.use("/api/v1/users", userRouter);

app.use("/api/v1/products", productRouter);

// app.use("/api/v1/savedProducts")

// Test route
app.get("/", (req, res) => {
  res.send(`hello`);
});

const startApp = async () => {
  try {
    //connection with DB
    await connect(DB, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    success({
      message: `Sucessfully connected to the database\n ${DB}`,
      badge: true,
    });

    //start listening for the server on PORT

    app.listen(PORT, () => {
      success({ message: `Server started on PORT ${PORT}`, badge: true });
    });
  } catch (err) {
    error({
      message: `Unable to connect with Database\n ${err}`,
      badge: true,
    });
    startApp();
  }
};

startApp();
