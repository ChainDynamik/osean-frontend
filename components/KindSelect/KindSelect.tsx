import React from "react";
import Select from "react-select";
import { useOfferApiFilterState } from "../../util/store/useOfferApiFilterState";
import { kindOptions } from "../OfferApiFilter/OfferApiFilter";

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

const KindSelect = () => {
  // Global state for kind filters
  const kindFilters = useOfferApiFilterState((state) => state.kindFilters);
  const setKindFilters = useOfferApiFilterState(
    (state) => state.setKindFilters
  );

  // Handle change
  const handleKindChange = (selectedOptions: any) => {
    const selectedKinds = selectedOptions
      ? selectedOptions.map((option: any) => option.value)
      : [];
    setKindFilters(selectedKinds);
  };

  // Convert the global state to the Select component's expected value format
  const selectedOptions = kindOptions.filter((option) =>
    kindFilters.includes(option.value)
  );

  return (
    <Select
      options={kindOptions}
      value={selectedOptions} // Sync value with global state
      onChange={handleKindChange} // Update global state on change
      styles={selectCustomStyles}
      isClearable
      isMulti
      isSearchable
      placeholder="Type Of Boat"
    />
  );
};

export default KindSelect;
