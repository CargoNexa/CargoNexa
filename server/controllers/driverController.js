// driverController.js
const DriverModel = require('../models/driverModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
require('dotenv').config();

const registerDriver = async (req, res) => {
  const validationSchema = Joi.object({
    driver_username: Joi.string().required(),
    driver_email: Joi.string().email().required(),
    driver_password: Joi.string().required(),
    driver_license: Joi.number().integer().required(),
    truck_type: Joi.string().required(),
    production_year: Joi.number().integer().required(),
    plate_number: Joi.number().integer().required(),
    driver_size_type: Joi.string().required(),
  });

  const { error } = validationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const {
    driver_username,
    driver_email,
    driver_password,
    driver_license,
    truck_type,
    production_year,
    plate_number,
    driver_size_type,
  } = req.body;

  try {
    const existingDriver = await DriverModel.getDriverByEmail(driver_email);
    if (existingDriver) {
      return res.status(409).json({ error: 'Email is already registered for a driver' });
    }

    const newDriver = await DriverModel.createDriver(
      driver_username,
      driver_email,
      driver_password,
      driver_license,
      truck_type,
      production_year,
      plate_number,
      driver_size_type
    );

    const token = jwt.sign(
      { driver_id: newDriver.driver_id, driver_email: newDriver.driver_email, role_id: newDriver.role_id },
      process.env.SECRET_KEY,
      { expiresIn: '1h' }
    );

    res.status(201).json({ driver: newDriver, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const loginDriver = async (req, res) => {
    const validationSchema = Joi.object({
      driver_email: Joi.string().email().required(),
      driver_password: Joi.string().required(),
    });
  
    const { error } = validationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
  
    const { driver_email, driver_password } = req.body;
  
    try {
      console.log('Login attempt:', driver_email);
  
      const driver = await DriverModel.verifyDriverCredentials(driver_email, driver_password );
      console.log('Driver found:', driver);
  
      if (!driver) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      const token = jwt.sign(
        { driver_id: driver.driver_id, driver_email: driver.driver_email , role_id:driver.role_id },
        process.env.SECRET_KEY,
        { expiresIn: '24h' }
      );
  
      res.status(200).json({ message: 'Login successful', driver, token });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  

module.exports = { registerDriver, loginDriver };
