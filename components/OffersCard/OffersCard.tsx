import Link from "next/link";
import Icon from "../icon-selector/icon-selector";

export type OffersCardProps = {
  product: string;
  yacht: string;
  id: number;
  startBase: string;
  endBase: string;
  price: number;
  startPrice: number;
  currency: string;
  imageUrl?: string;
  dateFrom: string; // Added dateFrom
  dateTo: string; // Added dateTo
};

const OffersCard: React.FC<OffersCardProps> = ({
  product,
  yacht,
  startBase,
  endBase,
  price,
  startPrice,
  currency,
  imageUrl,
  dateFrom, // Added dateFrom
  dateTo, // Added dateTo
  id,
}) => {
  const calculateDiscountPercentage = (
    startPrice: number,
    price: number
  ): number => {
    return Math.round(((startPrice - price) / startPrice) * 100);
  };

  const discountPercentage = calculateDiscountPercentage(startPrice, price);

  return (
    <div className="w-full !text-black flex gap-3 flex-col rounded-lg p-4 shadow-card border border-black">
      <div className="w-full flex max-xl:flex-col">
        <p className="text-lg mb-0 text-red-500 ">
          {yacht} <span className="ml-2">({dateFrom} -</span>
          <span>{dateTo})</span>
        </p>
        {/*  */}
        <span className="inline-block mx-2 max-xl:hidden">|</span>

        <p className="text-lg mb-0 text-green-600">NEW Owner Version 3 cabin</p>
      </div>
      {/*  */}
      <div className="flex gap-4">
        <div className="relative w-[350px] border-[1.5px] rounded-md border-black p-2 h-auto aspect-video">
          <img
            className="w-full h-full object-cover aspect-video"
            src={imageUrl}
            alt={yacht}
          />
          {/* <div className="absolute top-0 left-0 bg-red-600 text-white p-1">
          {discountPercentage}% OFF
        </div> */}
        </div>
        <div className="w-full">
          <div className="flex flex-col gap-0.5">
            <div className="flex">
              {/* <Icon iconType="location" className="w-4 text-black" /> */}
              <p className="mb-0 text-black">
                Base: Lavrion / Olympic Marina, Greece
              </p>
            </div>
            <p className="mb-0 text-black">Company: South Sea Sail</p>
          </div>
        </div>
      </div>
      {/* <div className="px-6 py-4 flex flex-col gap-2">
        <div className="font-bold text-xl mb-2 flex justify-between items-center">
          {yacht}
        </div>
        <div>
          <p className="text-gray-900 text-base mb-2">Product: {product}</p>
          <div className="flex justify-between items-baseline">
            <p className="mb-0">Start Base</p>
            <p className="mb-0">End Base</p>
          </div>
          <p className="text-gray-900 text-base mb-2">
            {startBase} {endBase}
          </p>
        </div>

        <div className="text-gray-900 text-base mb-2 flex gap-4 items-center">
          <div className="flex flex-col gap-1">
            <p className="mb-0">Start Date</p>
            <p className="mb-0 text-black">
              {new Date(dateFrom).toLocaleDateString()}{" "}
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="mb-0">End Date</p>
            <p className="mb-0 text-black">
              {new Date(dateTo).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="flex justify-between items-start">
          <div className="flex flex-col">
            <p className="text-gray-900 text-base mb-2">
              <span className="line-through">
                {startPrice} {currency}
              </span>{" "}
              <span className="font-bold text-xl">
                {price} {currency}
              </span>
            </p>
          </div>
        </div>
        <Link href={`/yacht-details/${id}`}>
          <button className="mt-4 whitespace-nowrap flex-grow bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            View details
          </button>
        </Link>
      </div> */}
    </div>
  );
};

export default OffersCard;
