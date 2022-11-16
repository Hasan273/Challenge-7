import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Header from "../Components/Header/Header";
import Trailer from "../Components/Trailer/Trailer";
import MovieBox from "../Pages/Details"

import {
  getAllMovies,
  getAllTrendingMovies,
} from "../redux/actions/movieActions";
import "../style/landingPage.scss";

function Home(token, setToken) {
  const dispatch = useDispatch();
  const { movies, moviet } = useSelector((state) => state.movie);

  const navigate = useNavigate();
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    dispatch(getAllMovies());
    dispatch(getAllTrendingMovies());
  }, [dispatch]);

  return (
    <div>
      <div>
        {!token ? (
          <>
            <Header></Header>
          </>
        ) : (
          <></>
        )}
        <Carousel>
      {/* 1 */}
      <Carousel.Item interval={750}>
        <img className="d-block w-100"
        src="https://www.themoviedb.org/t/p/original/4TIRvoMRretogHfr988pdm062Vy.jpg"
        alt="First slide"/>
        <Carousel.Caption>
          <h3>Doctor Stranger</h3>
          <p>Doctor Strange, with the help of mystical allies both old and new, traverses the mind-bending and dangerous alternate realities of the Multiverse to confront a mysterious new adversary.</p>
        </Carousel.Caption>
      </Carousel.Item>
      {/* 2 */}
      <Carousel.Item interval={750}>
        <img
          className="d-block w-100"
          src="https://www.themoviedb.org/t/p/original/AdyJH8kDm8xT8IKTlgpEC15ny4u.jpg"
          alt="Second slide"
        />
        <Carousel.Caption>
        <h3>Doctor Stranger</h3>
        <p>Doctor Strange, with the help of mystical allies both old and new, traverses the mind-bending and dangerous alternate realities of the Multiverse to confront a mysterious new adversary.</p>
        </Carousel.Caption>
      </Carousel.Item>
      {/* 3 */}
      <Carousel.Item interval={750}>
        <img
          className="d-block w-100"
          src="https://www.themoviedb.org/t/p/original/80K8zuNYC2nCwkgzYL8m0btEylp.jpg"
          alt="Third slide"
        />
        <Carousel.Caption>
        <h3>Doctor Stranger</h3>
        <p>Doctor Strange, with the help of mystical allies both old and new, traverses the mind-bending and dangerous alternate realities of the Multiverse to confront a mysterious new adversary.</p>
        </Carousel.Caption>
      </Carousel.Item>
      {/* 4 */}
      <Carousel.Item interval={750}>
        <img
          className="d-block w-100"
          src="https://www.themoviedb.org/t/p/original/lv3TXqhpaIxkclIHbhN2MRMOemQ.jpg"
          alt="Fourth slide"
        />
        <Carousel.Caption>
        <h3>Doctor Stranger</h3>
        <p>Doctor Strange, with the help of mystical allies both old and new, traverses the mind-bending and dangerous alternate realities of the Multiverse to confront a mysterious new adversary.</p>
        </Carousel.Caption>
      </Carousel.Item>
      {/* 5 */}
      <Carousel.Item interval={750}>
        <img
          className="d-block w-100"
          src="https://www.themoviedb.org/t/p/original/3NMTImL2NHi7yAfLp7nDPLWmb2I.jpg"
          alt="Fifth slide"
        />
        <Carousel.Caption>
        <h3>Doctor Stranger</h3>
        <p>Doctor Strange, with the help of mystical allies both old and new, traverses the mind-bending and dangerous alternate realities of the Multiverse to confront a mysterious new adversary.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
      </div>
      <div className="container">
        <br />
        <h1 className="text-white">POPULAR MOVIE</h1>
        <br />
        <Slider {...settings}>
          {movies?.results?.map((item) => (
            <div className="card-item" key={item.id}>
              <div className="card-inner">
                <div className="card-top">
                  <img
                    src={`http://image.tmdb.org/t/p/w500/${item.poster_path}`}
                    alt={item.title}
                    title={item.title}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(`details/${item.id}`);
                    }}
                  />
                </div>
                <div className="card-bottom">
                  <div className="card-info">
                    <h4>{item.title}</h4>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default Home;
