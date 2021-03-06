import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  height: 200px;
  border-radius: 7px;
  width: 100%;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  background-color: transparent;
`;

const Poster = styled.div`
  background-image: url(${(props) => props.img});
  height: 100%;
  width: 100%;
  background-size: cover;
  background-position: center center;
`;

function Movie(props) {
  return (
    <Container>
      <Link to={`/${props.id}`}>
        <Poster img={props.image} />
      </Link>
      <button>{props.isLiked ? "Unlike" : "Like"}</button>
    </Container>
  );
}

export default Movie;
