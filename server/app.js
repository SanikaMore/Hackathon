const express = require("express");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const doubtRoutes = require("./routes/doubtRoutes");
const bodyParser = require("body-parser");
const AppError = require("./utils/appError");
const cookieParser = require("cookie-parser");
const cors = require("cors");
var morgan = require("morgan");

const tags = [
  'C', 'C++', 'CSS', 'HTML', 'Java', 'JavaScript', 'Python', 'R', 'SQL',
  'Amazon DynamoDB', 'MongoDB', 'MySQL', 'Neo4j', 'Oracle', 'PostgreSQL',
  'Redis', 'SQL Server', 'SQLite', 'AWS', 'Firebase', 'Linux', 'Mac OS',
  'Angular', 'Django', 'Hadoop', 'Node.js', 'React', 'Spring', 'TensorFlow'
];

const app = express();

app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors({ credentials: true }));
express.urlencoded({ extended: false });

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

module.exports = app;

app.use("/user", userRoutes);
app.use("/post", postRoutes);
app.use("/doubts", doubtRoutes);

app.get("/tags", async (req, res) => {
  res.status(200).json(tags);
});

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});


app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
  });
});