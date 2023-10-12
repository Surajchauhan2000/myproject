import "./searchItem.css";
import {Link} from 'react-router-dom';
import Hotel from '../../pages/hotel/Hotel.js'

const SearchItem = ({item}) => {
  return (
    <div className="SearchItem">
        <img src={item.photos[0]} alt="" className="siImg"/>

        <div className="siDesc">
            <h1 className="siTitle">{item.name}</h1>
            <span className="siDistance">{item.distance} meter from center</span>
            <span className="siTaxiOp">Free Airport Taxi</span>
            <span className="siSubTitle">Studio Apartment with Air Condition</span>
            {/* <span className="siFeature">{item.desc}</span> */}
            <span className="siCancelOp">Free Cancellation</span>
            <span className="siCancelOpSubTitle">You can Cancel Later, so luck in this great price today ! </span>
        </div>
        <div className="siDetails">
            {item.rating && <div className="siRating">
                <span>Excellent</span>
                <button>{item.rating}</button>
            </div>}
            <div className="siDetailsTaxes">
                <span className="siPrice">{item.chepeastPrice}</span>
                <span className="siTaxes">Includes taxes and fee</span>

                <Link to={`/hotels/${item._id}`}>
                    <button className="siCheckButton">See Availability</button>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default SearchItem;
