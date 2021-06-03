import React from "react";
import BookingForm from "./content/BookingForm";
import Rooms from "./content/Rooms";
import Services from "./content/Services";
import "../assets/css/Content.css";
const Content = () => {
  return (
    <div>
      <Services />
      <BookingForm />
      <Rooms />
    </div>
  );
};

export default Content;
