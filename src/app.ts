import { IncomingMessage, ServerResponse } from "http";

const { showUsers } = require("./controllers/userController");
const { showConstUser } = require("./controllers/userController");
const { createNewUser } = require("./controllers/userController");
const { correctUser } = require("./controllers/userController");
const { deleteUser } = require("./controllers/userController");

exports.app = (req: IncomingMessage, res: ServerResponse) => {
  switch (req.method) {
    case "GET": {
      if (req.url === "/api/users") {
        showUsers(req, res);
      }
      if (req.url.startsWith("/api/users")) {
        showConstUser(req, res);
      }
    }

    case "POST": {
      if (req.url === "/api/users") {
        createNewUser(req, res);
      }
    }

    case "PUT": {
      if (req.url.startsWith("/api/users")) {
        correctUser(req, res);
      }
    }

    case "DELETE": {
      if (req.url.startsWith("/api/users")) {
        deleteUser(req, res);
      }
    }
  }
};
