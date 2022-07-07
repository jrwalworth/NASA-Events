import React, {useState, useEffect} from 'react';
import {MapContainer as Map, Marker, Popup, TileLayer } from 'react-leaflet';
import { Icon } from 'leaflet';
// import { useMap } from 'react-leaflet/hooks';
import axios from 'axios';
import Moment from 'react-moment';
import '../App.css';
import REACT_APP_NASA_API_KEY from './.env';
// NASA_API_KEY = process.env.REACT_APP_NASA_API_KEY;

//create custom marker icons
import fire from '../assets/fire-48.png';
import storm from '../assets/storm-24.png';
import melt from '../assets/melt.svg';
import quake from '../assets/quake-64.png';
import volcano from '../assets/volcano-48.png';
import tsunami from '../assets/tsunami-32.png';

//assign custom icons to leaflet marker icon
const fireIcon = new Icon({
    iconUrl: fire,
    iconSize: [25, 25]
});
const stormIcon = new Icon({
    iconUrl: storm,
    iconSize: [25,25]
});
const earthQuakeIcon = new Icon({
    iconUrl: quake,
    iconSize: [20, 20]
});
const volcanoIcon = new Icon({
    iconUrl: volcano,
    iconSize: [30, 30]
});
const meltIcon = new Icon({
    iconUrl: melt,
    iconSize: [25, 25]
});



const View = () => {
    const [eventsData, setEventsData] = useState([]);
    const [activeMarker, setActiveMarker] = useState(null);
    // const [categories, setCategories] = useState([]);
    // const [count, setCount] = useState(0);

    useEffect(() => {
        axios.get(`https://eonet.gsfc.nasa.gov/api/v2.1/events?api_key=${REACT_APP_NASA_API_KEY}`)
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
            <Map center = {[32.715736, -117.161087]} zoom = {4}>
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
                        icon= {_event.categories[0].title === 'Wildfires'? fireIcon :
                            _event.categories[0].title === 'Volcanoes' ? volcanoIcon :
                            _event.categories[0].title === 'Severe Storms' ? stormIcon :
                            _event.categories[0].title === 'Sea and Lake Ice' ? meltIcon :
                            //TODO - add condition for all event category types
                            earthQuakeIcon}
                        >
                            <Popup
                            onClose= {() => {
                                setActiveMarker(null);
                            }}>
                                <div className="popup">
                                    <div className="p-head">
                                        {_event.categories[0].title === 'Wildfires'? <img src={fire} /> : 
                                            _event.categories[0].title === 'Volcanoes' ?  <img src={volcano} /> :
                                            _event.categories[0].title === 'Severe Storms' ? <img src={storm} /> :
                                            _event.categories[0].title === 'Sea and Lake Ice' ? <img src={melt} /> :
                                            <img src={quake} />
                                        }
                                        <h2>{_event.title}</h2>
                                    </div>
                                    
                                    <p>Category:{_event.categories[0].title}</p>
                                    <p>Latest Update:<Moment format="MMM. DD, YYYY" date={_event.geometries[0].date}/></p>
                                    <p>Lat:{_event.geometries[0].coordinates[1]} | Lon:{_event.geometries[0].coordinates[0]}</p>
                                    <hr/>
                                    <div className="popup-actions">
                                        <p>{_event.id}</p>
                                        <button>Links</button>
                                    </div>
                                    <div className="sources">
                                        <h5>Sources:</h5>
                                        {_event.sources? _event.sources.map((source)=> <p>{source.id}<br/>{source.url}</p>) : null}
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