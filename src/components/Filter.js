import axios from 'axios';
import React, { useState, useEffect }from 'react';
import '../App.css';
// import * as data from './responseNASA.json';
import NASA_API_KEY from './.env';

const Filter = () => {

    const [eventsData, setEventsData] = useState([]);

    useEffect(() => {
        axios.get(`https://eonet.gsfc.nasa.gov/api/v2.1/events?api_key=${NASA_API_KEY}`)
        .then(response=> {
            // console.log('status', response.status);
            // console.log('response.data.events:',response.data.events);

            setEventsData(response.data.events);
        })
        .catch(err => console.log(err));
    }, []);

    console.log('eventsdata', eventsData);
    return (
        <div className="filters">
            <div >
                Filter One
            </div>
            <div>
                Filter Two
            </div>
            <div>
                List View
            </div>

            
        </div>
    );
};

export default Filter;