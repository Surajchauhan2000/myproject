import "./header.css"
// import { faBed } from "@fortawesome/free-solid-svg-icons"
import { faBed ,faCar,faPlane,faTaxi,faPerson,faCalendarDays} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DateRange } from 'react-date-range';
import {useState} from 'react'
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {format} from "date-fns";
import { useNavigate } from 'react-router-dom';
import { SearchContext } from "../../context/SearchContext";
import { useContext } from "react";
import { useReducer } from "react";
import { AuthContext } from "../../context/AuthContext";

const Header = ({type}) => {
    const[destination,setDestination]=useState("");
    const[openDate,setOpenDate]=useState(false);
    const [dates, setDates] = useState([
        {
          // objects  of date and setDate
          startDate: new Date(),
          endDate: new Date(),
          key: 'selection'
        }
      ]);

      const [openOption,setOpenOption]=useState(false);
      const[option,setOption]=useState({
        'adult':1,
        'children':0,
        'room':1
})

const handelOption=(name,operation)=>{
    setOption((prev)=>{
        return{
            ...prev,
            [name]:operation==="i" ?option[name]+1:option[name]-1,
            };
});
};
const navigate=useNavigate();   // this is  navigate hooks is generally use to transfer your content to any other component// 
// call the function of handel Search

const { user } = useContext(AuthContext);


const {dispatch}=useContext(SearchContext);

const handelSearch=()=>{
    dispatch({type:"NEW_SEARCH",payload:{destination,dates,option}});
    navigate("/hotel",{state :{destination,dates,option}});
};
       
  return (
    <div className="header">
       <div className={type==="list"?"headerContainer listMode" : "headerContainer"}>
        <div className="headerList">
                <div className="headerListItem active">
                    <FontAwesomeIcon icon={faBed} />
                    <span>Stays</span>
                </div>

                <div className="headerListItem">
                    <FontAwesomeIcon icon={faPlane} />
                    <span>Flight</span>
                </div>

                <div className="headerListItem">
                    <FontAwesomeIcon icon={faCar} />
                    <span>Cars rentals</span>
                </div>

                <div className="headerListItem">
                    <FontAwesomeIcon icon={faTaxi} />
                    <span>Airport Taxi</span>
                </div>
        </div>

       { (type!=="list") &&
       <>
       <h1 className="headerTitle">A lifetime of discount? Its Genius</h1>
        <p className="headerDesc">
            Get Rewarded for your travels unlock instant saving of 10% or more with a free Hotel Booking account.
        </p>
       {!user && <button className="headerBtn">Sign-in/ Register</button>}
        <div className="headerSearch">
            <div className="headerSearchItem">
            <FontAwesomeIcon icon={faTaxi} className="headerIcon" />
                    <span>Airport Taxi</span>
                <input type="text"placeholder="Where are you going ?" onChange={(e)=>setDestination(e.target.value)}className="headerSearchInput"/>
            </div>

           { /* use openDate as false that means close the date and time window and in span when we click then it becomes true and open the date and time window */}
            <div className="headerSearchItem">
            <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                    <span onClick={()=>{setOpenDate(!openDate)}} className="headerSearchText">{`${format(dates[0].startDate,"MM/dd/yyyy") } to ${format(dates[0].endDate,"MM/dd/yyyy") } `} </span>
                   
                    
                    {openDate && <DateRange
                        editableDateInputs={true}
                        onChange={item => setDates([item.selection])}
                        moveRangeOnFirstSelection={false}
                        ranges={dates}
                        className="date"
                        minDate={new Date()}
                    />}
            </div>

            {/* use the default useState behaviour that is adult is 1 room is 1 and children 0 */}
            
            <div className="headerSearchItem">
            <FontAwesomeIcon icon={faPerson}className="headerIcon" />
                <span onClick={()=>setOpenOption(!openOption)} className="headerSearchText">{`${option.adult} adult.${option.children} children .${option.room} room`} </span>

                {openOption&& <div className="options">
                    <div className="optionItem">
                        <span className="optionText">Adult</span>
                        <div className="optionCounter">
                            <button disabled={option.adult<=1} className="optionCounterButton" onClick={()=>handelOption("adult",'d')}>-</button>
                            <span className="optionCounterNumber">{option.adult}</span>
                            <button className="optionCounterButton" onClick={()=>handelOption("adult",'i')}>+</button>
                        </div>
                    </div>

                    <div className="optionItem">
                        <span className="optionText">Children</span>
                        <div className="optionCounter">
                            <button disabled={option.children<=0} className="optionCounterButton" onClick={()=>handelOption("children",'d')}>-</button>
                            <span className="optionCounterNumber">{option.children}</span>
                            <button className="optionCounterButton" onClick={()=>handelOption("children",'i')}>+</button>
                        </div>
                    </div>

                    <div className="optionItem">
                        <span className="optionText">Rooms</span>
                        <div className="optionCounter">
                            <button disabled={option.room<=1} className="optionCounterButton" onClick={()=>handelOption("room",'d')}>-</button>
                            <span className="optionCounterNumber">{option.room}</span>
                            <button className="optionCounterButton" onClick={()=>handelOption("room",'i')}>+</button>
                        </div>
                    </div>
                </div>}
            </div>

            <div className="headerSearchItem">
                <button className="headerBtn2" onClick={handelSearch}>Search</button>
            </div>
        </div></>}




       </div>
    </div>
  );
}

export default Header
