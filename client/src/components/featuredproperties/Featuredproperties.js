import React from "react";
import "./featuredproperties.css";
import useFetch from "../../hooks/useFetch";
const Featuredproperties = () => {
  const { data, loading, error } = useFetch(
    "http://localhost:8800/api/hotels?featured=true"
  );
  return (
    <div className="fp">
      {loading ? (
        "Loading please wait... "
      ) : (
        <>
          {data.map((item) => (
            <div className="fpItem" key={item._id}>
              <img
                src="https://cf.bstatic.com/xdata/images/hotel/max1280x900/322658536.jpg?k=3fffe63a365fd0ccdc59210188e55188cdb7448b9ec1ddb71b0843172138ec07&o=&hp=1"
                alt=""
                className="fpImg"
              />
              <span className="fpName">{item.name}</span>
              <span className="fpCity">{item.city}</span>
              <span className="fpPrice">Starting from ${item.chepeastPrice}</span>
              {item.rating && <div className="fpRating">
                <button>{item.rating}</button>
                <span>Excellent</span>
              </div>}
            </div>
          ))
          }
        </>
      )}
    </div>
  );
};

export default Featuredproperties;
