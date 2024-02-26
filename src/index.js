const dotenv = require("dotenv");
dotenv.config();

const { connectDB } = require("./db/connection");
const { app } = require("./app");
const port = process.env.PORT;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`⚙️ Server is running at port : ${port}`);
    });
  })
  .catch((error) => {
    console.log("MongoDb Connection failed: ", error);
  });
