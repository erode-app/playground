import express from "express";
import { insert, findById, findAll } from "@playground/database";

const app = express();
app.use(express.json());

app.get("/users", (_req, res) => {
  res.json(findAll("users"));
});

app.get("/users/:id", (req, res) => {
  const user = findById("users", req.params.id);
  if (!user) {
    res.status(404).json({ error: "User not found" });
    return;
  }
  res.json(user);
});

app.post("/users", (req, res) => {
  const user = insert("users", { id: crypto.randomUUID(), ...req.body });
  res.status(201).json(user);
});

app.listen(3001, () => {
  console.log("user-service listening on :3001");
});
