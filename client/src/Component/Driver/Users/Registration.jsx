
import React, { useState } from 'react';
import axios from 'axios'; // Import Axios
import RegValidate from './RegValidate';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const Registration = () => {

const [values,setValues]=useState([]);
const [cookies, setCookie] = useCookies(['token']);
const navigate=useNavigate();


// Handle the change in inputs
const handleInputs=(e)=>{
    setValues({...values, [e.target.name]: e.target.value}) ;       
   console.log("values",values)
}

// Handle submit for the form 
const handleSubmit = async (e) => {
    e.preventDefault();
   
 

    // Check if there are any validation errors before sending the data

    try {
      console.log("first")
      // Make a POST request to your API endpoint
      const response = await axios.post('http://localhost:3001/drivers/register', values)
        // Registration was successful
        console.log('Registration successful:', response.data);
        setValues({
          driver_username: '',
          driver_email: '',
          driver_license: '',
          truck_type: '',
          production_year: '',
          plate_number: '',
          driver_size_type: '',
          driver_password: '',
        });
        const token = response.data.token;

        // Set the token in a cookie
        setCookie('token', token, { path: '/' });
        navigate('/NewOrders')
    } catch (error) {
      // Handle network or other errors
      console.error('Registration error:', error);
    }
  
}

  return (
    
    <>
    
    <div className=" mx-auto flex justify-center h-[45rem] max-w-lg flex-col md:max-w-none md:flex-row  md:pr-10 md:my-10 lg:my-10 my-96 ">

  <div className=" max-w-md rounded-3xl bg-gradient-to-t from-[#219C90] via-[#219C90] to-[#42a399] px-4 py-20 text-white sm:px-10 md:m-6 md:mr-8 ">
    <p className="mb-28 font-bold tracking-wider">CargoNexa</p>
    <p className="mb-4 text-3xl font-bold md:text-4xl md:leading-snug ">
      Start your 
      shipping<br /> with us
    </p>
    <p className="mb-28 leading-relaxed text-gray-200">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere nisi
      voluptas a officia. Omnis.
    </p>
   
  </div>

  <form onSubmit={handleSubmit} className=" px-4 py-10 ">
    {/* <h2 className="mb-2 text-3xl font-bold">Registration</h2>
    <Link to="/login" className="mb-10 block font-bold text-gray-600">
      Have an account
    </Link> */}
   
    <p className="mb-1 font-medium text-gray-500">Username</p>
    <div className="mb-2 flex flex-col">
      <div className="focus-within:border-[#219C90] relative flex overflow-hidden rounded-md border-2 transition sm:w-80 lg:w-full">
        <input
          type="text"
          onChange={handleInputs}
          className="w-full border-gray-300 bg-white px-4 py-1 text-base text-gray-700 placeholder-gray-400 focus:outline-none md:pr-24"
          placeholder="Enter your username"
          name='driver_username'
        />
      </div>
    </div>
    <p className="mb-1 font-medium text-gray-500">Email</p>
    <div className="mb-2 flex flex-col">
      <div className="focus-within:border-[#219C90] relative flex overflow-hidden rounded-md border-2 transition sm:w-80 lg:w-full">
        <input
          type="email"
          onChange={handleInputs}
          className="w-full border-gray-300 bg-white px-4 py-1 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
          placeholder="Enter your email"
          name='driver_email'
        />
      </div>
    </div>
   
    <p className="mb-1 font-medium text-gray-500">Driver License</p>
    <div className="mb-2 flex flex-col">
      <div className="focus-within:border-[#219C90] relative flex overflow-hidden rounded-md border-2 transition sm:w-80 lg:w-full">
        <input
          type="text"
          onChange={handleInputs}
          className="w-full border-gray-300 bg-white px-4 py-1 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
          placeholder="driver license"
          name='driver_license'
        />
      </div>
    </div>
    <p className="mb-1 font-medium text-gray-500">Truck Type</p>
    <div className="mb-2 flex flex-col">
      <div className="focus-within:border-[#219C90] relative flex overflow-hidden rounded-md border-2 transition sm:w-80 lg:w-full">
        <input
          type="text"
          onChange={handleInputs}
          className="w-full border-gray-300 bg-white px-4 py-1 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
          placeholder="truck type"
          name='truck_type'
        />
      </div>
    </div>

    <p className="mb-1 font-medium text-gray-500">Production Year</p>
    <div className="mb-2 flex flex-col">
      <div className="focus-within:border-[#219C90] relative flex overflow-hidden rounded-md border-2 transition sm:w-80 lg:w-full">
        <input
          type="text"
          onChange={handleInputs}
          className="w-full border-gray-300 bg-white px-4 py-1 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
          placeholder="production year"
          name='production_year'
        />
      </div>
    </div>
    <p className="mb-1 font-medium text-gray-500">Plate Number</p>
    <div className="mb-2 flex flex-col">
      <div className="focus-within:border-[#219C90] relative flex overflow-hidden rounded-md border-2 transition sm:w-80 lg:w-full">
        <input
          type="text"
          onChange={handleInputs}
          className="w-full border-gray-300 bg-white px-4 py-1 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
          placeholder="plate number"
          name='plate_number'
        />
      </div>
    </div>
    <p className="mb-1 font-medium text-gray-500">Truck Size</p>
    <div className="mb-2 flex flex-col">
      <div className="focus-within:border-[#219C90] relative flex overflow-hidden rounded-md border-2 transition sm:w-80 lg:w-full">
      
          <select
            className="w-full border-gray-300 bg-white px-4 py-1 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
            placeholder="Choose a password (minimum 8 characters)"
            name='driver_size_type'
            id="truckSize"
            onChange={handleInputs}
             required
          >
            <option value="" className='text-gray-400'>Select Size</option>
            <option value="Small">Small Truck (1 ton)</option>
            <option value="Medium">Medium Truck (3-5 ton)</option>
            <option value="Large">Large Truck (8-12 ton)</option>
          </select>
      </div>
    </div>
    <p className="mb-1 font-medium text-gray-500">Password</p>
    <div className="mb-2 flex flex-col">
      <div className="focus-within:border-[#219C90] relative flex overflow-hidden rounded-md border-2 transition sm:w-80 lg:w-full">
        <input
          type="password"
          onChange={handleInputs}
          className="w-full border-gray-300 bg-white px-4 py-1 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
          placeholder="Enter your password "
          name='driver_password'
        />
      </div>
    </div>

   


    <button type='submit' className="hover:shadow-blue-600/40 rounded-xl bg-gradient-to-r from-[#219C90] to-[#219C90] px-8 py-3 font-bold text-white transition-all hover:opacity-90 hover:shadow-lg">
      Sign Up
    </button>
  </form></div>


    </>
  )
}

export default Registration