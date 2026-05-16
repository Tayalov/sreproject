const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const client = require("prom-client");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// METRICS
client.collectDefaultMetrics();

app.get("/metrics", async (req, res) => {
  res.set("Content-Type", client.register.contentType);
  res.end(await client.register.metrics());
});

// ROUTES
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/medicines", require("./routes/medicineRoutes"));
app.use("/api/reviews", require("./routes/reviewRoutes"));
app.use("/api/prescriptions", require("./routes/prescriptionRoutes"));

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");

    app.listen(5000, () => {
      console.log("Server running on 5000");
    });
  })
  .catch(err => console.log("Mongo error:", err));


// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// require("dotenv").config();

// const app = express();

// app.use(cors());
// app.use(express.json());

// app.use(express.static("public"));

// app.use("/api/auth", require("./routes/authRoutes"));
// app.use("/api/users", require("./routes/userRoutes"));
// app.use("/api/medicines", require("./routes/medicineRoutes"));
// app.use("/api/reviews", require("./routes/reviewRoutes"));
// app.use("/api/prescriptions", require("./routes/prescriptionRoutes"));

// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/public/index.html");
// });


// mongoose.connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log("MongoDB connected");
//     app.listen(process.env.PORT || 5000, () => {
//       console.log("Server running on port 5000");
//     });
//   })
//   .catch(err => console.log(err));

// const client = require('prom-client');

// const collectDefaultMetrics = client.collectDefaultMetrics;
// collectDefaultMetrics();

// app.get('/metrics', async (req, res) => {
//   res.set('Content-Type', client.register.contentType);
//   res.end(await client.register.metrics());
// });
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// require("dotenv").config();

// const app = express();

// app.use(cors());
// app.use(express.json());

// app.use(express.static("public"));

// app.use("/api/auth", require("./routes/authRoutes"));
// app.use("/api/users", require("./routes/userRoutes"));
// app.use("/api/medicines", require("./routes/medicineRoutes"));
// app.use("/api/reviews", require("./routes/reviewRoutes"));
// app.use("/api/prescriptions", require("./routes/prescriptionRoutes"));

// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/public/index.html");
// });


// const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/finalweb";
// mongoose.connect(MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
// .then(() => {
//   console.log("MongoDB connected");

//   const PORT = process.env.PORT || 5000;  
//   app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
//   });
// })
// .catch(err => console.error("MongoDB connection error:", err));


