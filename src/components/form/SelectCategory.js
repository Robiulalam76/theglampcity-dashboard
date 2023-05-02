import React from "react";
import { Select } from "@windmill/react-ui";
import ParentStore from "../category/ParentStore";

const SelectCategory = ({ setFilter }) => {
  return (
    <>
      <Select
        onChange={(e) => setFilter(e.target.value)}
        className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
      >
        <option value="All" defaultValue hidden>
          Store
        </option>
        <ParentStore />
      </Select>
    </>
  );
};

export default SelectCategory;
