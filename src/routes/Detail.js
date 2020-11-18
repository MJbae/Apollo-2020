import React from "react";
import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Movie from "./Movie";

const GET_MOVIE = gql`
  query getMovie($id: Int!) {
    getOneMovie(id: $id) {
      title
      medium_cover_image
      language
      rating
      description_intro
    }
    getSuggestedMovies(id: $id) {
      id
      title
      medium_cover_image
    }
  }
`;

const Container = styled.div`
  height: 100vh;
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  color: white;
`;

const Header = styled.header`
  height: 80vh;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Column = styled.div`
  margin-left: 10px;
  width: 50%;
`;

const Title = styled.h1`
  font-size: 65px;
  margin-bottom: 15px;
`;

const Subtitle = styled.h4`
  font-size: 35px;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 28px;
`;

const Poster = styled.div`
  background-image: url(${(props) => props.img});
  width: 25%;
  height: 60%;
  background-size: cover;
  background-position: center center;
`;

const Movies = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 25px;
  width: 60%;
  position: relative;
  top: -10px;
`;

function Detail() {
  const { id } = useParams();
  const { loading, data } = useQuery(GET_MOVIE, {
    variables: { id: parseInt(id) },
  });

  return (
    <Container>
      <Header>
        <Column>
          <Title>{loading ? "Loading..." : data.getOneMovie.title}</Title>
          <Subtitle>
            {loading
              ? ""
              : `${data.getOneMovie.language} · ${data.getOneMovie.rating}`}
          </Subtitle>
          <Description>{data?.getOneMovie?.description_intro}</Description>
        </Column>
        <Poster
          img={
            // 주석은 삼항연산자 처리, 본문은 Optional Chaning 처리
            // !loading && data.getOneMovie
            //   ? data.getOneMovie.medium_cover_image
            //   : ""
            data?.getOneMovie?.medium_cover_image
          }
        ></Poster>
      </Header>
      {data?.getSuggestedMovies && (
        <>
          <br />
          <br />
          <Subtitle>Suggestions</Subtitle>
          <br />
          <Movies>
            {data.getSuggestedMovies.map((movie) => (
              <Movie
                key={movie.id}
                id={movie.id}
                image={movie.medium_cover_image}
              />
            ))}
          </Movies>
        </>
      )}
    </Container>
  );
}

export default Detail;
