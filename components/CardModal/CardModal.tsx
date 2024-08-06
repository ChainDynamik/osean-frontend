"use client";

import React, { ReactNode, useState } from "react";
import Modal from "../Modal/Modal";
import Button from "../Button/Button";
import Image from "next/image";
import BlueCardAnimation from "../../assets/lottie/blue-coin.json";
import dynamic from "next/dynamic";
import { CardPayment } from "../CardPayment/CardPayment";

// components/PaymentForm.js

const PaymentForm = () => {
  const [email, setEmail] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardDetails, setCardDetails] = useState({
    name: "",
    number: "",
    expiry: "",
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setCardDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  return (
    <div className=" mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Payment Details</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Email address</label>
        <input
          type="email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      {/* <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Select Payment Method
        </label>
        <div className="mt-1 flex">
          <button
            className={`flex-1 px-4 py-2 border rounded-l-md ${
              paymentMethod === "card"
                ? "bg-indigo-500 text-white"
                : "bg-gray-100"
            }`}
            onClick={() => setPaymentMethod("card")}
          >
            Debit / Credit Card
          </button>
          <button
            className={`flex-1 px-4 py-2 border rounded-r-md ${
              paymentMethod === "virtual"
                ? "bg-indigo-500 text-white"
                : "bg-gray-100"
            }`}
            onClick={() => setPaymentMethod("virtual")}
          >
            Virtual account
          </button>
        </div>
      </div> */}
      {paymentMethod === "card" && (
        <>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Card Details</label>
            <input
              type="text"
              name="name"
              placeholder="Name on Card"
              value={cardDetails.name}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="number"
              placeholder="Card Number"
              value={cardDetails.number}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          {/* <div className="mb-4">
            <input
              type="text"
              name="expiry"
              placeholder="MM / YY"
              value={cardDetails.expiry}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div> */}
          <div className="flex gap-4 items-center">
            <div className="mb-4">
              <input
                type="text"
                name="expiry"
                placeholder="MM"
                // value={cardDetails.expiry}
                // onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                name="expiry"
                placeholder="YY"
                // value={cardDetails.expiry}
                // onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                name="expiry"
                placeholder="Pin"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
        </>
      )}
      <div className="flex justify-between mb-4">
        <div>
          <p>Sub Total</p>
          <p>Discount</p>
          <p>Total</p>
        </div>
        <div className="text-right">
          <p>$702.00</p>
          <p>$0.00</p>
          <p>$702.00</p>
        </div>
      </div>
      <Button className="w-full text-white py-2 rounded-md !shadow-none focus:outline-none focus:ring-2 focus:ring-indigo-500">
        Pay $702.00
      </Button>
    </div>
  );
};

export default function CardModal({
  children,
  amountEur,
  offer,
}: {
  children?: ReactNode;
  amountEur: number;
  offer: any;
}) {
  type PaymentMethodType = "card" | "wire";
  //   const { paymentModalIsOpen, setPaymentModalIsOpen } = useAppStore();
  const [paymentMethod, setPaymentMethod] = useState<null | PaymentMethodType>(null);

  const handlePaymentChoice = (choice: PaymentMethodType) => {
    setPaymentMethod(choice);
  };

  return (
    <Modal.Root
    //   open={paymentModalIsOpen}
    //   onOpenChange={() => {
    //     // setPaymentModalIsOpen(!paymentModalIsOpen);
    //     setPaymentMethod(null);
    //   }}
    >
      <Modal.Trigger>{children}</Modal.Trigger>

      <Modal.Content className="max-[500px]:w-[90%] max-[500px]:max-w-none max-md:w-4/5  !min-w-[600px] max-w-fit">
        <div className="relative bg-white pt-4 rounded-md shadow-lg w-full">
          <Modal.Close className="z-[99] absolute right-4 top-3 text-white hover:text-primary bg-secondary p-2 rounded-md">
            {/* <Icon iconType="cancel" className="w-4" /> */}
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 10 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-4"
            >
              <path
                d="M9.63989 8.64556C9.77198 8.77765 9.84619 8.9568 9.84619 9.1436C9.84619 9.33041 9.77198 9.50956 9.63989 9.64165C9.5078 9.77374 9.32865 9.84795 9.14185 9.84795C8.95504 9.84795 8.77589 9.77374 8.6438 9.64165L4.92368 5.92036L1.20239 9.64048C1.0703 9.77257 0.891149 9.84678 0.704345 9.84678C0.517541 9.84678 0.338388 9.77257 0.206298 9.64048C0.0742076 9.50839 1.9683e-09 9.32924 0 9.14243C-1.9683e-09 8.95563 0.0742076 8.77647 0.206298 8.64438L3.92759 4.92427L0.20747 1.20298C0.0753793 1.07089 0.0011719 0.891734 0.0011719 0.704931C0.0011719 0.518127 0.0753793 0.338974 0.20747 0.206884C0.33956 0.0747935 0.518713 0.000585841 0.705517 0.000585839C0.89232 0.000585837 1.07147 0.0747935 1.20356 0.206884L4.92368 3.92817L8.64497 0.206298C8.77706 0.0742074 8.95621 -3.11215e-09 9.14302 0C9.32982 3.11215e-09 9.50898 0.0742074 9.64106 0.206298C9.77316 0.338388 9.84736 0.517541 9.84736 0.704345C9.84736 0.891148 9.77316 1.0703 9.64106 1.20239L5.91978 4.92427L9.63989 8.64556Z"
                fill="currentColor"
              />
            </svg>
          </Modal.Close>
          <CardPayment
            amountEur={amountEur}
            offer={offer}
          />
        </div>
      </Modal.Content>
    </Modal.Root>
  );
}
