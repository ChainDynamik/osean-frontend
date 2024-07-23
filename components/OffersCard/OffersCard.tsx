import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Icon from "../icon-selector/icon-selector";
import { format } from "date-fns";

export type OffersCardProps = {
  yacht: string;
  id: number;
  startBase: string;
  endBase: string;
  price: number;
  startPrice: number;
  length: number;
  currency: string;
  imageUrl?: string;
  dateFrom: string;
  dateTo: string;
  cabins: string;
  berths: string;
  year: string;
  products: string[];
  kind: string;
  company: string;
  model: string;
  name: string;
  loading?: boolean;
};

const OffersCard: React.FC<OffersCardProps> = ({
  yacht,
  startBase,
  endBase,
  price,
  startPrice,
  model,
  name,
  currency,
  imageUrl,
  dateFrom,
  dateTo,
  id,
  cabins,
  length,
  berths,
  year,
  products,
  kind,
  company,
  loading,
}) => {
  const calculateDiscountPercentage = (
    startPrice: number,
    price: number
  ): number => {
    return Math.round(((startPrice - price) / startPrice) * 100);
  };

  const discountPercentage = calculateDiscountPercentage(startPrice, price);

  const formatDateTime = (dateTime: string) => {
    return format(new Date(dateTime), "yyyy-MM-dd h:mm a");
  };

  return (
    <Link
      href={`/yacht-details/${id}`}
      className="w-full ring-offset-2 hover:bg-primary/15 ring-primary hover:ring-1 transition-all duration-300 ease-in-out !text-black flex gap-3 flex-col rounded-lg p-4 shadow-card border-[0.5px] border-black"
    >
      <div className="w-full flex max-xl:flex-col">
        <p className="text-lg mb-0 text-red-500 ">
          <span className="ml-2">
            {loading ? (
              <Skeleton width={50} />
            ) : (
              `(${formatDateTime(dateFrom)} -`
            )}
          </span>
          <span>
            {loading ? <Skeleton width={50} /> : formatDateTime(dateTo)})
          </span>
        </p>
      </div>
      <div className="flex gap-4">
        <div className="relative w-[350px] max-h-[150px] h-[150px] border-[1.5px] rounded-md border-black p-2 aspect-video">
          {loading ? (
            <Skeleton height={125} />
          ) : (
            <img
              className="w-full h-full object-cover aspect-video"
              src={imageUrl}
              alt={yacht}
            />
          )}
        </div>
        <div className="w-full">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-0.5">
              <div>
                <Icon
                  iconType="location"
                  className="w-4 -translate-y-[1px] text-black"
                />
              </div>
              <p className="mb-0 text-black text-xs">
                {loading ? (
                  <Skeleton width={100} />
                ) : (
                  <>
                    <span className="font-bold">Base:</span> {startBase}
                  </>
                )}
              </p>
            </div>
            {/*  */}
            <div className="flex items-center gap-0.5">
              <div>
                <Icon
                  iconType="boat"
                  className="w-4 -translate-y-[1px] text-black"
                />
              </div>
              <p className="mb-0 text-black text-xs">
                {loading ? (
                  <Skeleton width={100} />
                ) : (
                  <>
                    <span className="font-bold">Name:</span> {name}
                  </>
                )}
              </p>
            </div>
            {/*  */}
            <div className="flex items-center gap-0.5">
              <div>
                <Icon
                  iconType="settings"
                  className="w-4 -translate-y-[1px] text-black"
                />
              </div>
              <p className="mb-0 text-black text-xs">
                {loading ? (
                  <Skeleton width={100} />
                ) : (
                  <>
                    <span className="font-bold">Model:</span> {model}
                  </>
                )}
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="grid grid-cols-2 gap-y-1.5 gap-x-4 mt-3">
              <div className="flex gap-1">
                <div>
                  <Icon
                    iconType="anchor"
                    className="w-4 -translate-y-[1px] text-black"
                  />
                </div>
                <p className="mb-0 text-black text-xs">
                  {loading ? <Skeleton width={50} /> : kind}
                </p>
              </div>
              <div className="flex gap-1">
                <div>
                  <Icon
                    iconType="calendar"
                    className="w-4 -translate-y-[1px] text-black"
                  />
                </div>
                <p className="mb-0 text-black text-xs">
                  {loading ? <Skeleton width={50} /> : year}
                </p>
              </div>
              <div className="flex gap-1">
                <div>
                  <Icon
                    iconType="gift"
                    className="w-4 -translate-y-[1px] text-black"
                  />
                </div>
                {loading ? (
                  <Skeleton width={100} />
                ) : (
                  products?.map((product, index) => (
                    <p
                      key={index}
                      className="mb-0 capitalize text-black text-xs"
                    >
                      {product}
                      {index < products.length - 1 && ","}
                    </p>
                  ))
                )}
              </div>
              <div className="flex gap-1">
                <div>
                  <Icon
                    iconType="feet"
                    className="w-4 -translate-y-[1px] text-black"
                  />
                </div>
                <p className="mb-0 text-black text-xs">
                  {loading ? <Skeleton width={30} /> : `${length}m`}
                </p>
              </div>
              <div className="flex gap-1">
                <div>
                  <Icon
                    iconType="door"
                    className="w-4 -translate-y-[1px] text-black"
                  />
                </div>
                <p className="mb-0 text-black text-xs">
                  {loading ? <Skeleton width={30} /> : `${cabins} cab`}
                </p>
              </div>
              <div className="flex gap-1">
                <div>
                  <Icon
                    iconType="shower"
                    className="w-4 -translate-y-[1px] text-black"
                  />
                </div>
                <p className="mb-0 text-black text-xs">
                  {loading ? <Skeleton width={30} /> : "3"}
                </p>
              </div>
              <div className="flex gap-1">
                <div>
                  <Icon
                    iconType="berth"
                    className="w-4 -translate-y-[1px] text-black"
                  />
                </div>
                <p className="mb-0 text-black text-xs">
                  {loading ? <Skeleton width={30} /> : berths}
                </p>
              </div>
            </div>
            <div className="flex flex-col mt-3">
              <p className="text-xs text-black mb-0 line-through">
                Price -{" "}
                <span className="text-green-500">
                  {startPrice}
                  {currency === "EUR" ? "€" : currency === "USD" ? "$" : ""}
                </span>
              </p>
              <p className="mb-0 text-sm text-black ">
                Discount -{" "}
                <span className="text-green-500 ">{discountPercentage}%</span>
              </p>
              <p className=" mb-0 text-sm text-black ">
                Price -{" "}
                <span className="text-green-500">
                  {price}
                  {currency === "EUR" ? "€" : currency === "USD" ? "$" : ""}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default OffersCard;
