import { MongoClient, ObjectId } from "mongodb";
import { useRouter } from "next/router";
import { Fragment } from "react/cjs/react.production.min";
import Head from "next/head";
const DetailList = (props) => {
  console.log(props);
  const router = useRouter();
  console.log(router.query);
  return (
    <Fragment>
      <Head>
        <title> {props.meetups.title}</title>
        <meta name={props.meetups.title} content={props.meetups.description} />
      </Head>
      <img src={props.meetups.image} alt={props.meetups.title} />
      <h1>{props.meetups.title}</h1>
      <address> {props.meetups.address}</address>
      <p> {props.meetups.description} </p>
    </Fragment>
  );
};

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://firstproject:firstproject@cluster0.8k9wy.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupCollection = db.collection("meetups");
  // const result = await meetupCollection.insertOne(data);
  const meetups = await meetupCollection.find({}, { _id: 1 }).toArray();
  client.close();

  return {
    fallback: "blocking",

    paths: meetups.map((meetup) => {
      return {
        params: {
          detailMeetup: meetup._id.toString(),
        },
      };
    }),
  };
}

export async function getStaticProps(context) {
  // we are trying to simulate the fetching of an sepecific meetup here
  //  we fetch the data and it is returned in the props object.
  // There is a problem ... we need to reach the url and extract the page id in order to identfy
  //but we can do it though the cotext parameter

  const meetupId = context.params.detailMeetup;

  const client = await MongoClient.connect(
    "mongodb+srv://firstproject:firstproject@cluster0.8k9wy.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupCollection = db.collection("meetups");

  const meetupData = await meetupCollection.findOne({
    _id: ObjectId(meetupId),
  });
  // const meetupData = await meetupCollection;
  console.log(meetupData);
  client.close();
  return {
    props: {
      meetups: {
        id: meetupData._id.toString(),
        title: meetupData.title,
        address: meetupData.address,
        image: meetupData.image,
        description: meetupData.description,
      },
    },
  };
}

export default DetailList;
