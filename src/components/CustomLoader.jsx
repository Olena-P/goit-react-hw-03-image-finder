import React from "react";
import { Audio } from "react-loader-spinner";

const CustomLoader = () => {
  return (
    <Audio
      height="80"
      width="80"
      radius="9"
      color="green"
      ariaLabel="loading"
    />
  );
};

export default CustomLoader;
