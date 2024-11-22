import React, { useState } from "react";
import "./FlightBookingApp.css";

const FlightBookingApp = () => {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [numPassengers, setNumPassengers] = useState(1);
  const [flights, setFlights] = useState([]);
  const [bookedFlights, setBookedFlights] = useState([]);

  const availableFlights = [
    { id: 1, flightNumber: "AI-101", source: "New York", destination: "London", time: "10:00 AM", price: 500 },
    { id: 2, flightNumber: "AI-102", source: "New York", destination: "Paris", time: "1:00 PM", price: 450 },
    { id: 3, flightNumber: "AI-103", source: "New York", destination: "Tokyo", time: "5:00 PM", price: 700 },
  ];

  const handleSearch = () => {
    if (!source || !destination || !date) {
      alert("Please fill in all fields to search for flights.");
      return;
    }
    const filteredFlights = availableFlights.filter(
      (flight) =>
        flight.source.toLowerCase() === source.toLowerCase() &&
        flight.destination.toLowerCase() === destination.toLowerCase()
    );
    setFlights(filteredFlights);
  };

  const handleBook = (flight) => {
    const totalPrice = flight.price * numPassengers;
    const bookingDetails = { ...flight, date, numPassengers, totalPrice };
    setBookedFlights([...bookedFlights, bookingDetails]);
    alert(`Flight ${flight.flightNumber} booked successfully for $${totalPrice}!`);
    setFlights([]); // Clear search results
  };

  const handleCancelBooking = (flightId) => {
    setBookedFlights(bookedFlights.filter((flight) => flight.id !== flightId));
    alert("Booking cancelled successfully.");
  };

  return (
    <div className="flight-booking-app">
      {/* Navbar */}
      <header className="navbar">
        <h1>Flyingo</h1>
        <div className="auth-buttons">
          <button className="login-button">
             Login</button>
          <button className="signup-button" onClick={() => alert("Navigate to Signup Page")}>Signup</button>
        </div>
      </header>

      {/* Search Flights */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Source"
          value={source}
          onChange={(e) => setSource(e.target.value)}
        />
        <input
          type="text"
          placeholder="Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          type="number"
          min="1"
          placeholder="Passengers"
          value={numPassengers}
          onChange={(e) => setNumPassengers(e.target.value)}
        />
        <button onClick={handleSearch}>Search Flights</button>
      </div>

      {/* Display Flights */}
      <div className="flights-container">
        {flights.length > 0 ? (
          flights.map((flight) => (
            <div key={flight.id} className="flight-card">
              <h3>{flight.flightNumber}</h3>
              <p>
                {flight.source} → {flight.destination}
              </p>
              <p>Time: {flight.time}</p>
              <p>Price: ${flight.price} per passenger</p>
              <p>Total Cost: ${flight.price * numPassengers} for {numPassengers} passenger(s)</p>
              <button onClick={() => handleBook(flight)}>Book</button>
            </div>
          ))
        ) : (
          <p>No flights available. Try searching with different inputs.</p>
        )}
      </div>

      {/* Booking History */}
      {bookedFlights.length > 0 && (
        <div className="booking-history">
          <h2>Your Bookings</h2>
          {bookedFlights.map((flight) => (
            <div key={flight.id} className="booking-card">
              <h3>{flight.flightNumber}</h3>
              <p>
                {flight.source} → {flight.destination}
              </p>
              <p>Date: {flight.date}</p>
              <p>Passengers: {flight.numPassengers}</p>
              <p>Total Price: ${flight.totalPrice}</p>
              <button onClick={() => handleCancelBooking(flight.id)}>Cancel Booking</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FlightBookingApp;