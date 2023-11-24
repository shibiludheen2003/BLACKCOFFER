import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import clientRoutes from "./routes/client.js";
import managementRoutes from "./routes/management.js";
import salesRoutes from "./routes/sales.js";
import generalRoutes from "./routes/general.js";
import Data from "./mongodbSchema/Schema.js";
import jsonData from "./jsonData/jsonData.js";

/* DATA CONFIG */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* MONGOOSE */
const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database is connected");
  } catch (err) {
    console.error(`Database connection error: ${err.message}`);
  }
};

/* ROUTES */

app.get("/data", async (req, res) => {
  const data = await Data.find();

  res.json({ message: "success", data });
});
// Modify your "/data/filter" endpoint
app.post("/data/filter", async (req, res) => {
  const { end_year, topic, sector, region, pestle, source, country } = req.body;
  const filter = {};
  country !== "Country" && (filter["country"] = country);
  source !== "Source" && (filter["source"] = source);
  pestle !== "Pestle" && (filter["pestle"] = pestle);
  region !== "Region" && (filter["region"] = region);
  sector !== "Sector" && (filter["sector"] = sector);
  topic !== "Topic" && (filter["topic"] = topic);
  end_year !== "EndYear" && (filter["end_year"] = end_year);

  const data = await Data.find({
    ...filter,
  });
  res.json({ message: "success", data });
});

app.post("/data/filteryear/end_year/:end_year", async (req, res) => {
  const { end_year } = req.params;
  const filter = end_year === "EndYear" ? {} : { end_year: end_year };
  const data = await Data.find({
    ...filter,
  });
  res.json({ message: "success", data });
});
app.get("/countries", async (req, res) => {
  const data = await Data.find();
  console.log(data);
  res.json({ message: "success", data });
});
app.get("/years", async (req, res) => {
  const data = await Data.find();
  console.log(data);
  res.json({ message: "success", data });
});
app.post("/data/filterByRegion", async (req, res) => {
  const { region } = req.body;

  try {
    const response = await GraphModel.find({ region }).sort({
      intensity: -1,
      end_year: 1,
    });
    res.json({ data: response });
  } catch (error) {
    console.error("Error fetching filtered data by region:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.get("/regions", async (req, res) => {
  const data = await Data.find();
  res.json({ message: "success", data });
});
/* Connect to the database when the application starts */
connectToDatabase();

/* Start the server */
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

/*JSON FILE  INSERT*/
