import React from "react";
import Select from "react-select";
import { useOfferApiFilterState } from "../../util/store/useOfferApiFilterState";
import { COUNTRIES_DATA } from "../../data/countries-data";

const countryOptions = COUNTRIES_DATA.map((country) => ({
  value: country.shortName,
  label: country.name,
}));

const CountriesDropdown: React.FC = () => {
  const setCountries = useOfferApiFilterState((state) => state.setCountries);

  const handleChange = (selectedOptions: any) => {
    const selectedCountries = selectedOptions
      ? selectedOptions.map((option: any) => option.value)
      : [];
    setCountries(selectedCountries);
  };

  return (
    <Select
      options={countryOptions}
      onChange={handleChange}
      isClearable
      isMulti
      isSearchable
      placeholder="Select countries"
    />
  );
};

export default CountriesDropdown;
