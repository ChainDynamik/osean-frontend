import React from "react";
import Masonry from "react-masonry-css";
import { cn } from "../../util";
// import "./MasonryGrid.css";

interface Image {
  url: string;
  description: string;
}

interface GridLayoutProps {
  images: Image[];
}

const GridLayout: React.FC<GridLayoutProps> = ({ images }) => {
  const mainImage = images?.find((image) => image.description === "Main image");
  const interiorImage = images?.find(
    (image) => image.description === "Interior image"
  );
  const otherImages = images?.filter(
    (image) =>
      image.description !== "Main image" &&
      image.description !== "Interior image"
  );

  const galleryImages = [mainImage, interiorImage, ...otherImages].filter(
    Boolean
  );

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };
  console.log(images, "images for grid");

  return (
    <div>
      <div className="mt-6">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {galleryImages?.map((image, index) => (
            <div key={index} className="w-full">
              <img
                src={image}
                alt={`Yacht Image ${index + 1}`}
                className="w-full h-auto rounded-lg"
              />
            </div>
          ))}
        </Masonry>
      </div>
    </div>
  );
};

export default GridLayout;
