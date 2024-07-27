import React, { ReactNode } from "react";
import Modal from "../Modal/Modal";

import Image from "next/image";
import { useMoralis } from "react-moralis";
import Icon from "../icon-selector/icon-selector";
import Button from "../Button/Button";

export default function ConfirmDeleteModal({
  children,
  imageUrl,
  studentEnrollmentId,
  fetchEnrollments,
}: {
  children: ReactNode;
  imageUrl: string;
  studentEnrollmentId: string;
  fetchEnrollments: () => void;
}) {
  const { Moralis } = useMoralis();

  async function deleteInvoice(e: React.MouseEvent) {
    e.preventDefault();

    try {
      await Moralis.Cloud.run("updateEnrollment", {
        enrollId: studentEnrollmentId,
        data: {
          invoiceURL: null,
        },
      });

      fetchEnrollments();
    } catch (error) {
      console.error("Error deleting invoice", error);
    }
  }

  return (
    <Modal.Root>
      <Modal.Trigger>{children}</Modal.Trigger>
      <Modal.Content className="bg-primary md:min-w-[60%] py-8 px-4 rounded-2xl">
        <div className="flex w-full h-full flex-col items-center justify-center gap-10">
          <Modal.Close className=" z-[99] absolute right-4 top-3 text-white hover:text-primary bg-secondary p-2 rounded-md">
            <Icon iconType="cancel" className="w-4" />
          </Modal.Close>

          <h1 className="font-semibold mx-auto text-center w-fit text-xl md:text-3xl text-text-secondary ">
            Are you sure you want to delete invoice?
          </h1>
          <Image src={imageUrl} width={400} height={400} alt="invoice image" />
          <Button
            variant="negative"
            className="px-8 uppercase font-bold text-lg"
            onClick={deleteInvoice}
          >
            DELETE INVOICE
          </Button>
        </div>
      </Modal.Content>
    </Modal.Root>
  );
}
