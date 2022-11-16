import { Box, Button, Modal } from "@mui/material";
import React from "react";
import { BsPlayCircle } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { getAllTrailer } from "../../redux/actions/trailerActions";

function Trailer({ item }) {
  const { trailer } = useSelector((state) => state.trailer);
  const trailerf = trailer?.results?.filter(
    (a) => a.type === "Trailer" && a.site === "YouTube"
  )[0].key;
  const [open, setOpen] = React.useState(false);

  const dispatch = useDispatch();

  function fetchVideos() {
    dispatch(getAllTrailer(item.id));
  }

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div>
      <Button
        variant="contained"
        startIcon={<BsPlayCircle />}
        style={{ minWidth: "100px" }}
        onClick={() => {
          setOpen(true);
          fetchVideos();
        }}
      >
        Watch Trailer
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h4 style={{ marginTop: "0", textAlign: "center" }}>
            Trailer of {item.title}
          </h4>
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${trailerf}`}
            title={"YouTube video player"}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </Box>
      </Modal>
    </div>
  );
}

export default Trailer;
