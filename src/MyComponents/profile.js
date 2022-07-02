import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import profile from "../images/project.jpeg";
import { MDBIcon } from "mdb-react-ui-kit";
import { AxiosInstance } from "axios";
import axiosInstance from "./axios";

export const Profile = () => {
  const [edit, setedit] = useState("border-0");

  const [userData, setUserData] = useState({});
  const [cardData, setcarddata] = useState([]);
  const [defaultvalue, setvalue] = useState(false);

  const history = useNavigate();
  const [count, updateCount] = useState(0);

  const [formData, updateFormData] = useState({
    email: "",
    name: "",
    mobile: "",
    address: "",
  });

  const handleChange = async (e) => {
    console.log(e.target.name, e.target.value.trim());
    await updateFormData({
      ...formData,
      // Trimming any whitespace
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    await axiosInstance
      .put(`user/updateorder/`, {
        email: formData.email,
        name: formData.name,
        mobile: formData.mobile,
        address: formData.address,
        pk: formData.pk,
        ordered_at: formData.ordered_at,
        picked: formData.picked,
        has_tracking_id: formData.has_tracking_id,
        tracking_id: formData.tracking_id,
      })
      .then((res) => {
        console.log("entered handle submit of pickup form");
        console.log(res.data);
      });
    history("/");
  };

  const upfunc = async () => {
    await axiosInstance.get(`/user/userdetails`).then((res) => {
      const initialFormData = Object.freeze({
        email: res.data.email,
        name: res.data.name,
        mobile: res.data.mobile,
        address: res.data.address,
      });
      updateFormData(initialFormData);
    });
  };
  upfunc();
  return (
    <>
      <section style={{ backgroundColor: "#eee" }}>
        <div class="container py-5">
          <div class="row">
            <div class="col-lg-4">
              <div class="card mb-4">
                <div class="card-body text-center">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                    alt="avatar"
                    class="rounded-circle img-fluid"
                    style={{ width: "150px" }}
                  />
                  <h5 class="my-3">{formData.email}</h5>
                </div>
              </div>
            </div>
            <div class="col-lg-8">
              <div class="card mb-4">
                <div class="card-body">
                  <div class="row">
                    <div class="col-sm-3 my-auto">
                      <p class="mb-0">Name</p>
                    </div>
                    <div class="col-sm-9 ">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        class={`form-control form-control`}
                        style={{ width: "350px" }}
                      />
                    </div>
                  </div>
                  <hr />
                  <div class="row">
                    <div class="col-sm-3 my-auto">
                      <p class="mb-0">Mobile</p>
                    </div>
                    <div class="col-sm-9">
                      <input
                        type="text"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        class={`form-control form-control `}
                        style={{ width: "350px" }}
                      />
                    </div>
                  </div>
                  <hr />
                  <div class="row">
                    <div class="col-sm-3 my-auto">
                      <p class="mb-0">Address</p>
                    </div>
                    <div class="col-sm-9">
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        class={`form-control form-control `}
                        style={{ width: "350px" }}
                      />
                    </div>
                  </div>
                  <hr />
                </div>
              </div>
            </div>
            <div class="d-flex justify-content-center mb-2 mt-4">
              {/* <button
                type="submit"
                class="btn btn-outline-primary ms-3"
                // onClick={changeprofile}
              >
                Save Changes
              </button> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
