"use client";
import Image from "next/image";
import Section from "../../components/Section/Section";
import { topBoats } from "../../data/top-boats";
import YachtCard from "../../components/YachtCard/YachtCard";
import axios from "axios";
import { useEffect, useState } from "react";
import { BOOKING_MANAGER_API_ROOT } from "../../helpers";
import { BookingManagerYacht } from "../../types/booking-manager/core";
import useYachts from "../../hooks/useYachts";

type Extra = {
  id: number;
  name: string;
  price: number;
  currency: string;
  payableInBase: boolean;
  description: string;
};

type PaymentPlan = {
  date: string;
  amount: number;
};

type Reservation = {
  yachtId: number;
  yacht: string;
  startBaseId: number;
  endBaseId: number;
  startBase: string;
  endBase: string;
  dateFrom: string;
  dateTo: string;
  status: number;
  product: string;
  price: number;
  currency: string;
  startPrice: number;
  obligatoryExtrasPrice: number;
  obligatoryExtras: Extra[];
  paymentPlan: PaymentPlan[];
  securityDeposit: number;
  commissionPercentage: number;
  commissionValue: number;
  discountPercentage: number;
  myReservationId: number;
};

type OfferWithBoat = {
  offer: Reservation;
  boat: BookingManagerYacht | undefined;
};

export default function Offers() {
  const [offers, setOffers] = useState<OfferWithBoat[]>([]);

  const { yachts, fetchChrisBoats, getBoatById } = useYachts();

  async function fetchOffers() {
    const request = await axios.get(
      `${BOOKING_MANAGER_API_ROOT}/offers?dateFrom=2024-08-17T00%3A00%3A00&dateTo=2024-08-24T00%3A00%3A00&companyId=2672&currency=EUR&showOptions=true&passengersOnBoard=1`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_BOOKING_MANAGER_API_KEY}`,
        },
      }
    );

    const offers: Reservation[] = request.data;

    // For all the offers, get the boat element for it

    const offersWithBoats = offers.map((offer) => {
      const boat = getBoatById(offer.yachtId);

      return {
        offer: offer,
        boat: boat,
      };
    });

    setOffers(offersWithBoats);
  }

  console.log(offers);

  useEffect(() => {
    if (yachts) fetchOffers();
  }, [yachts]);

  return (
    <main className="!px-10 mt-[7.5rem]">
      <div className="yacht-page-header relative h-[500px] w-full">
        <div className="absolute right-0 bottom-0">
          <Image
            height={200}
            width={400}
            alt="discount banner"
            src="/discounts.jpg"
          />
        </div>
      </div>

      <Section
        className="group/section container-fluid pt-[2rem] !px-0 mt-4 overflow-hidden lg:mt-16"
        title="Planning your trip..."
        description="Find the perfect boat for your next adventure"
        headerClassName="items-end mb-4 md:mb-5 xl:mb-6 gap-5"
        // rightElement={<SeeMore />}
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:gap-y-10">
          {offers.map((offer, index) => (
            <YachtCard
              key={offer.offer.myReservationId}
              id={"offer_" + offer.offer.myReservationId}
              slides={offer.boat?.images.map((image) => image.url) || []}
              title={offer.boat?.name as string}
              caption={offer.boat?.kind as string}
              slug="slug"
              location={offer.boat?.homeBase as string}
              price={offer.offer.price + "€"}
              boatManufacturingDate={offer.boat?.year.toString() as string}
            />
          ))}
        </div>
      </Section>
    </main>
  );
}
