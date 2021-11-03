import axios from 'axios'
import { useContext, useState, useEffect } from 'react';
import lostAndFoundContext from '../../context/lostAndFound/lostAndFoundContext';
import LostFoundListingCard from './LostFoundListingCard';

export const LostFoundListings = (props) => {
    const lostFoundContext = useContext(lostAndFoundContext);
    const { lostFoundListings, getLostFoundListings, createLostFoundListings} = lostFoundContext;
  
    const [lostFoundListing, setLostFoundListing] = useState({
      name: '',
      description: '',
    });

    useEffect(() => {
      axios.post('/lostnfound/allLFlistings');
    }, []);

    const { name, description } = lostFoundListing;  

    return (
        <div>
            {
                lostFoundListings.map((listing, index) => {
                        return (
                            <LostFoundListingCard params={listing} />
                        )
                    })
                }
        </div>
    )
}

export default LostFoundListings