import axios from "axios";
import React from "react";
import { toast } from "react-toastify";
import "./UserHandleCard.scss";
const UserHandleCard = ({ item, updateFunc, data, appearCard }) => {
  const deleteCardHandler = async () => {
    const { data } = await axios.delete(
      `/api/v1/admin/delete/user/${item?._id}`
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
    <div className="user-card-admin color-change">
      <div className="user-card-left">
        <div className="user-image">
          <img src={item?.avatar?.url} alt="" />
        </div>
        <div className="user-card-info">
          <p>
            <b>Name : </b>
            {item?.name}
          </p>
          <p>
            <b>UserName : </b>
            {item?.username}
          </p>
          <p>
            <b>Email : </b>
            {item?.email}
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

export default UserHandleCard;
