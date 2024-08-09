import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import Modal from "../Modal/Modal";
import Image from "next/image";
import Icon from "../icon-selector/icon-selector";
import { Offer } from "../BookingsTable/BookingsTable";
import { generateBlockExplorerLink, truncateAddress } from "../../helpers";
import Button from "../Button/Button";
import Link from "next/link";

type QuoteModalProps = {
  children: ReactNode;
  id: string;
  offer: Offer;
  image: string;
  isOpen?: boolean;
  onOpenChange?: Dispatch<SetStateAction<boolean>>;
};

const bookingsInvoice = [
  {
    name: "Booking One",
    url: "link.com",
  },
  {
    name: "Booking Two",
    url: "link.com",
  },
];

const QuoteModal: React.FC<QuoteModalProps> = ({
  children,
  isOpen,
  onOpenChange,
  id,
  offer,
  image,
}) => {
  return (
    <Modal.Root open={isOpen} onOpenChange={onOpenChange}>
      <Modal.Trigger asChild>{children}</Modal.Trigger>
      <Modal.Content className="w-full max-w-[90%] lg:max-w-4xl mx-auto rounded-lg overflow-y-scroll pb-8 shadow-2xl">
        <div className="relative bg-white w-full">Hiii</div>
      </Modal.Content>
    </Modal.Root>
  );
};

export default QuoteModal;
