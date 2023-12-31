const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const userRoutes = require('./routes/userRouter');
const driverRoutes = require('./routes/driverRouter'); 
const adminRoutes = require('./routes/adminRouter'); 
const createOrder = require("./routes/orderRouter");
const dashboardOrdersRouter = require('./routes/dashboardOrdersRouter');
const dashboardUsersRouter = require('./routes/dashboardUsersRouter');
const dashboardDriversController = require('./routes/dashboardDriversRouter');
const userProfile = require('./routes/userProfileRouter');
const services = require('./routes/servicesRouter');
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/users', userRoutes);
app.use('/drivers', driverRoutes);
app.use(createOrder);
app.use('/admin' , adminRoutes);
app.use(dashboardOrdersRouter);
app.use(dashboardUsersRouter);
app.use(dashboardDriversController);
app.use(userProfile);
app.use(services);


const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
app.post("/payment", cors(), async (req, res) => {
  let { amount, id } = req.body;
  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description: "Spatula company",
      payment_method: id,
      confirm: true,
      return_url: "http://localhost:3000/",
    });
    console.log("Payment", payment);
    res.json({
      message: "Payment successful",
      success: true,
    });
  } catch (error) {
    console.log("Error", error);
    res.json({
      message: "Payment failed",
      success: false,
    });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
