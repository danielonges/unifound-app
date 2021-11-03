import { GET_ALL_LOSTFOUNDS } from "../types";

const lostAndFoundReducer = (state, action) => {
    switch (action.type) {
        case CREATE_LOSTFOUND:
        case SET_LOSTFOUND:
            return {
                ...state,
                lostFoundListing: action.payload
            };
        case UPDATE_LOSTFOUND:
            return {
                ...state,
                lostFoundListing: state.lostFoundListings.find(
                    (currListing) => currListing.id === state.lostFoundListing.id
                )
            };
        case DELETE_LOSTFOUND:
            return {
                ...state,
                lostFoundListings: state.lostFoundListings.filter((listing) => listing.id != action.payload)
            };
        case GET_ALL_LOSTFOUNDS:
            return {
                ...state,
                lostFoundListings: action.payload
            };
        default:
            return state;
    }
};

export default lostAndFoundReducer;
