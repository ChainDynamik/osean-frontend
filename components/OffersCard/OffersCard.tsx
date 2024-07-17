export type OffersCardProps = {
  product: string;
  yacht: string;
  startBase: string;
  endBase: string;
  price: number;
  startPrice: number;
  currency: string;
  discountPercentage: number;
  imageUrl: string;
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
  discountPercentage,
  imageUrl,
  dateFrom, // Added dateFrom
  dateTo, // Added dateTo
}) => {
  return (
    <div className="w-full flex items-center rounded overflow-hidden shadow-lg">
      <div className="relative max-w-[400px] min-w-[350px] w-[30%] h-full">
        <img
          className="w-full h-full object-cover"
          src={imageUrl}
          alt={yacht}
        />
        <div className="absolute top-0 left-0 bg-red-600 text-white p-1">
          {discountPercentage}% OFF
        </div>
      </div>
      <div className="px-6 py-4 flex flex-col gap-2">
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
        {/* <div className="flex justify-between items-baseline">
          <p>Start Base</p>
          <p>End Base</p>
        </div> */}
        <div className="text-gray-900 text-base mb-2 flex gap-4 items-center">
          {/* <p>{new Date(dateFrom).toLocaleDateString()} - </p> */}
          {/* {new Date(dateTo).toLocaleDateString()} */}
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
        <button className="mt-4 whitespace-nowrap flex-grow bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          View details
        </button>
      </div>
    </div>
  );
};

export default OffersCard;
