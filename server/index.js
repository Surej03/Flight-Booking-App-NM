const express = require("express");
const cors = require("cors")
const app = express();
const port = 3000;

app.use(express.json());

const flightRoutes = require('./routes/flightRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

app.use('/flights', flightRoutes);
app.use('/bookings', bookingRoutes);

app.listen(port, ()=> {
    console.log(`The Server is running at ${port}`)
});