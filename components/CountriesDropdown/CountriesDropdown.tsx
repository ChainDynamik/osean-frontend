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
  const countries = useOfferApiFilterState((state) => state.countries);

  const handleChange = (selectedOptions: any) => {
    const selectedCountries = selectedOptions
      ? selectedOptions.map((option: any) => option.value)
      : [];
    setCountries(selectedCountries);
  };

  const selectedOptions = countryOptions.filter((option) =>
    countries.includes(option.value)
  );

  return (
    <Select
      options={countryOptions}
      value={selectedOptions}
      onChange={handleChange}
      isClearable
      isMulti
      isSearchable
      placeholder="Where would you like to cruise?"
    />
  );
};

export default CountriesDropdown;
