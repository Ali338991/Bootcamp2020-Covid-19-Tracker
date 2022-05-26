import React from "react";
import { MagicSpinner } from "react-spinners-kit";
export default function Loader() {
  return (
    <div
      style={{
        width: "100%",
        justifyContent: "center",
        display: "flex",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <MagicSpinner color="#0D4cb5" height={100} width={100} />
    </div>
  );
}
