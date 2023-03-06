import axios from "axios";
import React from "react";
import { toast } from "react-toastify";
import "./TourHandleCard.scss";
const TourHandleCard = ({ item, data, updateFunc, appearCard }) => {
  const deleteCardHandler = async () => {
    const { data } = await axios.delete(
      `/api/v1/admin/delete/tour/${item?._id}`
    );

    if (data?.success) {
      toast.success(data?.message);
      setTimeout(() => {
        window.location.reload();
      }, 4000);
    } else {
      toast.error(data?.message);
    }
  };
  return (
    <div className="tour-card-admin color-change">
      <div className="tour-card-left">
        <div className="tour-image">
          <img src={item?.image?.url} alt="" />
        </div>
        <div className="tour-card-info">
          <p>
            <b>Name : </b>
            {item?.name}
          </p>
          <p>
            <b>Destination : </b>
            {item?.destination}
          </p>
          <p>
            <b>Package Price : </b>
            {item?.packagePrice}
          </p>
          <p>
            <b>Flight Name : </b>
            {item?.flights?.company}
          </p>
          <p>
            <b>Hotel Name : </b>
            {item?.hotelDetails?.name}
          </p>
          <p>
            <b>Events : </b>

            {item?.eventDetails?.map((event) => (
              <>{event.name},</>
            ))}
          </p>
        </div>
      </div>

      <div className="card-btns">
        <div
          className="update-button"
          onClick={() => {
            appearCard();
            updateFunc({ ...data, _id: item._id });
          }}
        >
          Update
        </div>
        <div
          className="delete-button"
          onClick={() => {
            deleteCardHandler();
          }}
        >
          Delete
        </div>
      </div>
    </div>
  );
};

export default TourHandleCard;
