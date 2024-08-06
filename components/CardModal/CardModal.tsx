"use client";

import React, { ReactNode, useState } from "react";
import Modal from "../Modal/Modal";
import Button from "../Button/Button";
import Image from "next/image";
import BlueCardAnimation from "../../assets/lottie/blue-coin.json";
import dynamic from "next/dynamic";
import { CardPayment } from "../CardPayment/CardPayment";
import Icon from "../icon-selector/icon-selector";

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
        <label className="block text-sm font-medium text-gray-700">
          Email address
        </label>
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
            <label className="block text-sm font-medium text-gray-700">
              Card Details
            </label>
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
  const [paymentMethod, setPaymentMethod] = useState<null | PaymentMethodType>(
    null
  );

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

      <Modal.Content className="max-[500px]:w-[90%] max-[500px]:max-w-[90%] max-md:w-4/5 md:!min-w-[700px] max-w-fit">
        <div className="relative bg-white rounded-md shadow-lg w-full h-full">
          <Modal.Close className="z-[99] absolute right-4 top-3 text-white hover:text-primary bg-secondary p-2 rounded-md">
            <Icon iconType="cancel" className="w-6" />
          </Modal.Close>
          <CardPayment amountEur={amountEur} offer={offer} />
        </div>
      </Modal.Content>
    </Modal.Root>
  );
}
