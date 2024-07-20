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
  length: number;
  currency: string;
  imageUrl?: string;
  dateFrom: string; // Added dateFrom
  dateTo: string; // Added dateTo
  cabins: string; // Added dateTo
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
  cabins,
  length,
}) => {
  const calculateDiscountPercentage = (
    startPrice: number,
    price: number
  ): number => {
    return Math.round(((startPrice - price) / startPrice) * 100);
  };

  const discountPercentage = calculateDiscountPercentage(startPrice, price);

  return (
    <Link
      href={`/yacht-details/${id}`}
      className="w-full ring-offset-2 hover:bg-primary/5 ring-primary hover:ring-1 transition-all duration-300 ease-in-out !text-black flex gap-3 flex-col rounded-lg p-4 shadow-card border-[0.5px] border-black"
    >
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
        <div className="relative w-[350px] max-h-[150px] h-[150px] border-[1.5px] rounded-md border-black p-2 aspect-video">
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
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-0.5">
              <div>
                <Icon
                  iconType="location"
                  className="w-4 -translate-y-[1px] text-black"
                />
              </div>
              <p className="mb-0 text-black text-xs">
                <span className="font-bold">Base:</span> Lavrion / Olympic
                Marina, Greece
              </p>
            </div>
            <div className="flex items-center gap-0.5">
              <div>
                <Icon
                  iconType="company"
                  className="w-4 -translate-y-[1px] text-black"
                />
              </div>
              <p className="mb-0 text-black text-xs">
                <span className="font-bold">Company:</span> South Sea Sail
              </p>
            </div>
            {/* <p className="mb-0 text-black text-xs">Company: South Sea Sail</p> */}
          </div>
          {/*  */}
          <div className="grid grid-cols-2 gap-y-1.5 gap-x-4 mt-3">
            <div className="flex gap-1">
              <div>
                <Icon
                  iconType="anchor"
                  className="w-4 -translate-y-[1px] text-black"
                />
              </div>
              <p className="mb-0 text-black text-xs">Catamaran</p>
            </div>
            <div className="flex gap-1">
              <div>
                <Icon
                  iconType="calendar"
                  className="w-4 -translate-y-[1px] text-black"
                />
              </div>
              <p className="mb-0 text-black text-xs">2021</p>
            </div>{" "}
            <div className="flex gap-1">
              <div>
                <Icon
                  iconType="gift"
                  className="w-4 -translate-y-[1px] text-black"
                />
              </div>
              <p className="mb-0 text-black text-xs">Bareboat</p>
            </div>
            <div className="flex gap-1">
              <div>
                <Icon
                  iconType="feet"
                  className="w-4 -translate-y-[1px] text-black"
                />
              </div>
              <p className="mb-0 text-black text-xs">{length} ft</p>
            </div>{" "}
            <div className="flex gap-1">
              <div>
                <Icon
                  iconType="bed"
                  className="w-4 -translate-y-[1px] text-black"
                />
              </div>
              <p className="mb-0 text-black text-xs">
                8 + 2 (convertible salon table)
              </p>
            </div>
            <div className="flex gap-1">
              <div>
                <Icon
                  iconType="door"
                  className="w-4 -translate-y-[1px] text-black"
                />
              </div>
              <p className="mb-0 text-black text-xs">{cabins} cab</p>
            </div>{" "}
            <div className="flex gap-1">
              <div>
                <Icon
                  iconType="shower"
                  className="w-4 -translate-y-[1px] text-black"
                />
              </div>
              <p className="mb-0 text-black text-xs">3</p>
            </div>
            <div className="flex gap-1">
              <div>
                <Icon
                  iconType="location"
                  className="w-4 -translate-y-[1px] text-black"
                />
              </div>
              <p className="mb-0 text-black text-xs">Full Batten</p>
            </div>
            <div className="flex gap-1">
              <div>
                <Icon
                  iconType="cash"
                  className="w-4 -translate-y-[1px] text-black"
                />
              </div>
              <p className="mb-0 text-black text-xs">{currency}</p>
            </div>
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
            <p className="mb-0 text-black text-xs">
              {new Date(dateFrom).toLocaleDateString()}{" "}
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="mb-0">End Date</p>
            <p className="mb-0 text-black text-xs">
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
    </Link>
  );
};

export default OffersCard;
