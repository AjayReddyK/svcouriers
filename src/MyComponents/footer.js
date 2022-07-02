import React from "react";
import {
  MDBFooter,
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBIcon,
  MDBBtn,
} from "mdb-react-ui-kit";
import "@fortawesome/fontawesome-free/css/all.min.css";
// import "bootstrap-css-only/css/bootstrap.min.css";
// import "mdbreact/dist/css/mdb.css";

export const Footer = () => {
  return (
    <div className="footer border mt-4">
      <MDBFooter className="bg-light text-center text-white ">
        <div className="container p-4 pb-0">
          <section className="mb-4">
            <a
              className="btn btn-primary btn-floating m-1"
              style={{ backgroundColor: "#3b5998" }}
              href="https://www.facebook.com/sunil354"
              role="button"
              target="_blank"
            >
              <MDBIcon fab icon="facebook-f" />
            </a>

            <a
              className="btn btn-primary btn-floating m-1"
              style={{ backgroundColor: "#55acee" }}
              href="https://twitter.com/svcouriers"
              role="button"
              target="_blank"
            >
              <MDBIcon fab icon="twitter" />
            </a>
            <a
              className="btn btn-primary btn-floating m-1"
              style={{ backgroundColor: "green" }}
              href="https://wa.me/+919848009696"
              role="button"
              target="_blank"
            >
              <MDBIcon fab icon="whatsapp" />
            </a>
            <a
              className="btn btn-primary btn-floating m-1"
              style={{ backgroundColor: "#3b5998" }}
              href="tel:+919848009696"
              role="button"
              target="_blank"
            >
              <MDBIcon fas icon="phone" />
            </a>

            <a
              className="btn btn-primary btn-floating m-1"
              style={{ backgroundColor: "#ac2bac" }}
              href="https://www.instagram.com/sunil354/"
              role="button"
              target="_blank"
            >
              <MDBIcon fab icon="instagram" />
            </a>
          </section>
        </div>

        <div className="text-center p-3" style={{ backgroundColor: "#0a4275" }}>
          © 2020 Copyright :
          <a className="text-white" href="/">
            SV Couriers
          </a>
        </div>
      </MDBFooter>
    </div>
  );
};
