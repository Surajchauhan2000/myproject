/* now we need to pass the date and how to calculate hte price of different days in the last Hotel pages , so this things can be happend using the longest passing the data first pass the data to one by one other component that is very longest method so we do not do this, we will be use the method of prop dealing to do this.*/

import { createContext } from "react";
import  {useReducer} from "react";

const INITIAL_STATE = {
  city: undefined,
  dates: [],
  option: {
    adult: undefined,
    children: undefined,
    room: undefined,
  },
};

export const SearchContext = createContext(INITIAL_STATE)

const SearchReducer = (state, action) => {
  switch (action.type) {
    case "NEW_SEARCH":
      return action.payload; // generally paylod contains the destination dates and adults/child/room
    case "RESET_SEARCH":
      return INITIAL_STATE;
    default:
      return state;
  }
};

export const SearchContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE);

  return (
    <SearchContext.Provider
      value={{
        city: state.city,
        dates: state.dates,
        option: state.option,
        dispatch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
