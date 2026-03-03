import express from "express";
import { insert, findById, findAll } from "@playground/database";

const app = express();
app.use(express.json());

const USER_SERVICE = "http://user-service:3001";

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

app.get("/products/:id/creator", async (req, res) => {
  const product = findById("products", req.params.id);
  if (!product) {
    res.status(404).json({ error: "Product not found" });
    return;
  }
  const response = await fetch(`${USER_SERVICE}/users/${product.createdBy}`);
  const creator = await response.json();
  res.json({ product, creator });
});

app.listen(3002, () => {
  console.log("product-service listening on :3002");
});
