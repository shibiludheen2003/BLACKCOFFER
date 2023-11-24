import mongoose from "mongoose"

// Define a Mongoose schema
const graphSchema = new mongoose.Schema({
  end_year: String,
  intensity: Number,
  sector: String,
  topic: String,
  insight: String,
  url: String,
  region: String,
  start_year: String,
  impact: String,
  added: String,
  published: String,
  country: String,
  relevance: Number,
  pestle: String,
  source: String,
  title: String,
  likelihood: Number
});

// Create a Mongoose model based on the schema
const GraphModel = mongoose.model('GraphModel', graphSchema);

// Export the GraphModel as the default export
export default  GraphModel;