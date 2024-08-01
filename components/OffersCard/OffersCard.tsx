import { useEffect, useState } from "react";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Icon from "../icon-selector/icon-selector";
import Button from "../Button/Button";
import PreviewImage from "../PreviewImage/PreviewImage";
import { useMoralis } from "react-moralis";
import { fetchBoatDataFromDb } from "../../helpers";

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
  company: string;
  model: string;
  name: string;
  loading?: boolean;
};

const OffersCard: React.FC<OffersCardProps> = ({
  yacht,
  startBase,
  price,
  startPrice,
  currency,
  id,
  loading,
}) => {
  const { Moralis, isInitialized } = useMoralis();
  const [boatData, setBoatData] = useState<any>(null);
  const [loadingBoatData, setLoadingBoatData] = useState(true);

  const mainImage = boatData?.images.find(
    (image) => image.description === "Main image"
  );

  const imageUrl = mainImage
    ? mainImage.url
    : boatData?.images[0]?.url || "/images/placeholder-yacht.jpg";

  useEffect(() => {
    async function fetchData() {
      if (isInitialized) {
        const data = await fetchBoatDataFromDb(id.toString());
        console.log(data, "individual my");

        setBoatData(data);
        setLoadingBoatData(false);
      }
    }

    fetchData();
  }, [id, isInitialized, Moralis]);

  const calculateDiscountPercentage = (
    startPrice: number,
    price: number
  ): number => {
    return Math.round(((startPrice - price) / startPrice) * 100);
  };

  const discountPercentage = calculateDiscountPercentage(startPrice, price);
  console.log(boatData, "my boat");

  return (
    <div className="w-full max-md:mb-6 ring-primary !text-black flex gap-3 flex-col rounded-lg shadow-card border-[0.5px] border-black">
      <div className="flex md:gap-4 max-md:flex-col">
        <div className="relative md:min-h-full max-md:h-[160px] max-h-[200px] lg:w-[350px] lg:h-full border-[1.5px] rounded-l-lg overflow-hidden aspect-video">
          {loading || loadingBoatData ? (
            <Skeleton height="100%" />
          ) : (
            <PreviewImage src={imageUrl || boatData?.imageUrl}>
              <img
                className="w-full h-full object-cover aspect-video"
                src={imageUrl || boatData?.imageUrl}
                alt={yacht}
              />
            </PreviewImage>
          )}
          {!loading && !loadingBoatData && discountPercentage > 0 && (
            <span className="bg-negative px-2 rounded-lg inline-block left-2 text-white font-extrabold absolute top-2">
              -{discountPercentage}%
            </span>
          )}
        </div>
        <div className="w-full py-3 pr-4 max-md:pl-4">
          <p className="text-lg text-primary mb-[0.7rem]">
            {loading || loadingBoatData ? (
              <Skeleton width={100} />
            ) : (
              `${boatData?.model} (${boatData?.year})`
            )}
          </p>
          <div className="flex justify-between max-md:flex-col gap-4 max-[1200px]:flex-col">
            <div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-0.5">
                  <Icon
                    iconType="location"
                    className="w-4 -translate-y-[1px] text-black"
                  />
                  <p className="mb-0 text-black text-xs">
                    {loading || loadingBoatData ? (
                      <Skeleton width={100} />
                    ) : (
                      <>
                        <span className="font-bold">Base:</span> {startBase}
                      </>
                    )}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 ml-1 mt-2">
                <div className="flex gap-1 items-center">
                  <span className="bg-black/70 rounded-full size-1.5"></span>
                  <p className="mb-0 text-black text-xs">
                    {loading || loadingBoatData ? (
                      <Skeleton width={30} />
                    ) : (
                      `${boatData?.cabins} cab`
                    )}
                  </p>
                </div>
                <div className="flex gap-1 items-center">
                  <span className="bg-black/70 rounded-full size-1.5"></span>
                  <p className="mb-0 text-black text-xs">
                    {loading || loadingBoatData ? (
                      <Skeleton width={30} />
                    ) : (
                      "3 baths"
                    )}
                  </p>
                </div>
                <div className="flex gap-1 items-center">
                  {boatData?.maxPeopleOnBoard && (
                    <span className="bg-black/70 rounded-full size-1.5"></span>
                  )}
                  <p className="mb-0 text-black text-xs">
                    {loading || (loadingBoatData && <Skeleton width={30} />)}
                    {boatData?.maxPeopleOnBoard &&
                      `${boatData?.maxPeopleOnBoard} people`}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 justify-between mt-3 h-fit max-mdflex max-mdflex-col max-[1250px]:grid max-[1250px]:grid-cols-2 max-[1250px]:gap-2">
                <div className="flex gap-1 items-center">
                  <Icon
                    iconType="anchor"
                    className="w-4 -translate-y-[1px] text-black"
                  />
                  <p className="mb-0 text-black text-xs">
                    {loading || loadingBoatData ? (
                      <Skeleton width={50} />
                    ) : (
                      <span>{boatData?.kind}</span>
                    )}
                  </p>
                </div>
                <div className="flex gap-1 items-center">
                  <div>
                    <Icon
                      iconType="gift"
                      className="w-4 -translate-y-[1px] text-black"
                    />
                  </div>
                  <p className="mb-0 capitalize text-black text-xs">
                    {loading || loadingBoatData ? (
                      <Skeleton width={100} />
                    ) : (
                      boatData?.products?.map((product, index) => (
                        <span key={index}>
                          {product.name}
                          {index < boatData?.products?.length - 1 && ","}
                        </span>
                      ))
                    )}
                  </p>
                </div>
                <div className="flex gap-1 items-center">
                  <Icon
                    iconType="feet"
                    className="w-4 -translate-y-[1px] text-black"
                  />
                  <p className="mb-0 text-black text-xs">
                    {loading || loadingBoatData ? (
                      <Skeleton width={50} />
                    ) : (
                      <span>{boatData?.boatLength}m</span>
                    )}
                  </p>
                </div>
                <div className="flex gap-1 items-center">
                  <Icon
                    iconType="calendar"
                    className="w-4 -translate-y-[1px] text-black"
                  />
                  <p className="mb-0 text-black text-xs">
                    {loading || loadingBoatData ? (
                      <Skeleton width={50} />
                    ) : (
                      <span>{boatData?.year}</span>
                    )}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              {startPrice && startPrice !== price && (
                <>
                  <p className="text-xs text-black mb-0 line-through">
                    Original price -{" "}
                    <span className="text-green-500">
                      {loading || loadingBoatData ? (
                        <Skeleton width={50} />
                      ) : (
                        startPrice.toLocaleString()
                      )}
                      {currency === "EUR" ? "€" : currency === "USD" ? "$" : ""}
                    </span>
                  </p>

                  <p className="mb-0 text-sm text-black ">
                    Discount -{" "}
                    <span className="text-green-500">
                      {loading || loadingBoatData ? (
                        <Skeleton width={50} />
                      ) : (
                        discountPercentage
                      )}
                      %
                    </span>
                  </p>
                </>
              )}
              <p className=" mb-0 text-sm text-black ">
                Price -{" "}
                <span className="text-green-500">
                  {loading || loadingBoatData ? (
                    <Skeleton width={50} />
                  ) : (
                    price.toLocaleString()
                  )}
                  {currency === "EUR" ? "€" : currency === "USD" ? "$" : ""}
                </span>
              </p>
              <Link className="mt-2" href={`/yacht-details/${id}`}>
                <Button
                  variant="outline"
                  className="p-2.5 text-sm whitespace-nowrap"
                >
                  {loading || loadingBoatData ? (
                    <Skeleton width={100} />
                  ) : (
                    "View Details"
                  )}
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
