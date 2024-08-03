import { useState } from "react";

export default function PersonalInfoForm() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [telegram, setTelegram] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  return (
    <div className="w-full mb-4 pt-4 pb-7 px-4 box-shadow border border-black rounded-md">
      <h2 className="text-xl font-bold mb-4">Personal Info</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:!ring-indigo-500 focus:!border-indigo-500 transition-all duration-300 sm:text-sm"
          />
        </div>
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700">
            Surname
          </label>
          <input
            type="text"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:!ring-indigo-500 focus:!border-indigo-500 transition-all duration-300 sm:text-sm"
          />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:!ring-indigo-500 focus:!border-indigo-500 transition-all duration-300 sm:text-sm"
          />
        </div>
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:!ring-indigo-500 focus:!border-indigo-500 transition-all duration-300 sm:text-sm"
          />
        </div>
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700">
            Telegram
          </label>
          <input
            type="text"
            value={telegram}
            onChange={(e) => setTelegram(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:!ring-indigo-500 focus:!border-indigo-500 transition-all duration-300 sm:text-sm"
          />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:!ring-indigo-500 focus:!border-indigo-500 transition-all duration-300 sm:text-sm"
          />
        </div>
      </div>
    </div>
  );
}
