import React from "react";
import "./TourCard.scss";
//  {
//   name: "Goa Tour",
//   image : {
// public_id : "1234",
// url : "tempPic"
// }
//   destination: "Goa",
//   packagePrice: 12000,
//   flights: {
//     company: "AirAsia",
//     from: "Pune",
//     to: "Mumbai",
//     departure: "12/03/2022",
//     landing: "12/03/2022",
//     departureTime: "12:00 AM",
//     landingTime: "04:00 AM",
//     ticketPrice: 1200,
//   },
//   hotelDetails: {
//     name: "5 Star Hotel",
//     destination: "Goa",
//     roomPrice: 1200,
//   },
//   eventDetails:
// [
// {
//     name: "Zumba",
//     destination: "Goa",
//     eventPrice: 1200,
//   },
// ];
// },
const TourCard = ({ item }) => {
  return (
    <div className="tour-card color-change">
      <img src={item?.image?.url} alt="" />
      <div>
        <p>
          <b>Package Name </b>
          {item?.name}
        </p>
        <p>
          <b>Desitnation </b>
          {item?.destination}
        </p>
        <p>
          <b>Tour Price </b>
          {item?.packagePrice}
        </p>
        <p>
          <b>Flight </b>
          {item?.flights?.company}
        </p>
        <p>
          <b>Hotel </b>
          {item?.hotelDetails?.name}
        </p>
        <p>
          <b>Events </b>
          <span className="events-map">
            {item?.eventDetails?.map((event) => event?.name + " , ")}
          </span>
        </p>
      </div>
    </div>
  );
};

export default TourCard;
