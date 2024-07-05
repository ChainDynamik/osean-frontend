// import { vendorData } from "public/data/listing-details";
// import RelatedListingBlock from "@/components/listing-details/related-listings/related-listings-block";
// import ListingDetails from "@/components/listing-details/listing-details-block";
// import SubscriptionBlock from "@/components/subscription/subscription-block";

import { vendorData } from "../../data/listing-details";
import GallaryBlock from "../../components/GallaryBlock/GallaryBlock";
import SubscriptionBlock from "../../components/SubscriptionBlock/SubscriptionBlock";
import RelatedListingBlock from "../../components/RelatedListingBlock/RelatedListingBlock";
import ListingDetails from "../../components/ListingDetails/ListindDetails";
// import ListingDetails from "../../components/ListingDetails/ListindDetails";

export default function ListingDetailsPage() {
  // const { slug } = params;

  return (
    <>
      <div className="container-fluid relative !px-10 pt-20 w-full">
        <GallaryBlock images={vendorData.gallary} />
        <ListingDetails />
        <RelatedListingBlock />
      </div>
      <SubscriptionBlock sectionClassName="3xl:!px-12 4xl:!px-12" />
    </>
  );
}
