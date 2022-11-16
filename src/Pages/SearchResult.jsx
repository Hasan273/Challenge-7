import React, { useEffect } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { getAllSearch } from "../redux/actions/searchActions";

function SearchResult() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("keywords");
  const dispatch = useDispatch();
  const { search } = useSelector((state) => state.search);

  useEffect(() => {
    dispatch(getAllSearch(query));
  }, [dispatch, query]);

  return (
    <div>
      <Container>
        <br />
        <br />
        <br />
        <br />
        <h1 className="text-white">Result For {query} </h1>
        <br />
        <div className="container">
        <div className="grid">
          {search?.results?.map((item) => {
            return (
              <Col md={3} className="movieWrapper" id="trending" key={item.id}>
                <Link to={`/Details/${item.id}`}>
                  <Card style={{ width: "18rem" }} className="rescard">
                    <Card.Img
                      className="resmovie"
                      variant="top"
                      src={`http://image.tmdb.org/t/p/w500/${item.poster_path}`}
                    />
                    <Card.Body className="cardb">
                      <Card.Title>{item.title}</Card.Title>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            );
          })}
        </div>
        </div>
      </Container>
    </div>
  );
}

export default SearchResult;
