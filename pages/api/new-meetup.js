// this is gonna work as an url --->  POST /api/new-meetup/
import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    // const { title, image, address, description } = data;
    const client = await MongoClient.connect(
      "mongodb+srv://firstproject:firstproject@cluster0.8k9wy.mongodb.net/meetups?retryWrites=true&w=majority"
    );
    const db = client.db();

    const meetupCollection = db.collection("meetups");
    const result = await meetupCollection.insertOne(data);
    //  we can catch any error using try and catch here....
    console.log(result);
    client.close();

    //  since we are sending a request we also need to nuild a response

    // res.status(201); we can send a 201 status to reflect as a response that the data was stored
    res.status(201).json({ message: "Meetup inserted" });
  }
}

export default handler;
