const express = require("express");
const connectDB = require("./config");

const dotenv = require("dotenv");

const bodyParser = require("body-parser");

const authRoutes = require('./routes/authRoutes')
const todoRoutes = require('./routes/todoRoutes')


dotenv.config();
connectDB();

const app = express();
app.use(bodyParser.json());


//routes
app.use("/api",authRoutes);
app.use("/api",todoRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server running on port${PORT}`);
});
