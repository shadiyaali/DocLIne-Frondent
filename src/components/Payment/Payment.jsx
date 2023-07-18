import Axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/config";
import { useNavigate } from "react-router-dom";
import jwtDecode from 'jwt-decode';
import { getLocal } from '../../helpers/auth'

function PaymentPage(props) {
  const [user, setUser] = useState([]);

  useEffect(() => {
    const localResponse = getLocal('authToken');
    const response = jwtDecode(localResponse);
    setUser(response.user_id);
  }, []);

  const history = useNavigate();

  const { doctor, bookedSlot } = props;

  const handlePaymentSuccess = async (response) => {
    try {
      let bodyData = new FormData();
      bodyData.append("response", JSON.stringify(response));
      bodyData.append("slot", bookedSlot.id);
      bodyData.append("user", user);

      await Axios.post(`${BASE_URL}/razorpay/paysuccess/`, bodyData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          console.log("Everything is OK!");
          history('/success');
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(console.error());
    }
  };

  const loadScript = () => {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = resolve;
      script.onerror = reject;
      document.body.appendChild(script);
    });
  };

  const showRazorpay = async () => {
    try {
      await loadScript();

      let bodyData = new FormData();
      bodyData.append("amount", doctor.fee.toString());
      bodyData.append("name", doctor.user.username);
      bodyData.append("user", user);
      bodyData.append('doctor', doctor.id);
      bodyData.append('fee', doctor.fee);
      bodyData.append('slot', bookedSlot.id);

      const { data } = await Axios.post(`${BASE_URL}/razorpay/pay/`, bodyData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      const REACT_APP_PUBLIC_KEY = 'rzp_test_GdyTApPzGf7gjR';
      const REACT_APP_SECRET_KEY = '41dWu1DxxgUzZhn77Q5itEal';

      var options = {
        key_id: process.env.REACT_APP_PUBLIC_KEY,
        key_secret: process.env.REACT_APP_SECRET_KEY,
        amount: data.payment.amount,
        currency: "INR",
        name: "Org. Name",
        description: "Test transaction",
        image: "", // add image url
        order_id: data.payment.id,
        handler: function (response) {
          handlePaymentSuccess(response);
        },
        prefill: {
          name: "shadi",
          email: "User's email",
          contact: "User's phone",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };

      var rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-1/6">
      <button onClick={showRazorpay} className="bg-yellow-500 text-black py-2 px-4 rounded-md border-black mt-4">
        Pay with Razorpay
      </button>
    </div>
  );
}

export default PaymentPage;
