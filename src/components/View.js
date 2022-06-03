import React, {useState, useEffect} from 'react';
import {MapContainer as Map, Marker, Popup, TileLayer } from 'react-leaflet';
import axios from 'axios';
import '../App.css';
import NASA_API_KEY from './.env';


const View = () => {
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
        <div>
            <div>Map</div>
            <Map center = {[32.715736, -117.161087]} zoom = {10}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='© OpenStreetMap'
                />
                {eventsData?.map((eachEvent, index) => (
                    <Marker key={index} position={
                        [
                            eachEvent.geometries[0].coordinates[1], 
                            eachEvent.geometries[0].coordinates[0]
                        ]} 
                    />
                ))}
            </Map>
        </div>
    );
};

export default View;