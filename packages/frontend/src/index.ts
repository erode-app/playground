import express from "express";

const app = express();

const API_GATEWAY = "http://api-gateway:3000";
const USER_SERVICE = "http://user-service:3001";

app.get("/admin/users", async (_req, res) => {
  const response = await fetch(`${USER_SERVICE}/users`);
  const users = await response.json();
  res.send(`
    <h1>Admin: Users</h1>
    <pre>${JSON.stringify(users, null, 2)}</pre>
  `);
});

app.get("/", async (_req, res) => {
  const [usersRes, productsRes] = await Promise.all([
    fetch(`${API_GATEWAY}/users`),
    fetch(`${API_GATEWAY}/products`),
  ]);
  const users = await usersRes.json();
  const products = await productsRes.json();

  res.send(`
    <h1>Playground Store</h1>
    <h2>Users (${(users as unknown[]).length})</h2>
    <pre>${JSON.stringify(users, null, 2)}</pre>
    <h2>Products (${(products as unknown[]).length})</h2>
    <pre>${JSON.stringify(products, null, 2)}</pre>
  `);
});

app.listen(3003, () => {
  console.log("frontend listening on :3003");
});
