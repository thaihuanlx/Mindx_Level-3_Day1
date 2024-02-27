import http from "http";
import url from "url";
import { getUsers, getOldUsers, addRandomUser, addUser } from "./handle.js";

const server = http.createServer((req, res) => {
  const reqUrl = url.parse(req.url, true);

  if (reqUrl.pathname === "/users" && req.method === "GET") {
    getUsers(req, res);
  } else if (reqUrl.pathname === "/users/old" && req.method === "GET") {
    getOldUsers(req, res);
  } else if (reqUrl.pathname === "/users/add-random" && req.method === "POST") {
    addRandomUser(req, res);
  } else if (reqUrl.pathname === "/users/add" && req.method === "POST") {
    addUser(req, res);
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found" }));
  }
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
