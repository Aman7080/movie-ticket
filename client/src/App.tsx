import { useState, SetStateAction, useEffect } from "react";
import "./App.css";
import { movies, slots, seats } from "./data";

function App() {
  const [selectedMovie, setSelectedMovie] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [selectedSeat, setSelectedSeat] = useState("");
  const [totalSeat, setTotalSeat] = useState({
    A1: 0,
    A2: 0,
    A3: 0,
    A4: 0,
    D1: 0,
    D2: 0,
  });

  useEffect(() => {
    const movies = JSON.parse(localStorage.getItem("movie"));
    if (movies) {
      setSelectedMovie(movies);
    }
    const slot = JSON.parse(localStorage.getItem("slot"));
    if (slot) {
      setSelectedSlot(slot);
    }
    const seat = JSON.parse(localStorage.getItem("seat"));
    if (seat) {
      setSelectedSeat(seat);
    }

    const totalseat = JSON.parse(localStorage.getItem("totalseat"));
    if (totalseat) {
      setTotalSeat(totalseat);
    }
  }, []);

  const handleMovieClick = (name: string | SetStateAction<string>) => {
    setSelectedMovie(name === selectedMovie ? "" : name);
  };

  useEffect(()=>{
    localStorage.setItem("movie", JSON.stringify(selectedMovie));
  },[selectedMovie])


  const handleSlotClick = (slot: SetStateAction<string>) => {
    setSelectedSlot(slot === selectedSlot ? "" : slot);
  };

  useEffect(()=>{
    localStorage.setItem("slot", JSON.stringify(selectedSlot));
  },[selectedSlot])

  const handleSeatClick = (seat: SetStateAction<string>) => {
    setSelectedSeat(seat === selectedSeat ? "" : seat);
  };


  const handleSeatChange = (seat: string, value: number) => {
    setTotalSeat((prevTotalSeat) => ({
      ...prevTotalSeat,
      [seat]: value,
    }));
   
  };

  useEffect(()=>{
    localStorage.setItem("totalseat",JSON.stringify(totalSeat))
  },[totalSeat])


  const bookMovie = () => {
    console.log("Movie = " + selectedMovie);
    console.log("Slot = " + selectedSlot);
    console.log("total Seat = " + totalSeat);
  };

  return (
    <div className="container">
      <div>
        <h2>Book That Show!!</h2>
        {/* Movie Selection */}
        <div className="movie-row">
          <h2>Select A Movie</h2>
          {movies?.map((name, index) => (
            <div
              className={`movie-column ${
                selectedMovie === name ? "movie-column-selected" : ""
              }`}
              key={index}
              onClick={() => handleMovieClick(name)}
            >
              <p>{name}</p>
            </div>
          ))}
        </div>
        {/* Slot Selection */}
        <div className="slot-row">
          <h2>Select A Time Slot</h2>
          {slots?.map((slot, index) => (
            <div
              className={`slot-column ${
                selectedSlot === slot ? "slot-column-selected" : ""
              }`}
              key={index}
              onClick={() => handleSlotClick(slot)}
            >
              <p>{slot}</p>
            </div>
          ))}
        </div>
        {/* Seat Selection */}
        <div className="seat-row">
          <h2>Select A Time Slot</h2>
          {seats?.map((seat, index) => (
            <div
              className={`seat-column ${
                selectedSlot === seat ? "seat-column-selected" : ""
              }`}
              key={index}
              onClick={() => handleSeatClick(seat)}
            >
              <p>Type{seat}</p>
              <input
                type="number"
                id={`seat-${seat}`}
                onChange={(e) => handleSeatChange(seat, parseInt(e.target.value))}
                className="input"
              />
            </div>
          ))}
        </div>
        <button onClick={bookMovie}>Book Now</button>
      </div>
      <div className="last-order">
        <h2>Last Bookings Details : </h2>
      </div>
    </div>
  );
}

export default App;
