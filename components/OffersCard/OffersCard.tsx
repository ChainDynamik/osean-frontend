import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Icon from "../icon-selector/icon-selector";
import { format } from "date-fns";
import Button from "../Button/Button";
import PreviewImage from "../PreviewImage/PreviewImage";

export type OffersCardProps = {
  yacht: string;
  id: number;
  startBase: string;
  endBase: string;
  price: number;
  startPrice: number;
  length: number;
  currency: string;
  people: string;
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
  people,
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
    <div className="w-full max-md:mb-6 ring-primary !text-black flex gap-3 flex-col rounded-lg  shadow-card border-[0.5px] border-black">
      {/* <div className="w-full flex max-xl:flex-col">
        <p className="text-lg mb-0 text-red-500 ">
          <span className="ml-2">
            {loading ? (
              <Skeleton width={50} />
            ) : (
              `(${formatDateTime(dateFrom)} - `
            )}
          </span>
          <span>
            {loading ? <Skeleton width={50} /> : formatDateTime(dateTo)})
          </span>
        </p>
      </div> */}
      <div className="flex md:gap-4  max-md:flex-col">
        <div className="relative md:min-h-full max-md:h-[160px] max-h-[200px] lg:w-[350px] lg:h-full border-[1.5px] rounded-l-lg overflow-hidden aspect-video">
          {loading ? (
            <Skeleton height={180} />
          ) : (
            <PreviewImage src={imageUrl}>
              <img
                className="w-full h-full object-cover aspect-video"
                src={imageUrl}
                alt={yacht}
              />
            </PreviewImage>
          )}
          <span className="bg-negative px-2 rounded-lg inline-block left-2 text-white font-extrabold absolute top-2">
            -{discountPercentage}%
          </span>
        </div>
        <div className="w-full py-3 pr-4 max-md:pl-4">
          <p className="text-lg text-primary mb-[0.7rem]">
            {model} ({year})
          </p>
          <div className="flex justify-between max-md:flex-col">
            <div>
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
              </div>
              {/* here */}
              <div className="flex items-center gap-2 ml-1 mt-2 motion-safe:">
                <div className="flex gap-1 items-center">
                  <span className="bg-black/70 rounded-full size-1.5"></span>
                  <p className="mb-0 text-black text-xs">
                    {loading ? <Skeleton width={30} /> : `${cabins} cab`}
                  </p>
                </div>
                <div className="flex gap-1 items-center">
                  <span className="bg-black/70 rounded-full size-1.5"></span>

                  <p className="mb-0 text-black text-xs">
                    {loading ? <Skeleton width={30} /> : "3 baths"}
                  </p>
                </div>
                {/*  */}
                <div className="flex gap-1 items-center">
                  <span className="bg-black/70 rounded-full size-1.5"></span>

                  <p className="mb-0 text-black text-xs">
                    {loading ? (
                      <Skeleton width={30} />
                    ) : (
                      <span>{people} people</span>
                    )}
                  </p>
                </div>
              </div>
              {/*  */}
              <div className="flex gap-4 justify-between">
                <div className="grid grid-cols-2 gap-y-3 gap-x-4 mt-3 h-fit max-mdflex max-mdflex-col">
                  <div className="flex gap-1 items-center">
                    <Icon
                      iconType="anchor"
                      className="w-4 -translate-y-[1px] text-black"
                    />

                    <p className="mb-0 text-black text-xs">
                      {loading ? <Skeleton width={50} /> : <span>{kind}</span>}
                    </p>
                  </div>
                  {/*  */}

                  {/*  */}
                  <div className="flex gap-1 items-center">
                    <Icon
                      iconType="gift"
                      className="w-4 -translate-y-[1px] text-black"
                    />

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
                  <div className="flex gap-1 items-center">
                    <Icon
                      iconType="feet"
                      className="w-4 -translate-y-[1px] text-black"
                    />

                    <p className="mb-0 text-black text-xs">
                      {loading ? (
                        <Skeleton width={50} />
                      ) : (
                        <span>{length}m</span>
                      )}
                    </p>
                  </div>

                  <div className="flex gap-1 items-center">
                    <Icon
                      iconType="calendar"
                      className="w-4 -translate-y-[1px] text-black"
                    />

                    <p className="mb-0 text-black text-xs">
                      {loading ? <Skeleton width={50} /> : <span>{year}</span>}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/*  */}
            <div className="flex flex-col max-md:mt-4">
              <p className="text-xs text-black mb-0 line-through">
                Original price -{" "}
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
              <Link className="mt-2" href={`/yacht-details/${id}`}>
                <Button variant="outline" className="p-2.5 text-sm">
                  View Details
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OffersCard;
