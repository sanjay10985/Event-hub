import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MdKeyboardArrowLeft } from "react-icons/md";
import axios from "axios";
import moment from "moment/moment";
import AddTicketForm from "../components/AddTicketForm";

export default function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState({});
  const [tickets, setTickets] = useState(false);

  //api.theeventera.live/api/events/details/65dae3f5ef21054f00f20c34
  const url = "https://api.theeventera.live/";

  useEffect(() => {
    try {
      axios
        .get("https://api.theeventera.live/api/events/details/" + id)
        .then((response) => {
          console.log(response.data);
          setEvent(response.data);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log("Err signing up", err);
    }
  }, []);

  const isBlock = (value) => {
    setTickets(value);
  };

  return (
    <div className="mx-8  relative">
      <div className="mb-8">
        <div
          href="google.com"
          className="flex text-xl items-center font-bold cursor-pointer"
          onClick={() => window.history.back()}
        >
          <MdKeyboardArrowLeft size={25} />
          Back
        </div>
      </div>
      <div className="mb-8">
        <div className="content-center">
          <img
            src={`${url}${event.banner_img}`}
            className="rounded-2xl w-full h-full border-transparent border-r-5 object-cover"
            style={{ height: "486px" }}
          />
        </div>
      </div>

      <div className="p-3 border rounded-2xl mb-8 hover:border-red-500">
        <h5 className="2xl:text-2xl text-xl pb-3  font-semibold">
          {event.event_name}
        </h5>
        <p className="2xl:xl text-lg pb-3 leading-5 font-normal">
          {event.description}
        </p>
        <div className="flex text-sm pb-6 2xl:text-base">
          <p className="flex 2xl:pr-4 pr-2">
            {/* <img src={call} alt="calender"></img> */}
            <span className="p-2">
              {moment(event.event_date).format("MMMM DD, YYYY")}
            </span>
          </p>
          <p className="flex 2xl:pr-4 pr-2">
            {/* <img src={clock} alt="time"></img> */}
            <span className="p-2">{event.event_time}</span>
          </p>
          <p className="flex 2xl:pr-4 pr-2">
            {/* <img src={location} alt="location"></img> */}
            <span className="p-2">{event.city}</span>
          </p>
        </div>
        <div className="flex">
          <p className="flex 2xl:pr-4 pr-2 mr-8 items-center">
            <span className="2xl:text-2xl text-xl p-2 font-semibold">
              ₹{event.price}
            </span>
          </p>
          <button
            onClick={() => setTickets(true)}
            className="text-base px-6 py-3 border-2 rounded-full font-semibold hover:bg-red-500 hover:text-white"
          >
            Book Now
          </button>
        </div>
      </div>
      <div className="p-3 border rounded-2xl mb-8 hover:border-red-500">
        <h5 className="2xl:text-2xl text-xl pb-6  font-semibold">Artist</h5>
        <div className="block lg:flex justify-between p-3">
          <div className="flex items-center justify-center pr-10 lg:mb-3">
            <div>
              <img
                src={`${url}${event.artist_img}`}
                alt="artist"
                className="rounded-full max-w-40 h-40"
              />
            </div>
            <div className="ml-4 ">
              <h3 className="text-xl  font-semibold  pb-2">
                {event.artist_name}
              </h3>
              <h4 className="text-xl ">Comedian</h4>
            </div>
          </div>

          <div className="w-9/12 mx-auto xl:mt-0 mt-12">
            <p className="break-words text-xl ">{event.artist_description}</p>
          </div>
        </div>
      </div>
      <div className="p-3 border rounded-2xl mb-8 hover:border-red-500">
        <h5 className="2xl:text-2xl text-xl pb-6 font-semibold">Location</h5>
        <div className="block p-3 mx-auto">
          <iframe
            src={
              "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14683.1238463749!2d72.52381841014422!3d23.06849059576108!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e9cb250f37723%3A0x27de8effab4879ed!2sMarengo%20CIMS%20Hospital!5e0!3m2!1sen!2sin!4v1709541213390!5m2!1sen!2sin"
            }
            width="100%"
            height="450"
            style={{ border: "0" }}
            allowFullScreen=""
            className="mx-auto"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
      {tickets ? <AddTicketForm event={event} isBlock={isBlock} /> : ""}
    </div>
  );
}
