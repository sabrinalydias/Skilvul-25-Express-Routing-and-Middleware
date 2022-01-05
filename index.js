const express = require("express");

const app = express();

const port = 3001;

app.use(express.json());

const hewan = [
  { id: 1, nama: "Snowy", spesies: "kucing" },
  { id: 2, nama: "Blacki", spesies: "anjing" },
  { id: 3, nama: "Molly", spesies: "kucing" },
  { id: 4, nama: "Milo", spesies: "kelinci" },
  { id: 5, nama: "Rere", spesies: "kucing" },
];

const logger = function (req, res, next) {
  console.log("this is logger");
  next();
};
app.use(logger);

app.get("/hewan", (req, res) => {
  res.status(200).send({ message: "success get data Pet", hewan });
});

app.get("/hewan/:id", (req, res) => {
  const hewanId = req.params.id;
  var data = hewan.filter((u) => u.id === Number(hewanId));
  res.status(200).send({ message: "success get data Pet", data });
});

var postChecker = function (req, res, next) {
  const body = req.body;
  const spesies = body["spesies"];
  if (spesies == "kelinci" || spesies == "kucing" || spesies == "anjing") {
    next();
  } else {
    res.status(400).send({ error: "Spesies not valid" });
  }
};

app.post("/hewan", postChecker, (req, res) => {
  const body = req.body;
  const addHewan = {
    id: hewan.length + 1,
    nama: body["nama"],
    spesies: body["spesies"],
  };
  hewan.push(addHewan);
  res.status(200).send({ message: "success adding one pets", hewan });
});

app.put("/hewan/:id", (req, res) => {
  const hewanId = req.params.id;
  const body = req.body;
  const updateHewan = {
    nama: body["nama"],
    spesies: body["spesies"],
  };
  var found = hewan.filter((item) => item.id === Number(hewanId));
  if (found) {
    found.map((e) => {
      e.nama = updateHewan.nama;
      e.spesies = updateHewan.spesies;
    });
  }
  res.status(200).send({ message: "success update data Pet", updateHewan });
});

app.delete("/hewan/:id", (req, res) => {
  const hewanId = req.params.id;
  var found = hewan.filter((u) => u.id === Number(hewanId));
  hewan.pop(found);
  res.status(200).send({ message: "success delete data Pet", found });
});

app.listen(port, () => {
  console.log("server run");
});
