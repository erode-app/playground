import express from "express";

const app = express();
app.use(express.json());

const USER_SERVICE = "http://user-service:3001";
const PRODUCT_SERVICE = "http://product-service:3002";

app.get("/users", async (_req, res) => {
  const response = await fetch(`${USER_SERVICE}/users`);
  res.json(await response.json());
});

app.get("/users/:id", async (req, res) => {
  const response = await fetch(`${USER_SERVICE}/users/${req.params.id}`);
  res.status(response.status).json(await response.json());
});

app.post("/users", async (req, res) => {
  const response = await fetch(`${USER_SERVICE}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(req.body),
  });
  res.status(response.status).json(await response.json());
});

app.get("/products", async (_req, res) => {
  const response = await fetch(`${PRODUCT_SERVICE}/products`);
  res.json(await response.json());
});

app.get("/products/:id", async (req, res) => {
  const response = await fetch(`${PRODUCT_SERVICE}/products/${req.params.id}`);
  res.status(response.status).json(await response.json());
});

app.post("/products", async (req, res) => {
  const response = await fetch(`${PRODUCT_SERVICE}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(req.body),
  });
  res.status(response.status).json(await response.json());
});

app.listen(3000, () => {
  console.log("api-gateway listening on :3000");
});
