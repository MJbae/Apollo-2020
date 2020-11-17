import React from "react";
import { useQuery, gql } from "@apollo/client";

const GET_MOVIES = gql`
  {
    getAllMovies {
      id
      title
      medium_cover_image
    }
  }
`;

const Home = () => {
  const { loading, data } = useQuery(GET_MOVIES);
  console.log(loading, data);
  if (loading) {
    return <h2>loading...</h2>;
  }
  if (data && data.getAllMovies) {
    return data.getAllMovies.map((m) => <h1>{m.id}</h1>);
  }
};

export default Home;
