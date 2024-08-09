"use client";
import { FC, useEffect, useState } from "react";
import BookingsTable from "../components/BookingsTable/BookingsTable";

const AdminPage: FC = () => {
  return (
    <>
      <div className="container-fluid relative !px-5 md:!px-10 pt-20 w-full max-w-[1280px]">
        <BookingsTable isOnAdminPage={true} />
      </div>
    </>
  );
};

export default AdminPage;
