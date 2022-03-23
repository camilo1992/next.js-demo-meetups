import { useRouter } from "next/router";
import { Fragment } from "react/cjs/react.production.min";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import Head from "next/head";

const NewMeetup = () => {
  const route = useRouter();
  const newMeetupHandler = async (meetupData) => {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(meetupData),
      headers: { "Content-type": "application/json" },
    });

    //  we are assuming that the response is successful.
    const data = await response.json();
    console.log(data);
    route.push("/");
  };
  return (
    <Fragment>
      <Head>
        <title> Add new meetups</title>
        <meta
          name="Description"
          content="Add a new meetu and increase your connections"
        />
      </Head>
      <NewMeetupForm onAddMeetup={newMeetupHandler} />;
    </Fragment>
  );
};

export default NewMeetup;
