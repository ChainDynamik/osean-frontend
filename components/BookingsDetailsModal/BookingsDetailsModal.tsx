import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import Modal from "../Modal/Modal";
import Image from "next/image";
import { useMoralis } from "react-moralis";
import Moralis from "moralis-v1";
import Icon from "../icon-selector/icon-selector";

type DetailsComponentProps = {
  children: ReactNode;
  id: string;
};

const BookingsDetailsModal: React.FC<DetailsComponentProps> = ({
  children,
  id,
}) => {
  const [enrollment, setEnrollment] = useState<Moralis.Object>();

  const { Moralis, user, isInitialized } = useMoralis();

  async function fetch() {
    const query = new Moralis.Query("StudentEnrollment");
    query.equalTo("objectId", id);
    const result = await query.first();
    setEnrollment(result);
  }

  useEffect(() => {
    if (isInitialized) {
      fetch();
    }
  }, [isInitialized]);
  return (
    <Modal.Root>
      <Modal.Trigger asChild>{children}</Modal.Trigger>
      <Modal.Content className="flex lg:!w-[60vw] md:!min-w-[60vw] !rounded-3xl h-[85vh] overflow-y-auto justify-center items-center ">
        <Modal.Close>
          <div className="absolute z-[99] top-6 right-6 md:top-6 text-white hover:text-primary bg-secondary p-2 rounded-md md:right-8">
            <Icon iconType="cancel" className="w-5" />
          </div>
        </Modal.Close>
        <div className="relative w-full p-2 overflow-y-auto">
          <div className="w-[100%] rounded-3xl mx-auto overflow-y-auto">
            <div className="w-full text-white bg-blue-600 max-md:pb-1 max-md:pt-10 px-6 py-8 rounded-t-3xl">
              <div className="flex items-center gap-3 md:gap-6 mb-4">
                <Image
                  src="/logo.png"
                  width={120}
                  height={120}
                  alt="grsa blue logo"
                  className="size-[40px] md:size-[60px] lg:size-[8` 0px]"
                />
                <h1 className=" text-xl md:text-2xl lg:text-3xl font-bold">
                  Booking Details
                </h1>
              </div>
            </div>
            <div className="w-full bg-white text-black px-6 py-8 rounded-b-3xl">
              <div className="mb-4 border-b pb-4">
                <p className="mb-2">
                  <strong>Full Name:</strong> {enrollment?.get("fullName")}
                </p>
                <p className="mb-2">
                  <strong>Gender:</strong> {enrollment?.get("gender")}
                </p>
                <p className="mb-2">
                  <strong>Date of Birth:</strong>{" "}
                  {enrollment?.get("dateOfBirth")}
                </p>
                <p className="mb-2">
                  <strong>Email:</strong> {enrollment?.get("email")}
                </p>
                <p className="mb-2">
                  <strong>Contact Number:</strong>{" "}
                  {enrollment?.get("contactNumber")}
                </p>
                <p className="mb-2">
                  <strong>Address:</strong> {enrollment?.get("address")}
                </p>
                <p className="mb-2">
                  <strong>Emergency Contact Name:</strong>{" "}
                  {enrollment?.get("emergencyContactName")}
                </p>
                <p className="mb-2">
                  <strong>Emergency Contact Number:</strong>{" "}
                  {enrollment?.get("emergencyContactNumber")}
                </p>
                <p className="mb-2">
                  <strong>Standard Operating Procedures Read:</strong>{" "}
                  {enrollment?.get("sopRead") ? "Yes" : "No"}
                </p>
                <p className="mb-2">
                  <strong>Health & Safety Read:</strong>{" "}
                  {enrollment?.get("healthSafetyRead") ? "Yes" : "No"}
                </p>
                <p className="mb-2">
                  <strong>Safeguarding Read:</strong>{" "}
                  {enrollment?.get("safeguardingRead") ? "Yes" : "No"}
                </p>
                <p className="mb-2">
                  <strong>Course Start Date:</strong>{" "}
                  {enrollment
                    ?.get("course")
                    ?.get("startDate")
                    ?.toLocaleString()}
                </p>
                <p className="mb-2">
                  <strong>Course End Date:</strong>{" "}
                  {enrollment?.get("course")?.get("endDate")?.toLocaleString()}
                </p>
                <p className="mb-2">
                  <strong>Comments:</strong> {enrollment?.get("comments")}
                </p>
                <p className="mb-2">
                  <strong>Invoice:</strong>{" "}
                  {enrollment?.get("invoiceURL") ? "Click to view" : "No"}
                </p>
                <p className="mb-2">
                  <strong>Paid:</strong>{" "}
                  {enrollment?.get("invoiceURL") ? "Yes" : "No"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Modal.Content>
    </Modal.Root>
  );
};

export default BookingsDetailsModal;
