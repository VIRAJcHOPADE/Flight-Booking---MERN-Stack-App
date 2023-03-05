import React from "react";
import { FlightPageCard } from "./FlightPageCard";
import Flight from "../navbar/Flight";
const FlightPage = () => {
  return (
    <div className="content color-change">
      <Flight />
      <FlightPageCard />
    </div>
  );
};

export default FlightPage;
