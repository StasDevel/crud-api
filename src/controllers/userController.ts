const { v4: uuidv4 } = require("uuid");
const { validate: uuidValidate } = require("uuid");
import { IncomingMessage, ServerResponse } from "http";

interface User {
  id: string;
  username: string;
  age: number;
  hobbies: string[] | [];
}

const usersData: User[] = [
  {
    id: "a06809d0-ab7b-4016-a604-467a31ade0c8",
    username: "Oleg",
    age: 22,
    hobbies: ["drive"],
  },
];

exports.showUsers = (req: IncomingMessage, res: ServerResponse): void => {
  res.writeHead(200, {
    "Content-Type": "application/json",
  });
  res.end(JSON.stringify(usersData));
};

exports.showConstUser = (req: IncomingMessage, res: ServerResponse): void => {
  const uniqueId: string = req.url.split("/")[3];
  const filteredUsers: User[] | [] = usersData.filter((user: User): boolean => {
    return user.id === uniqueId ? true : false;
  });

  if (!uuidValidate(uniqueId)) {
    res.writeHead(400, {
      "Content-Type": "text/html ",
    });
    JSON.stringify({ message: "UserId is not valid" });
  }

  if (filteredUsers.length === 0) {
    res.writeHead(404, {
      "Content-Type": "text/html ",
    });
    JSON.stringify({ message: "User with UserId doesn't exist" });
  }

  res.writeHead(200, {
    "Content-Type": "application/json",
  });
  res.end(JSON.stringify(filteredUsers[0]));
};

exports.createNewUser = (req: IncomingMessage, res: ServerResponse) => {
  let requestBody = "";

  req.on("data", (chunk) => {
    requestBody += chunk.toString();
  });

  req.on("end", () => {
    const { username, age, hobbies }: User = JSON.parse(requestBody);

    if (
      typeof username !== "string" ||
      typeof age !== "number" ||
      typeof hobbies !== "object" ||
      !username ||
      !age
    ) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({ message: "Username and age params are required" })
      );
    }

    const newUser: User = {
      id: uuidv4(),
      username,
      age,
      hobbies: hobbies ? hobbies : [],
    };

    usersData.push(newUser);
    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify(newUser));
  });
};

exports.correctUser = (req: IncomingMessage, res: ServerResponse) => {
  const uniqueId: string = req.url.split("/")[3];
  const user: User = usersData.find((elem) => elem.id === uniqueId);

  let requestBody = "";
  req.on("data", (chunk) => {
    requestBody += chunk.toString();
  });

  req.on("end", () => {
    const { username, age, hobbies }: User = JSON.parse(requestBody);
    const indexOfUser = usersData.indexOf(user);

    if (typeof username === "string" || username) {
      usersData[indexOfUser].username = username;
    }

    if (typeof age !== "number" || age) {
      usersData[indexOfUser].age = age;
    }

    if (typeof hobbies !== "object" || hobbies) {
      usersData[indexOfUser].hobbies = Array.from(
        new Set([...usersData[indexOfUser].hobbies, ...hobbies])
      );
    }
    res.writeHead(200);
    res.end();
  });
};
