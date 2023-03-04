import React from "react";
import "./tours.scss";
import { Card } from "./Card";
export const Tours = () => {
  return (
    <div className="content">
      <ul class="cards">
        <li>
          <Card />
        </li>
        <li>
          <Card />
        </li>
        <li>
          <Card />
        </li>
        <li>
          <Card />
        </li>
      </ul>
    </div>
  );
};
