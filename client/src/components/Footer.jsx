import React from "react";

// imported all icons of social media platforms
import { CiFacebook } from "react-icons/ci";
import { CiInstagram } from "react-icons/ci";
import { CiLinkedin } from "react-icons/ci";
import { TbBrandPinterest } from "react-icons/tb";

// imported all images
import circles from "../assets/icons/two circle.jpg";
import americanExpress from "../assets/icons/american express.png";
import applePay from "../assets/icons/apple pay.png";
import Discover from "../assets/icons/Discover-logo.png";
import googlePay from "../assets/icons/google pay.png";
import payPal from "../assets/icons/PayPal-Logo.png";
import visa from "../assets/icons/Visa-Logo.png";

const Footer = () => {
  return (
    <>
      <div className="bg-[#084240] text-white">
        <div className="flex md:flex-row flex-col max-w-[80rem] mx-auto p-10">
          <div className="grow basis-0">
            <p className="font-[Stylish] text-4xl">Yurush</p>
            <p className="my-10 text-lg font-semibold tracking-wide">
              Socially and environmentally progressive outdoor footwear
            </p>
            <div className="flex text-xl">
              <CiFacebook className="mr-4 hover:scale-125" />
              <CiInstagram className="mr-4 hover:scale-125" />
              <CiLinkedin className="mr-4 hover:scale-125" />
              <TbBrandPinterest className="mr-4 hover:scale-125" />
            </div>
          </div>
          <div className="grow basis-0">
            <h3 className="font-semibold my-4 ">Our Shop</h3>
            <p className="text-gray-300 py-2 text-sm hover:underline hover:text-white cursor-pointer">
              All Products
            </p>
            <p className="text-gray-300 py-2 text-sm hover:underline hover:text-white cursor-pointer">
              The Weekend Boot
            </p>
            <p className="text-gray-300 py-2 text-sm hover:underline hover:text-white cursor-pointer">
              The Winter Weekend Boot Z
            </p>
            <p className="text-gray-300 py-2 text-sm hover:underline hover:text-white cursor-pointer">
              The Terrus
            </p>
            <p className="text-gray-300 py-2 text-sm hover:underline hover:text-white cursor-pointer">
              Accessories
            </p>
          </div>
          <div className="grow basis-0">
            <h3 className="font-semibold my-4 ">Help</h3>
            <p className="text-gray-300 py-2 text-sm hover:underline hover:text-white cursor-pointer">
              Size guide
            </p>
            <p className="text-gray-300 py-2 text-sm hover:underline hover:text-white cursor-pointer">
              Shipping Information
            </p>
            <p className="text-gray-300 py-2 text-sm hover:underline hover:text-white cursor-pointer">
              Refund Policy
            </p>
            <p className="text-gray-300 py-2 text-sm hover:underline hover:text-white cursor-pointer">
              Wear and Care FAQ
            </p>
          </div>
          <div className="grow basis-0">
            <h3 className="font-semibold my-4 ">About us</h3>
            <p className="text-gray-300 py-2 text-sm hover:underline hover:text-white cursor-pointer">
              Values
            </p>
            <p className="text-gray-300 py-2 text-sm hover:underline hover:text-white cursor-pointer">
              Contact Us
            </p>
          </div>
        </div>

        {/* Line */}
        <hr className="border-0 h-px bg-gray-600" />

        {/* Final Section */}
        <div>
          <div className="flex justify-center gap-4 pt-14">
            <img
              src={circles}
              alt="circle card"
              className="h-[25px] bg-white p-1"
            />
            <img
              src={americanExpress}
              alt="american express card"
              className="h-[25px] bg-white p-1"
            />
            <img
              src={payPal}
              alt="paypal card"
              className="h-[25px] bg-white p-1"
            />
            <img
              src={googlePay}
              alt="google pay card"
              className="h-[25px] bg-white p-1"
            />
            <img src={visa} alt="visa card" className="h-[25px] bg-white p-1" />
            <img
              src={Discover}
              alt="discover card"
              className="h-[25px] bg-white p-1"
            />
            <img
              src={applePay}
              alt="apple pay card"
              className="h-[25px] bg-white p-1"
            />
          </div>
          <p className="text-center text-sm text-gray-300 py-8">
            &copy; 2023,
            <a href="/" className="mx-1 hover:text-white hover:underline">
              Yurush Outdoors
            </a>
            <a href="/" className="mx-1 hover:text-white hover:underline">
              Powered by Shopify
            </a>{" "}
            &#183;{" "}
            <a href="/" className="mx-1 hover:text-white hover:underline">
              Refund Policy
            </a>{" "}
            &#183;{" "}
            <a href="/" className="mx-1 hover:text-white hover:underline">
              Privacy policy
            </a>{" "}
            &#183;{" "}
            <a href="/" className="mx-1 hover:text-white hover:underline">
              Terms of service
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Footer;
