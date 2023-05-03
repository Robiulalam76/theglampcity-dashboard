import React from "react";

import useAsync from "../../hooks/useAsync";
import CategoryServices from "../../services/CategoryServices";

const ParentCategory = ({ selectedCategory }) => {
  const { data } = useAsync(CategoryServices.getAllCategory); //   console.log(value);
  return (
    <>
      {data.map((parent) => (
        <option key={parent._id} value={selectedCategory ? selectedCategory?.parent : parent?._id}>
          {parent.parent}
        </option>
      ))}
    </>
  );
};

export default ParentCategory;
