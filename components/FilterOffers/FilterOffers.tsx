import React, { useState } from "react";

type FilterOffersProps = {
  onFilterChange: (filters: Filters) => void;
};

type Filters = {
  product: string;
  startDate: string;
  endDate: string;
  minPrice: number;
  maxPrice: number;
};

const FilterOffers: React.FC<FilterOffersProps> = ({ onFilterChange }) => {
  const [product, setProduct] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleFilterChange = () => {
    onFilterChange({
      product,
      startDate,
      endDate,
      minPrice: parseFloat(minPrice) || 0,
      maxPrice: parseFloat(maxPrice) || Infinity,
    });
  };

  return (
    <div className="p-4 bg-white rounded shadow-md mb-8">
      <h2 className="text-lg font-bold mb-4">Filter Offers</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Product Type</label>
        <input
          type="text"
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Enter product type"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Start Date</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">End Date</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Min Price</label>
        <input
          type="number"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Enter minimum price"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Max Price</label>
        <input
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Enter maximum price"
        />
      </div>
      <button
        onClick={handleFilterChange}
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default FilterOffers;
