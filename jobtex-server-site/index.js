const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();

const port = process.env.PORT || 5000;

// middleware
app.use(
  cors({
    origin: [
      "https://jobtex-b1ccd.web.app",
      "http://localhost:5173",
      
    ],
    credentials: true,
  })
);
app.use(express.json()); // for parsing application/json
app.use(cookieParser());

// MongoDB

const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@cluster0.jsqvega.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// middleWares
const logger = (req, res, next) => {
  console.log("log: info", req.method, req.url);
  next();
};
const verifyToken = (req, res, next) => {
  const token = req?.cookies?.token;
  // console.log("token in the middleware", token);

  if (!token) {
    return res.status(401).send({ message: "Unauthorized access" });
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized access" });
    }
    req.user = decoded;
    next();
  });
};

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    // databaseCreate
    const jobCollection = client.db("jobsDB").collection("jobs");
    const tabCategoryCollection = client.db("jobsDB").collection("tabCategory");
    const myBidsCollection = client.db("jobsDB").collection("myBids");

    // auth related api
    app.post("/jwt", logger, async (req, res) => {
      const user = req.body;
      // console.log("user for token", user);
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1h",
      });

      res.cookie(
        "token",
        token,
        {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production" ? true: false,
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        }
        ).send({ Success: true });
    });

    app.post("/logout", async (req, res) => {
      const user = req.body;
      console.log("logout user", user); 
      res.clearCookie(
        "token",
        {
        maxAge: 0,
        secure: process.env.NODE_ENV === "production" ? true: false,
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        }
        ).send({ success: true });
      // res.clearCookie("token", { maxAge: 0 }).send({ success: true });
    });

    app.get("/tabs", async (req, res) => {
      const result = await tabCategoryCollection.find().toArray();
      res.send(result);
    });

    app.get("/jobs", async (req, res) => {
      // console.log("Token owner", req.user);
      
      
      let query = {};
      if (req.query?.email) {
        // if (req.user.email !== req.query.email) {
        //   return res.status(403).send({ message: "Forbidden access" });
        // }
        query = { email: req.query.email };
      }
      const cursor = jobCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });

    // app.get("/jobs", async (req, res) => {
    //   const result = await jobCollection.find().toArray();
    //   res.send(result);
    // });

    
    app.get("/jobs/:id", async (req, res) => {
      let id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await jobCollection.findOne(filter);
      res.send(result);
    });

    app.post("/jobs", async (req, res) => {
      const newJob = req.body;
      const result = await jobCollection.insertOne(newJob);
      // console.log(result);
      res.send(result);
    });

    app.put("/jobs/:id", async (req, res) => {
      let id = req.params.id;
      const updateData = req.body;
      const filter = { _id: new ObjectId(id) };
      const optional = { upsert: true };
      const updateJobs = {
        $set: {
          title: updateData.title,
          description: updateData.description,
          category: updateData.category,
          deadline: updateData.deadline,
          minPrice: updateData.minPrice,
          maxPrice: updateData.maxPrice,
        },
      };
      const result = await jobCollection.updateOne(
        filter,
        updateJobs,
        optional
      );
      res.send(result);
      console.log(result);
    });

    // delete
    app.delete("/jobs/:id", async (req, res) => {
      let id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await jobCollection.deleteOne(filter);
      res.send(result);
      console.log(result);
    });

    // myBids
    app.get("/myBids", logger, verifyToken, async (req, res) => {
      // console.log("Token owner", req.user);
      if (req.user.email !== req.query.email) {
        return res.status(403).send({ message: "Forbidden access" });
      }
      let query = {};
      if (req.query?.email) {
        query = {
          yourEmail: req.query.email,
          // buyerEmail : req.query.email,
        };
      }
      console.log(req.user.status)
      const cursor = myBidsCollection.find(query);
      const result = await cursor.toArray();

      result.sort((a, b) => {
        const statusOrder = ["complete", "accept", "reject","pending"];
        return statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status);
      });

      res.send(result);
    });

    app.post("/myBids", async (req, res) => {
      const newBid = req.body;
      const result = await myBidsCollection.insertOne(newBid);
      res.send(result);
    });

    app.get("/myBids/:id", async (req, res) => {
      let id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await myBidsCollection.findOne(filter);
      res.send(result);
    });

    app.patch("/myBids/:id", async (req, res) => {
      let id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updatedStatus = req.body;
      const updateDoc = {
        $set: {
          status: updatedStatus.status,
        },
      };
      const result = await myBidsCollection.updateOne(filter, updateDoc);
      // console.log(result);
      res.send(result);
    });
    // bidsRequest
    app.get("/bidsRequest", logger, verifyToken, async (req, res) => {
      // console.log("Token owner", req.user);
      if (req.user.email !== req.query.email) {
        return res.status(403).send({ message: "Forbidden access" });
      }
      let query = {};
      if (req.query?.email) {
        
        query = {
          // yourEmail : req.query.email,
          buyerEmail: req.query.email,
        };
      }
      // console.log(req.query.email);
      const cursor = myBidsCollection.find(query);
      const result = await cursor.toArray();

      result.sort((a, b) => {
        const statusOrder = ["accept", "complete", "reject","pending"];
        return statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status);
      });
      res.send(result);
    });

    app.post("/bidsRequest", async (req, res) => {
      const newBid = req.body;
      const result = await myBidsCollection.insertOne(newBid);
      res.send(result);
    });

    app.get("/bidsRequest/:id", async (req, res) => {
      let id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await myBidsCollection.findOne(filter);
      res.send(result);
    });

    app.patch("/bidsRequest/:id", async (req, res) => {
      let id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updatedStatus = req.body;
      const updateDoc = {
        $set: {
          status: updatedStatus.status,
        },
      };
      const result = await myBidsCollection.updateOne(filter, updateDoc);
      // console.log(result);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send({
    message: "JobTex Marketplace is running",
    Admin: "Jony Islam",
    site_name: "JobTex Online Marketplace",
  });
});
app.listen(port, () => {
  console.log(`JobTex server is running on port ${port}`);
});
