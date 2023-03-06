import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import "./UserHandleCard.scss";

const UserHandleCard = ({ item, updateFunc, data, appearCard }) => {
  const [updatedRole, setUpdatedRole] = useState(item?.role);
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

  const changeRole = async () => {
    const config = { headers: { "Content-Type": "application/json" } };
    const updateData = {
      id: item._id,
      role: updatedRole,
    };

    if (updatedRole == "") {
      return;
    }
    if (updatedRole == item?.role) {
      toast.error(`User's Role is already ${item?.role}`);
      return;
    }
    await axios.put("/api/v1/admin/update/role", updateData, config);

    toast.success("User Role Updated Successfully !!");

    setTimeout(() => {
      window.location.reload();
    }, 4000);
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
          <p>
            <b>Role : </b>
            {item?.role}
          </p>
        </div>
      </div>

      <div className="card-btns">
        <div
          className="update-button"
          onClick={() => {
            appearCard();
            updateFunc({ name: item?.name, email: item?.email, _id: item._id });
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
        <select
          name="role"
          id=""
          onChange={(e) => {
            setUpdatedRole(e.target.value);
            changeRole();
          }}
        >
          <option hidden> Change User Role</option>
          <option value="user">User</option>

          <option value="admin">Admin</option>
        </select>
      </div>
    </div>
  );
};

export default UserHandleCard;
