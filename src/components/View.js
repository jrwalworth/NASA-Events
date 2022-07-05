import React, {useState, useEffect} from 'react';
import {MapContainer as Map, Marker, Popup, TileLayer } from 'react-leaflet';
import { Icon } from 'leaflet';
// import { useMap } from 'react-leaflet/hooks';
import axios from 'axios';
import '../App.css';
import NASA_API_KEY from './.env';


const fireIcon = new Icon({
    iconUrl: "",
    iconSize: [20, 20]
})

const earthQuakeIcon = new Icon({

})



const View = () => {
    const [eventsData, setEventsData] = useState([]);
    const [activeMarker, setActiveMarker] = useState(null);
    // const [categories, setCategories] = useState([]);
    const [count, setCount] = useState(0);

    useEffect(() => {
        axios.get(`https://eonet.gsfc.nasa.gov/api/v2.1/events?api_key=${NASA_API_KEY}`)
        .then(response=> {
            // console.log('status', response.status);
            // console.log('response.data.events:',response.data.events);
            setEventsData(response.data.events);
        })
        .catch(err => console.log(err));
    }, []);

    

    // console.log('fire count e.data', eventsData[0].categories[0].title);
    // console.log('eventsdata', eventsData);
    return (
        <div id="map">
            <Map center = {[32.715736, -117.161087]} zoom = {5}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='© OpenStreetMap'
                />
                {eventsData?.map(_event => (
                    <Marker key={_event.id} position={
                        [
                            _event.geometries[0].coordinates[1], 
                            _event.geometries[0].coordinates[0]
                        ]}
                        onClick = {() => {
                            setActiveMarker(_event);
                        }}

                        >
                            <Popup
                            onClose= {() => {
                                setActiveMarker(null);
                            }}>
                                <div className="popup">
                                    <h2>{_event.title}</h2>
                                    <p>Category:{_event.categories[0].title}</p>
                                    <p>{_event.geometries[0].date}</p>
                                    <p>Lat:{_event.geometries[0].coordinates[1]} | Lon:{_event.geometries[0].coordinates[0]}</p>
                                    <hr/>
                                    <div className="popup-actions">
                                        <p>{_event.id}</p>
                                        <button>Links</button>
                                    </div>
                                    
                                </div>
                            </Popup>
                            
                    </Marker>
                ))}
            </Map>
        </div>
    );
};

export default View;