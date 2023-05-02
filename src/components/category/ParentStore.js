import React from "react";

import useAsync from "../../hooks/useAsync";
import StoreServices from "../../services/StoreServices";

const ParentStore = () => {
  const { data } = useAsync(StoreServices.getAllStore); //   console.log(value);
  return (
    <>
      {data.map((parent) => (
        <option key={parent._id} value={parent.parent}>
          {parent.name}
        </option>
      ))}
    </>
  );
};

export default ParentStore;
