const express = require('express')
const cors=require('cors')
const app = express()
const port = 3000

// middleware
app.use(cors())
app.use(express.json());


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://tikitali:eLORxUCUKpyEB3d4@cluster0.msoxyyg.mongodb.net/?appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

 
async function run() {
  try {

    const db=client.db('tikitalidb');
    const ticketsCollection=db.collection('tickets');

// save ticket to the db
app.post('/tickets',async(req,res)=>{
  const ticketsData=req.body;
  ticketsData.status='pending'
  console.log(ticketsData);
  const result=await ticketsCollection.insertOne(ticketsData);
  res.send(result);
});

// get data from db
app.get('/tickets',async(req,res)=>{

})




    // Connect the client to the server	(optional starting in v4.7)

    await client.connect();

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('tik tik tiki tali')
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
});
 
