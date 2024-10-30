import { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is imported

function Home() {
  const [musics, setMusics] = useState([]);
  const [singer, setSinger] = useState("Anirudh Ravichander");

  // Update singer state when input changes
  const searchSinger = (event) => {
    setSinger(event.target.value);
  };

  // Fetch data when singer state changes
  useEffect(() => {
    const fetchData = async () => {
      if (singer.trim() === "") return; // Avoid fetching data if singer is empty

      try {
        const response = await axios.get(
          `https://v1.nocodeapi.com/ravitharun/spotify/BqnTGJFdECDwXWuG/search?q=${singer}&type=track`
        );
        setMusics(response.data.tracks.items);
      } catch (err) {
        alert(err.message);
      }
    };

    fetchData();
  }, [singer]); // Dependency array includes singer
  

  // Trigger search when button is clicked
  const handleSearch = () => {
    // This will trigger the useEffect hook to fetch data
    if (singer.trim() !== "") {
      // Do nothing here; useEffect will handle the search
    } else {
      alert("Please enter a singer name");
    }
  };

  return (
    <div className="container">
      <center className="mt-3">
        <h3 className="text-primary">MUSIC PLAYER</h3>
      </center>
      <div className="d-flex mb-3">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Enter singer name"
          required
          onChange={searchSinger}
        />
        <button className="btn btn-outline-primary" onClick={handleSearch}>
          Search
        </button>
      </div>
      <center>
        <p className="text-danger">Total Found: {musics.length}</p>
      </center>
      <div className="row shadow">
        {musics.map((data, index) => (
          <div key={index} className="col-md-3 mb-4">
            <div className="card" style={{ width: "100%" }}>
              <img
                src={data.album.images[0].url}
                alt={data.name}
                className="card-img-top"
                style={{ height: "180px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">{data.album.artists[0].name}</h5>
                <p className="card-text">Popularity: {data.popularity}</p>
                <p className="card-text">Name: {data.name}</p>
                <audio
                  src={data.preview_url}
                  controls
                  className="w-100"
                ></audio>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
