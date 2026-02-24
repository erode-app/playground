import express from "express";
import { insert, findById, findAll } from "@playground/database";

const app = express();
app.use(express.json());

app.get("/products", (_req, res) => {
  res.json(findAll("products"));
});

app.get("/products/:id", (req, res) => {
  const product = findById("products", req.params.id);
  if (!product) {
    res.status(404).json({ error: "Product not found" });
    return;
  }
  res.json(product);
});

app.post("/products", (req, res) => {
  const product = insert("products", { id: crypto.randomUUID(), ...req.body });
  res.status(201).json(product);
});

app.listen(3002, () => {
  console.log("product-service listening on :3002");
});
