import express from "express";
import { insert, findById, findAll } from "@playground/database";

const app = express();
app.use(express.json());

const PRODUCT_SERVICE = "http://product-service:3002";

app.get("/orders", (_req, res) => {
  res.json(findAll("orders"));
});

app.get("/orders/:id", (req, res) => {
  const order = findById("orders", req.params.id);
  if (!order) {
    res.status(404).json({ error: "Order not found" });
    return;
  }
  res.json(order);
});

app.post("/orders", async (req, res) => {
  const { productId, userId } = req.body;

  const productResponse = await fetch(`${PRODUCT_SERVICE}/products/${productId}`);
  if (!productResponse.ok) {
    res.status(400).json({ error: "Invalid product" });
    return;
  }

  const order = insert("orders", {
    id: crypto.randomUUID(),
    productId,
    userId,
    status: "created",
  });
  res.status(201).json(order);
});

app.listen(3005, () => {
  console.log("order-service listening on :3005");
});
