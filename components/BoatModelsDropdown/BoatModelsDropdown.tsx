import React from "react";
import Select from "react-select";
import { useOfferApiFilterState } from "../../util/store/useOfferApiFilterState";
import { COUNTRIES_DATA } from "../../data/countries-data";
import { bookingManagerBases } from "../../const/booking-manager-bases";
import { boatModels } from "../../const/boat-models";
import { selectCustomStyles } from "../CountriesDropdown/CountriesDropdown";

// Remove items with the same model from boatModels
const deduplicatedBoatModels = boatModels.filter(
  (boatModel, index, self) =>
    index === self.findIndex((t) => t.model === boatModel.model)
);

const modelOptions = deduplicatedBoatModels.map((boatModel) => ({
  value: boatModel.model,
  label: boatModel.model,
  isBase: false,
}));

const BoatModelsDropdown: React.FC = () => {
  const setBoatModels = useOfferApiFilterState((state) => state.setBoatModels);
  const boatModels = useOfferApiFilterState((state) => state.boatModels);

  const handleChange = (selectedOptions: any) => {
    const selectedBoatModels = selectedOptions
      ? selectedOptions.map((option: any) => option.value)
      : [];
    setBoatModels(selectedBoatModels);
  };

  const selectedOptions = modelOptions.filter((option) =>
    boatModels.includes(option.value)
  );

  return (
    <Select
      options={modelOptions}
      value={selectedOptions}
      onChange={handleChange}
      isClearable
      isMulti
      styles={selectCustomStyles}
      isSearchable
      placeholder="What boat are you looking for?"
    />
  );
};

export default BoatModelsDropdown;
