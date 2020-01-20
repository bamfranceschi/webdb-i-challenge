const express = require("express");

const db = require("./data/dbConfig.js");

const server = express();

server.use(express.json());

server.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ mesage: "something went wrong" });
});

// tested and working

server.get("/", async (req, res, next) => {
  try {
    res.json(await db.select("*").from("accounts"));
  } catch (err) {
    next(err);
  }
});

// tested and working

server.get("/:id", async (req, res, next) => {
  try {
    res.json(
      await db("accounts")
        .where("id", req.params.id)
        .first()
    );
  } catch (err) {
    next(err);
  }
});

// tested and working

server.post("/", async (req, res, next) => {
  try {
    const payload = {
      name: req.body.name,
      budget: req.body.budget
    };

    const [id] = await db("accounts").insert(payload);
    res.json(await db("accounts").where("id", id));
  } catch (err) {
    next(err);
  }
});

// tested and working

server.put("/:id", async (req, res, next) => {
  try {
    // const payload = {
    //   name: req.body.name,
    //   budget: req.body.budget
    // };

    await db("accounts")
      .where("id", req.params.id)
      .update(req.body);
    res.status(200).json({ message: "account was updated" });
  } catch (err) {
    next(err);
  }
});

// tested and working

server.delete("/:id", async (req, res, next) => {
  try {
    await db("accounts")
      .where("id", req.params.id)
      .del();
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

module.exports = server;
