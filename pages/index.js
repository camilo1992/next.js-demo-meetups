import { MongoClient } from "mongodb";
import { Fragment } from "react/cjs/react.production.min";
import MeetupList from "../components/meetups/MeetupList";
import Head from "next/head";

const HomePage = (props) => {
  return (
    <Fragment>
      <Head>
        <title> React meetups using next.js</title>
        <meta
          name="Description"
          content="Browes highly active meetups anywhere"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
};

// // use getServerSideProps if you have data that changes very frequently
// export async function getServerSideProps(context) {
//   // the context parametter give us access to the request object
//   // and response object....
//   //  this is familair if you have worked with expres.js or node.js
//   const req = context.req; // this is useful ifg you work with authentication or check some setion cookie
//   const res = context.res;
//   return { props: { meetups: DUMMY }, revalidate: 10 };
// }

// getStaticProps need to be called like this always
// next will identify this functrion and execute it before rendering the component
// this proces will rendert the page statically. Therefore ... we do not need to send request
// within the componenet instead we do it here ... this is fetched during the building process. also
// we need to follow this structure always { props: { YYYY: XXX }, reavalidate : 10 },

//  revalidate  help us to prerender our page so that we keep it updated.
//  it is rendered on the server. 10 ---> how long it is ngonna take to update inf
// If you do not need authentication .. it is better to use getStatitcProps

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://firstproject:firstproject@cluster0.8k9wy.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupCollection = db.collection("meetups");
  // const result = await meetupCollection.insertOne(data);
  const meetups = await meetupCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => {
        return {
          title: meetup.title,
          image: meetup.image,
          address: meetup.address,
          id: meetup._id.toString(),
        };
      }),
    },
    revalidate: 1,
  };
}
export default HomePage;
