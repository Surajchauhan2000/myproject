import "./list.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useLocation } from "react-router-dom";
import { format } from "date-fns";
import { useState } from "react";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch";

const List = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [dates, setDates] = useState(location.state.dates);
  const [option, setOption] = useState(location.state.option);
  const [openDate, setOpenDate] = useState(location.state.options);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);

  const { data, loading, error ,reFetch} = useFetch(`http://localhost:8800/api/hotels?city=${destination}&min=${min || 0}&max=${max || 2000}`);

  const handelClick=()=>{
    reFetch();
  }
  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label>Destination</label>
              <input type="text" placeholder={destination} />
            </div>

            <div className="lsItem">
              <label>Check in Dates</label>
              <span onClick={() => setOpenDate(!openDate)}>
                {`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(
                  dates[0].endDate,
                  "MM/dd/yyyy"
                )} `}
              </span>

              {openDate && (
                <DateRange
                  onChange={(item) => setDates([item.selection])}
                  minDate={new Date()}
                  ranges={dates}
                />
              )}
            </div>
            <div className="lsItem">
              <label>Options</label>
              <div className="lsOption">
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Min Price <small>Per night</small>
                    <input type="number" onChange={e=>setMin(e.target.value)} className="isOptionInput" />
                  </span>
                </div>
              </div>

              <div className="lsItem">
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Max Price <small>Per night</small>
                    <input type="number" onChange={e=>setMax(e.target.value)} className="isOptionInput" />
                  </span>
                </div>
              </div>

              <div className="lsItem">
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Adults
                    <input
                      type="number"
                      min={1}
                      className="isOptionInput"
                      placeholder={option.adult}
                    />
                  </span>
                </div>
              </div>

              <div className="lsItem">
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    children
                    <input
                      type="number"
                      min={0}
                      className="isOptionInput"
                      placeholder={option.children}
                    />
                  </span>
                </div>
              </div>

              <div className="lsItem">
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Rooms
                    <input
                      type="number"
                      min={1}
                      className="isOptionInput"
                      placeholder={option.room}
                    />
                  </span>
                </div>
              </div>
            </div>
            <button onClick={handelClick}>Search</button>
          </div>

          {/* create the right hand side where all the hotel search result are shown */}

          <div className="lsResult">
            {loading ? (
              "Loading please wait"
            ) : (
              <>
                {data.map((item) => (
                  <SearchItem item={item} key={item._id} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
