"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { BOOKING_MANAGER_API_ROOT } from "../../helpers";
import { BookingManagerYacht } from "../../types/booking-manager/core";
import useYachts from "../../hooks/useYachts";
import OffersCard, {
  OffersCardProps,
} from "../../components/OffersCard/OffersCard";
import OfferFilter from "../../components/OfferFilter/OfferFilter";
import { useOfferFilterState } from "../../util/store";

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

  const startDate = useOfferFilterState((state) => state.startDate);
  const endDate = useOfferFilterState((state) => state.endDate);
  const filterAmount = useOfferFilterState((state) => state.amount);

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

    const offersWithBoats = offers.map((offer) => {
      const boat = getBoatById(offer.yachtId);

      return {
        offer: offer,
        boat: boat,
      };
    });

    setOffers(offersWithBoats);
  }

  useEffect(() => {
    if (yachts) fetchOffers();
  }, [yachts]);

  const mapOfferToProps = (offer: Reservation): OffersCardProps => {
    return {
      id: offer.yachtId,
      product: offer.product,
      yacht: offer.yacht,
      startBase: offer.startBase,
      endBase: offer.endBase,
      price: offer.price,
      startPrice: offer.startPrice,
      currency: offer.currency,
      dateFrom: offer.dateFrom,
      dateTo: offer.dateTo,
    };
  };

  const filteredOffers = offers.filter(({ offer }) => {
    if (!startDate || !endDate) {
      return true;
    }

    const offerStartDate = new Date(offer.dateFrom).getTime();
    const offerEndDate = new Date(offer.dateTo).getTime();
    const filterStartDate = startDate.getTime();
    const filterEndDate = endDate.getTime();

    const dateMatch =
      offerStartDate <= filterStartDate &&
      offerEndDate >= filterEndDate &&
      filterEndDate >= offerStartDate;

    // const amountMatch = offer.price >= filterAmount;

    return dateMatch;
  });

  return (
    <main className="!px-10 mt-[7.5rem]">
      <div className="flex gap-8">
        <div className="w-[30%] min-w-[30%]">
          <OfferFilter />
        </div>
        <div className="flex w-full justify-center items-center flex-col gap-8">
          {filteredOffers.length === 0 && (
            <p className="text-2xl text-black w-full text-center mx-auto">
              No Filter results
            </p>
          )}
          {filteredOffers.length !== 0 &&
            filteredOffers.map((data, index) => {
              const offerObject = mapOfferToProps(data.offer);

              const image = data?.boat?.images[0]?.url;

              return (
                <OffersCard
                  key={index}
                  {...offerObject}
                  imageUrl={image || ""}
                />
              );
            })}
        </div>
      </div>
    </main>
  );
}
