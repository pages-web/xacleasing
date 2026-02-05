import React from "react";

const BackImg = () => {
  return (
    <img
      src="/images/back.jpg"
      alt="Background"
      style={{
        display: "block",
        width: "100%",
        height: "100%",
        objectFit: "cover",
      }}
    />
  );
};

export default BackImg;
