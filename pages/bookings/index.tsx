"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useMoralis } from "react-moralis";
// import Button from "@/components/Button/button";
// import { CardPayment } from "@/components/CardPayment/CardPayment";
import Button from "../../components/Button/Button";
import BookingsTable from "../../components/BookingsTable/BookingsTable";

export default function Profile() {
  const { user } = useMoralis();
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");

  async function fillSaved() {
    setUsername(user?.get("username"));
    setEmail(user?.get("email"));
  }

  async function updatePassword() {
    if (!currentPassword || !newPassword) {
      alert("Please enter both current and new passwords");
      return;
    }

    try {
      user?.set("password", newPassword);
      await user?.save();
      alert("Password updated successfully");
    } catch (error) {
      const errorMessage = (error as Error).message;
      alert("Error updating password: " + errorMessage);
    }
  }

  useEffect(() => {
    if (user) fillSaved();
  }, [user]);

  return (
    <main className="w-full px-4 md:px-8 pt-20 md:pt-10">
      <h1 className="text-2xl md:text-3xl text-text-secondary font-bold mt-16">
        Bookings History
      </h1>
      <BookingsTable />
      <div className="flex max-lg:flex-col justify-center gap-12 mt-12">
        <div className="bg-white flex flex-col gap-4 box-shadow rounded max-md:px-0 p-6 lg:w-1/2">
          <h2 className="text-2xl">Profile Settings</h2>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Full Name
            </label>
            <input
              className="border border-gray-300 p-2 w-full rounded"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              className="border border-gray-300 p-2 w-full rounded"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <Button className="mt-auto text-white">Save Changes</Button>
        </div>

        <div className="bg-white flex flex-col gap-4 box-shadow rounded max-md:px-0 p-6 lg:w-1/2 ">
          <h3 className="text-xl">Update Password</h3>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Current Password
            </label>
            <input
              className="border border-gray-300 p-2 w-full rounded"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              New Password
            </label>
            <input
              className="border border-gray-300 p-2 w-full"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <Button className="mt-auto text-white" onClick={updatePassword}>
            Update Password
          </Button>
        </div>
      </div>
      {/*  */}
      {/* <Suspense fallback={<p>Loading...</p>}>
        <CardPayment className="w-full lg:w-1/2" isMakingPayment={false} />
      </Suspense> */}
    </main>
  );
}
