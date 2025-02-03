const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
const url = "mongodb://localhost:27017";
const dbName = "Employee";
let db;

// Connect to MongoDB
MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((client) => {
    console.log("Connected to MongoDB");
    db = client.db(dbName);
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// Insert the data
app.post("/api/data", async (req, res) => {
  const { Emp_Firstname, Emp_Lastname, Email } = req.body;

  try {
    if (!Emp_Firstname || !Emp_Lastname || !Email) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const result = await db.collection("Emp_details").insertOne({
      Emp_Firstname,
      Emp_Lastname,
      Email,
    });

    res.status(201).json({ message: "Data inserted successfully", id: result.insertedId });
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});



// Fetch all data
app.get("/api/data", async (req, res) => {
  try {
    const data = await db.collection("Emp_details").find().toArray();
    res.json(data);
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({ error: err.message });
  }
});

// Update data
app.put('/api/data/:id', async (req, res) => {
  const { id } = req.params;
  const { Emp_Firstname, Emp_Lastname, Email } = req.body;
  
  console.log('PUT Request ID:', id);
  console.log('PUT Request Body:', req.body);

  try {
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    const result = await db.collection("Emp_details").updateOne(
      { _id: new ObjectId(id) },
      { $set: { Emp_Firstname, Emp_Lastname, Email } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.json({ message: 'Data updated successfully' });
  } catch (error) {
    console.error('Error during PUT request:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete a record
app.delete("/api/data/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.collection("Emp_details").deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      res.status(404).json({ message: "Employee not found" });
    } else {
      res.json({ message: "Data deleted successfully" });
    }
  } catch (err) {
    console.error("Error deleting data:", err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
