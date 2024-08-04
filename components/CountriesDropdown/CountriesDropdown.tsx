import React from "react";
import Select from "react-select";
import { useOfferApiFilterState } from "../../util/store/useOfferApiFilterState";
import { COUNTRIES_DATA } from "../../data/countries-data";
import { bookingManagerBases } from "../../const/booking-manager-bases";

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

export const selectCustomStyles = {
  menu: (provided: any) => ({
    ...provided,
    cursor: "pointer",
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    cursor: "pointer",
  }),
  control: (provided: any) => ({
    ...provided,
    outline: "none", // Disable default blue outline
    boxShadow: "none", // Remove any box-shadow that might be applied on focus
    "&:focus-within": {
      outline: "none",
      boxShadow: "none",
    },
  }),
  multiValue: (provided: any) => ({
    ...provided,
    display: "flex",
    alignItems: "center",
    gap: "0.25rem",
    padding: "0.1rem",
  }),
  multiValueLabel: (provided: any) => ({
    ...provided,
    padding: "0.1rem",
    fontSize: "0.9rem",
  }),
  multiValueRemove: (provided: any) => ({
    ...provided,
    cursor: "pointer",
  }),
  input: (provided: any) => ({
    ...provided,
    outline: "none", // Remove outline for the input inside react-select
    boxShadow: "none", // Remove box-shadow for the input inside react-select
    "&:focus": {
      outline: "none",
      boxShadow: "none",
    },
    "&:focus-visible": {
      outline: "none",
      boxShadow: "none",
    },
  }),
};

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
