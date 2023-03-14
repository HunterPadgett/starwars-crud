const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const connectionString =
 "mongodb+srv://user:pass1234@star-wars-cluster.mxwv4qs.mongodb.net/?retryWrites=true&w=majority";

// The urlencoded method within body-parser tells body-parser to extract data from the <form> element and add them to the body property in the request object.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use(express.static("public"));

MongoClient.connect(connectionString, { useUnifiedTopology: true })
 .then((client) => {
  const db = client.db("star-wars-crud");
  const quotesCollection = db.collection("quotes");

  // what to do when user goes to home page aka '/'
  // abbreviate `request` to `req` and `response` to `res`.
  // we serve up the index.html when user req homepage using the sendFile method
  // this is a READ / GET operation in CRUD
  app.get("/", (req, res) => {
   //  res.sendFile(__dirname + "/index.html");
   // get all quotes from db, turn into array
   quotesCollection
    .find()
    .toArray()
    .then((results) => {
     //  find all quotes, send array to ejs file so we can manipulate that data in the index.ejs
     res.render("index.ejs", { quotes: results });
    })
    .catch((error) => console.error(error));
  });

  // this is a CREATE / POST operation in CRUD
  // sends data from form to db collection
  app.post("/quotes", (req, res) => {
   quotesCollection
    .insertOne(req.body)
    .then((result) => {
     res.redirect("/");
    })
    .catch((err) => console.error(err));
  });

  app.put("/quotes", (req, res) => {
   //  console.log(req.body);
   quotesCollection
    .findOneAndUpdate(
     { name: "yoda" },
     {
      $set: {
       name: req.body.name,
       quote: req.body.quote,
      },
     },
     {
      upsert: true,
     }
    )
    .then((results) => {
     res.json("success");
    })
    .catch((err) => console.error(err));
  });

  // create a server that browsers can connect to
  app.listen(3000, () => {
   console.log(`we listenin' on... http://localhost:3000`);
  });
 })
 .catch((error) => console.error(error));
