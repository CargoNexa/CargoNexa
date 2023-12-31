import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
// import { useCookies } from 'react-cookie';


const CreateOrder = () => {

  const navigate = useNavigate();
  const location = useLocation(); // Get the location object

  // Check if location.state exists before accessing its properties
  const { state } = location || {};
  const { title, description } = state || {};

  console.log(title);

console.log(title);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []); 


// State to hold form data
const [formData, setFormData] = useState({
  order_title: state ? state.title : '', // Set the initial value from props
  order_description: state ? state.description : '', // Set the initial value from props
  name: '',
  receiver_name: '',
  order_phone_number: '',
  receiver_phone_number: '',
  shipping_location: '',
  receiving_location: '',
  shipping_date: '',
  order_truck_size: '',
  reciving_timestamp: '',
  shipping_timestamp:'',
  message: '',
  status:''

 
});

// const [cookies] = useCookies(['token']); // Replace with your actual token cookie name


// Handle form input changes
const handleInputChange = (e) => {
  const { name, value, type, checked } = e.target;
  setFormData((prevData) => ({
    ...prevData,
    [name]: type === 'checkbox' ? checked : value,
  }));

};

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  // Check if the containsDangerousMaterials checkbox is checked
  if (!formData.contains_dangerous_materials) {
    // Display an error message using SweetAlert
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Please check the "containsDangerousMaterials" checkbox.',
    });
    return; // Prevent form submission
  }


    try {
      // Make a POST request using Axios
      // const authToken = cookies['token'];
      const response = await axios.post('http://localhost:3001/create', formData ,{
        // headers: { 
        //   Authorization: `${authToken}`,
        // },
      
      });
      
      // Handle the response as needed (e.g., show success message)
      console.log('Response:', response.data);
       // Display an good message using SweetAlert
       Swal.fire({
        icon: 'success',
        title: 'Order Successful!',
        text: 'Thank you for your order.',
        timer: 2000,

      });
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (error) {
      // Handle errors (e.g., show error message)
      console.error('Error:', error);
    }

  };

  // Function to reset form data
  const resetForm = () => {
    setFormData({
      order_title:'',
      order_description:'',
      name: '',
      receiver_name: '',
      order_phone_number: '',
      receiver_phone_number: '',
      shipping_location: '',
      receiving_location: '',
      shipping_date: '',
      order_truck_size: '',
      shipping_timestamp: '',
      receiving_timestamp: '',
      message: '',
      contains_dangerous_materials: false,

    });
  }
  return (
    <>
  <link
    href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400;600;700&display=swap"
    rel="stylesheet"
  />
  <style
    dangerouslySetInnerHTML={{
      __html: "\n  * {\n  font-family: 'Source Sans Pro'; \n  } \n"
    }}
  />
  <section className="shadow-blue-100 mx-auto max-w-screen-lg rounded-xl bg-white text-gray-600 shadow-lg sm:my-10 sm:border">
    <div className="container mx-auto flex flex-col flex-wrap px-5 pb-12">
      <div className="bg-slate-50 mx-auto mt-4 mb-10 flex w-full flex-wrap items-center space-x-4 py-4 md:mb-20 md:justify-center md:px-10">
        <span className="hidden h-8 w-8 items-center justify-center rounded-full bg-teal-500 text-white shadow md:inline-flex">
          1
        </span>
        <span className="hidden text-teal-500 md:inline">shipment details</span>
        <span className="hidden h-0.5 w-10 bg-teal-400 md:inline" />
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-600 text-white shadow">
          2
        </span>
        <span className="font-semibold text-gray-600 md:inline">payment option</span>
      
       
        <span className="text-xl md:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-3 w-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </span>
      </div>
      
      <div className="flex w-full flex-col">
      <form onSubmit={handleSubmit}>
        <h1 className="text-2xl font-semibold">{formData.order_title}</h1>
        <p className="mt-2 text-gray-500">
        {formData.order_description}
        </p>
       
        <div className="mt-4 grid items-center gap-3 gap-y-5 sm:grid-cols-2">
        <div className="flex flex-col ">
            <label className="mb-1 ml-3 font-semibold text-gray-500" htmlFor="">
             Name
            </label>
                      <input
            className="rounded-lg border px-2 py-2 shadow-sm outline-none focus:ring"
            name="name"
            id="fullName"
            type='text'
            placeholder='Ahmad'
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          </div>
          <div className="col-span-1 flex flex-col">
            <label className="mb-1 ml-3 font-semibold text-gray-500" htmlFor="">
              Receiver Name
            </label>
                    <input
          className="rounded-lg border px-2 py-2 shadow-sm outline-none focus:ring"
          name="receiver_name"
          id="receiverName"
          type='text'
          placeholder='Sara'
          value={formData.receiver_name}
          onChange={handleInputChange}
           required
        />
       
          </div>
        <div className="flex flex-col ">
            <label className="mb-1 ml-3 font-semibold text-gray-500" htmlFor="">
             phone number 
            </label>
                    <input
          className="rounded-lg border px-2 py-2 shadow-sm outline-none focus:ring"
          name="order_phone_number"
          id="phoneNumber"
          type='text'
          placeholder='+962'
          value={formData.order_phone_number}
          onChange={handleInputChange}
           required
        />

          </div>
          <div className="col-span-1 flex flex-col">
            <label className="mb-1 ml-3 font-semibold text-gray-500" htmlFor="">
              Receiver phone number 
            </label>
                      <input
            className="rounded-lg border px-2 py-2 shadow-sm outline-none focus:ring"
            name="receiver_phone_number"
            id="receiverPhoneNumber"
            type='text'
            placeholder='+962'
            value={formData.receiver_phone_number}
            onChange={handleInputChange}
             required
          />

       
          </div>
          <div className="flex flex-col ">
    <label className="mb-1 ml-3 font-semibold text-gray-500" htmlFor="">
        Shipping location
    </label>
          <select
        className="rounded-lg border px-2 py-2 shadow-sm outline-none focus:ring"
        name="shipping_location"
        id="shippingLocation"
        value={formData.shipping_location}
        onChange={handleInputChange}
         required
      >
      <option value="">Select Governorate</option>
        <option value="Irbid">Irbid</option>
        <option value="Ajloun">Ajloun</option>
        <option value="Jerash">Jerash</option>
        <option value="Mafraq">Mafraq</option>
        <option value="Balqa">Balqa</option>
        <option value="Amman">Amman</option>
        <option value="Zarqa">Zarqa</option>
        <option value="Madaba">Madaba</option>
        <option value="Karak">Karak</option>
        <option value="Tafilah">Tafilah</option>
        <option value="Ma'an">Ma'an</option>
        <option value="Aqaba">Aqaba</option>
    </select>
</div>

          <div className="col-span-1 flex flex-col">
            <label className="mb-1 ml-3 font-semibold text-gray-500" htmlFor="">
            Receiving location
            </label>
            <select
            className="rounded-lg border px-2 py-2 shadow-sm outline-none focus:ring"
            name="receiving_location"
            id="receivingLocation"
            value={formData.receiving_location}
            onChange={handleInputChange}
             required
          >
      <option value="">Select Governorate</option>
        <option value="Irbid">Irbid</option>
        <option value="Ajloun">Ajloun</option>
        <option value="Jerash">Jerash</option>
        <option value="Mafraq">Mafraq</option>
        <option value="Balqa">Balqa</option>
        <option value="Amman">Amman</option>
        <option value="Zarqa">Zarqa</option>
        <option value="Madaba">Madaba</option>
        <option value="Karak">Karak</option>
        <option value="Tafilah">Tafilah</option>
        <option value="Ma'an">Ma'an</option>
        <option value="Aqaba">Aqaba</option>
    </select>
          </div>
          <div className="flex flex-col ">
            <label className="mb-1 ml-3 font-semibold text-gray-500" htmlFor="">
            Shipping Date
            </label>
            <input
            className="rounded-lg border px-2 py-2 shadow-sm outline-none focus:ring"
            name="shipping_date"
            id="shippingDate"
            type='date'
            value={formData.shipping_date}
            onChange={handleInputChange}
             required
          />
          </div>
          <div className="col-span-1 flex flex-col">
            <label className="mb-1 ml-3 font-semibold text-gray-500" htmlFor="">
            Truck Size
            </label>
            <select
            className="rounded-lg border px-2 py-2 shadow-sm outline-none focus:ring"
            name="order_truck_size"
            id="truckSize"
            value={formData.order_truck_size}
            onChange={handleInputChange}
             required
          >
            <option value="">Select Size</option>
            <option value="Small">Small Truck (1 ton)</option>
            <option value="Medium">Medium Truck (3-5 ton)</option>
            <option value="Large">Large Truck (8-12 ton)</option>
          </select>
          </div>
       
          <div className="flex flex-col ">
            <label className="mb-1 ml-3 font-semibold text-gray-500" htmlFor="">
            Shipping Time            </label>
            <input
            className="rounded-lg border px-2 py-2 shadow-sm outline-none focus:ring"
            name="shipping_timestamp"
            id="shippingTime"
            type='time'
            value={formData.shipping_timestamp}
            onChange={handleInputChange}
             required
          />
          </div>
          <div className="col-span-1 flex flex-col">
            <label
              className="text-md font-semibold  text-gray-500"
              htmlFor=""
            >
              Receiver Time
            </label>
            <input
                className="rounded-lg border px-2 py-2 shadow-sm outline-none focus:ring"
                name="receiving_timestamp"
                id="receiving_timestamp"
                type='time'
                value={formData.receiving_timestamp}
                onChange={handleInputChange}
                 required
              />
          </div>
       
          <div className="col-span-1 flex flex-col">
            <label className="mb-1 ml-3 font-semibold text-gray-500" htmlFor="">
           Message 
            </label>
            <input
            className="rounded-lg border px-2 py-2 md:px-5 md:py-5 shadow-sm outline-none focus:ring"
            name="message"
            id="message"
            type='text'
            value={formData.message}
            onChange={handleInputChange}
          />
          </div>
       
         
        </div>
        <br/>
      
        <label className="mb-4 flex items-center" htmlFor="">
        <input
          className="accent-blue-700 mr-3 h-5 w-5"
          type="checkbox"
          name="contains_dangerous_materials"
          id="containsDangerousMaterials"
          checked={formData.contains_dangerous_materials}
          onChange={handleInputChange}
          
      />
            The shipment does not contain any dangerous materials or foodstuffs!
          </label>
        <div className="flex flex-col justify-between sm:flex-row">
       
          {/* <Link to={'/NewOrders'}> */}
            <button type='submit' className="group my-2 flex w-full items-center justify-center rounded-lg bg-my-green py-2 text-center font-bold text-white outline-none transition sm:order-1 sm:w-40 focus:ring">
            Continue
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="group-hover:translate-x-2 ml-4 h-4 w-4 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </button>
          {/* </Link> */}
          <button className="group order-1 my-2 flex w-full items-center justify-center rounded-lg bg-gray-200 py-2 text-center font-bold text-gray-600 outline-none transition sm:w-40 focus:ring hover:bg-gray-300" 
           onClick={() => resetForm()}>
            Cancel
          </button>
        </div>
        </form>
        <Link to={'/orderDetails'}><button>order</button></Link>
      </div>
    </div>
  </section>
</>

  )
}


export default CreateOrder