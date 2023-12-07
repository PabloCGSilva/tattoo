// server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const port = 5000;
// Enable CORS to get hit or request from other servers
app.use(cors());
// required to parse the html body in response
app.use(bodyParser.json());

// create connection with mongoDb

mongoose.connect("mongodb://localhost:27017/mern_crud_blog", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// we will add routes here in the future .....
// move to ahead to know more

// create a user schema
const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);
// create a product schema
const productSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
const Product = mongoose.model("Product", productSchema);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Routes for Users
// retrieving all users
app.get("/api/users", (req, res) => {
  User.find()
    .then((item) => {
      console.log(item);
      res
        .status(200)
        .json({ message: "Item fetched successfully", data: item });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Server error" });
    });
});
// retrieve single user
app.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
  User.find({ _id: id })
    .then((item) => {
      console.log(item);
      res
        .status(200)
        .json({ message: "Item fetched successfully", data: item });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Server error" });
    });
});
// create a new user
app.post("/api/users", (req, res) => {
  const newUser = new User(req.body);
  console.log(newUser);
  newUser
    .save()
    .then((item) => {
      console.log(item);
      res.status(201).json({ message: "Item added successfully" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Server error" });
    });
});
// update new user
app.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  User.findByIdAndUpdate(id, req.body, { new: true })
    .then((item) => {
      console.log(item);
      res
        .status(203)
        .json({ message: "Item Fetched Successfully", data: item });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Server error" });
    });
});
// delete a user
app.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  User.findByIdAndRemove(id)
    .then((item) => {
      console.log(item);
      res
        .status(203)
        .json({ message: "Item Fetched Successfully", data: item });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Server error" });
    });
});

// Routes for Products
// retrieving all products
app.get("/api/products", (req, res) => {
  Product.find()
    .then((item) => {
      console.log(item);
      res
        .status(201)
        .json({ message: "Products Fetched Successfully!", data: item });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Server error" });
    });
});
// retrieve single product
app.get("/api/products/:id", (req, res) => {
  const { id } = req.params;
  Product.find({ _id: id })
    .then((item) => {
      console.log(item);
      res
        .status(200)
        .json({ message: "Item fetched successfully", data: item });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Server error" });
    });
});
// create a new product
app.post("/api/products", (req, res) => {
  const newProduct = new Product(req.body);
  newProduct
    .save()
    .then((item) => {
      console.log(item);
      res.status(201).json({ message: "Item added successfully" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Server error" });
    });
});
// update new product
app.put("/api/products/:id", (req, res) => {
  const { id } = req.params;
  Product.findByIdAndUpdate(id, req.body, { new: true })
    .then((item) => {
      console.log(item);
      res
        .status(203)
        .json({ message: "Item Fetched Successfully", data: item });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Server error" });
    });
});
// delete a product
app.delete("/api/products/:id", (req, res) => {
  const { id } = req.params;
  Product.findByIdAndRemove(id)
    .then((item) => {
      res.status(203).json({ message: "Deleted Successfully" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Server error" });
    });
});
