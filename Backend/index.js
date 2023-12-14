const express = require("express");
const app = express();
const mongoose = require("mongoose");

const {
  createProduct,
  getAllProducts,
  deleteProduct,
  updateProduct
} = require("./productOperations");
app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // or specify a specific origin
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

let database = mongoose.connect("mongodb://127.0.0.1/brandCenter");

app.get ("/", (req, res) => {
  res.send("Hello World");
  });

app.get("/api/brands", async (req, res) => {
  database.then(async () => {
    let brands = await getAllProducts();
    res.send(brands);
  });
});

app.put("/api/brands/:id", async (req, res) => {
  database.then(async () => {
    let brands = await updateProduct(req.params.id, req.body.title, req.body.cost, req.body.sizes);
    if (brands) {
      res.send(brands);
    } else {
      res.status(404).send("Brand not added");
    }
  });
});

  app.delete("/api/brands/:id", async (req, res) => {
    database.then(async () => {
      let brands = await deleteProduct(req.params.id);
      if (brands) {
        res.send(brands);
      } else {
        res.status(404).send("Brand not deleted");
      }
    });
  });

  app.post("/api/brands", async (req, res) => {
    database.then(async () => {
      let brands = await createProduct(req.body.id ,req.body.title, req.body.cost, req.body.sizes);
      if (brands) {
        res.send(brands);
      } else {
        res.status(404).send("Brand not added");
      }
    });
  });

  app.listen(3000, () => {
    console.log("Listening on port 3000");
  });