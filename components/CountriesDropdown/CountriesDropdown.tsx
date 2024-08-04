import React from "react";
import Select from "react-select";
import { useOfferApiFilterState } from "../../util/store/useOfferApiFilterState";
import { COUNTRIES_DATA } from "../../data/countries-data";
import { bookingManagerBases } from "../../const/booking-manager-bases";
import { selectCustomStyles } from "../KindSelect/KindSelect";

const countryOptions = COUNTRIES_DATA.map((country) => ({
  value: country.shortName,
  label: country.name,
  isBase: false,
}));

const baseOptions = bookingManagerBases.map((base) => ({
  value: base.id,
  label: base.name + " - " + base.city,
  isBase: true,
}));

const allOptions = [...countryOptions, ...baseOptions];

// Sort all options alphabetically
allOptions.sort((a, b) => a.label.localeCompare(b.label));

const CountriesDropdown: React.FC = () => {
  const setCountries = useOfferApiFilterState((state) => state.setCountries);
  const countries = useOfferApiFilterState((state) => state.countries);

  const handleChange = (selectedOptions: any) => {
    const selectedCountries = selectedOptions
      ? selectedOptions.map((option: any) => option.value)
      : [];
    setCountries(selectedCountries);
  };

  const selectedOptions = allOptions.filter((option) =>
    countries.includes(option.value)
  );

  return (
    <Select
      options={allOptions}
      value={selectedOptions}
      onChange={handleChange}
      isClearable
      isMulti
      isSearchable
      placeholder="Where would you like to cruise?"
      styles={selectCustomStyles} // Apply custom styles
    />
  );
};

export default CountriesDropdown;
