import { IncomingMessage, ServerResponse } from "http";

const { showUsers } = require("./controllers/userController");
const { showConstUser } = require("./controllers/userController");
const { createNewUser } = require("./controllers/userController");
const { correctUser } = require("./controllers/userController");
const { deleteUser } = require("./controllers/userController");

exports.app = (req: IncomingMessage, res: ServerResponse) => {
  const url = req.url;

  if (url === "/api/users") {
    if (req.method === "GET") {
      showUsers(req, res);
    } else if (req.method === "POST") {
      createNewUser(req, res);
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Route wasn't found" }));
    }
  } else if (url?.startsWith("/api/users/")) {
    if (req.method === "GET") {
      showConstUser(req, res);
    } else if (req.method === "PUT") {
      correctUser(req, res);
    } else if (req.method === "DELETE") {
      deleteUser(req, res);
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Route wasn't found" }));
    }
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Route wasn't found" }));
  }
};
