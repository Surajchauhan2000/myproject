import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./reserve.css";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { SearchContext } from "../../context/SearchContext";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
// to access the room in this pages
const Reserve = ({ setOpen, hotelId }) => {
  const [selectedRooms, setSelectedRooms] = useState([]);
  const { dates } = useContext(SearchContext);

  const { data, loading, error } = useFetch(
    `http://localhost:8800/api/hotels/room/${hotelId}`
  );

  // Here we have calculate those dates which is the user stay in date ranges

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const date = new Date(start.getTime());

    let list = [];
    while (date <= end) {
      list.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }
    return list;
  };

  const allDates = getDatesInRange(dates[0].startDate, dates[0].endDate);

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailabeDates.some((date) =>
      allDates.includes(new Date(date).getTime())
    );

    return !isFound;
  };

  const handelSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };
  console.log(selectedRooms);

  const navigate=useNavigate();
  const handelClick = async() => {
    try{
        await Promise.all(
            selectedRooms.map(roomId=>{
                const res=axios.put(`/rooms/availability/${roomId}`, {dates:allDates});
                return res.data;
            })
        );
        setOpen(false);
        navigate("/");
    }catch(err){

    }
  };
  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span>Select Your Rooms :</span>
        {data.map((item) => (
          <div className="rItem">
            <div className="rItemInfo">
              <div className="rTitle">{item.title}</div>
              <div className="rDesc">{item.desc}</div>
              <div className="rMap">
                Max People :<b>{item.maxPeople}</b>
              </div>
              <div className="rPrice">{item.price}</div>
            </div>
            <div className="selectRooms">
              {item.roomNumber.map((roomNumber) => (
                <div className="room">
                  <label>{roomNumber.number}</label>
                  <input
                    type="checkbox"
                    disabled={!isAvailable(roomNumber)}
                    value={roomNumber._id}
                    onChange={handelSelect}
                  ></input>
                </div>
              ))}
            </div>
          </div>
        ))}
        <button onClick={handelClick} className="rButton">
          Reserve Now !
        </button>
      </div>
    </div>
  );
};

export default Reserve;
