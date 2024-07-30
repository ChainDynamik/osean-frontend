// components/SailYourWay/SailYourWay.tsx

"use client";
import Image from "next/image";

const sailOptions = [
  {
    title: "Yacht charter",
    image: "/images/sailYourWay/sailyourway-1.jpg",
  },
  {
    title: "With Crew",
    image: "/images/sailYourWay/sailyourway-2.jpg",
  },
  {
    title: "Sailing course",
    image: "/images/sailYourWay/sailyourway-3.jpg",
  },
];

export default function SailYourWay() {
  return (
    <div className="sail-your-way mb-24 md:mt-1 max-md:mt-3">
      <h3 className="text-primary mb-1.5">Sail your way</h3>
      <p className="max-md:w-[90%] lg:max-w-xl">
        As a couple, with family or friends, select your preferred type of
        charter. If required, ask us for skipper services!
      </p>
      <div className="sail-options max-md:flex-col flex gap-4 mt-4">
        {sailOptions.map((option, index) => (
          <div key={index} className="sail-option">
            <Image
              src={option.image}
              alt={option.title}
              width={300}
              height={200}
              className="rounded-lg h-[170px] w-full object-cover"
            />
            <p className="text-black font-bold mt-2">{option.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
