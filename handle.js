import { parse } from "querystring";

let users = [
  {
    id: 1,
    userName: "HTH",
    email: "hth@example.com",
    address: "LX",
    age: 35,
  },
  {
    id: 2,
    userName: "TQB",
    email: "tqb@example.com",
    address: "LA",
    age: 50,
  },
  {
    id: 3,
    userName: "PTN",
    email: "ptn@example.com",
    address: "ĐT",
    age: 53,
  },
  {
    id: 4,
    userName: "HTHY",
    email: "hthy@example.com",
    address: "LX",
    age: 30,
  },
];

function getUsers(req, res) {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(users));
}

function getOldUsers(req, res) {
  const oldUsers = users.filter((user) => user.age >= 50);
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(oldUsers));
}

function addRandomUser(req, res) {
  const newUser = generateRandomUser();
  users.push(newUser);
  res.writeHead(201, { "Content-Type": "application/json" });
  res.end(JSON.stringify(newUser));
}

function addUser(req, res) {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    const { userName, email, address, age } = parse(body);
    const id = Math.floor(Math.random() * 1000) + 1;
    const newUser = { id, userName, email, address, age: parseInt(age) };
    users.push(newUser);
    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify(newUser));
  });
}

function generateRandomUser() {
  const id = Math.floor(Math.random() * 1000) + 1;
  const names = ["HTH", "PTN", "TQB", "HTHY", "HHH"];
  const addresses = ["LX", "HCM", "LA", "ĐT", "AG"];
  const randomName = names[Math.floor(Math.random() * names.length)];
  const randomAddress = addresses[Math.floor(Math.random() * addresses.length)];
  const email = `${randomName.toLowerCase()}@example.com`;
  const age = Math.floor(Math.random() * 100) + 1;
  return { id, userName: randomName, email, address: randomAddress, age };
}

export { getUsers, getOldUsers, addRandomUser, addUser };
