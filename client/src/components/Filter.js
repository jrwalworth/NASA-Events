import axios from 'axios';
import React, { useState, useEffect }from 'react';
import '../App.css';
// import * as data from './responseNASA.json';
import REACT_APP_NASA_API_KEY from './.env';
import env from "react-dotenv";
// NASA_API_KEY = process.env.REACT_APP_NASA_API_KEY;

const Filter = () => {
    const [eventsData, setEventsData] = useState([]);
    const [latestEvents, setLatestEvents] = useState([]);

    useEffect(() => {
        axios.get(`https://eonet.gsfc.nasa.gov/api/v2.1/events?api_key=${REACT_APP_NASA_API_KEY}`)
        .then(response=> {
            // console.log('status', response.status);
            // console.log('response.data.events:',response.data.events);

            setEventsData(response.data.events);
        })
        .catch(err => console.log(err));
    }, []);

    console.log('eventsdata', eventsData);
    // console.log('events......', eventsData.categories.title);
    // eventsData.filter(eventsData.)

    //count wildfires

    let findAllCategories = () => {
        let allCatArr = [];
        for (let i=0; i < eventsData.length; i++){
            for (let j =0; j < eventsData[i].categories.length; j++) {
                if (!allCatArr.includes(eventsData[i].categories[j].title)){
                    allCatArr.push(eventsData[i].categories[j].title);
                }
            }
        }
        return allCatArr;
    }
    console.log(findAllCategories());

    // let findLatest = () => {
    //     let latestEventArray = [];
    //     for (let n=0; n < eventsData.length; n++){
    //         // console.log('eventItemDate', eventsData[n].geometries[0].date);
    //         if (eventsData[n].geometries[0].date > '2022-05-01'){
    //             // console.log('ThisYearDate', eventsData[n].geometries[0].date)
    //             latestEventArray.push(eventsData[n]);
                
    //         }
    //     }
    //     console.log('latestArray',latestEvents);
    //     setLatestEvents(latestEventArray);
    //     return latestEvents
    // }
    // findLatest();

    
    let catCount = (strCat) => {
        let catCounter=0;
        // console.log(eventsData.length);
        for (let i = 0; i < eventsData.length; i++){
            // console.log(eventsData[i].categories.length);
            // console.log('event cat title:', eventsData[i].categories[0].title);
            if (eventsData[i].categories[0].title == strCat){
                // console.log('add to count')
                catCounter++;
                } 
        };
        return catCounter;
    }

    let fireCount = catCount('Wildfires');
    let stormCount = catCount('Severe Storms');
    let volcCount = catCount('Volcanoes');
    let iceCount = catCount('Sea and Lake Ice');
    let quakeCount = catCount('Earthquakes');
    let floodCount = catCount('Floods');
    let tempCount = catCount('Temperature Extremes');
    let droughtCount = catCount('Drought');
    let dustCount = catCount('Dust and Haze');
    let landCount = catCount('Landslides');
    let manCount = catCount('Manmade');
    let snowCount = catCount('Snow');
    let waterCount = catCount('Water Color');


    console.log("Category count for Storms:", stormCount);
    console.log("Category count for Fires:", fireCount);
    console.log("Category count for Volcanoes:", volcCount);
    console.log("Category count for Ice:", iceCount);
    console.log("Category count for Earthquakes:", quakeCount);
    console.log("Category count for Floods:", floodCount);
    console.log("Category count for Extreme Temps:", tempCount);
    console.log("Category count for Drought:", droughtCount);
    console.log("Category count for Dust & Haze:", dustCount);
    console.log("Category count for Landslides:", landCount);
    console.log("Category count for Manmade:", manCount);
    console.log("Category count for Snow:", snowCount);
    console.log("Category count for Water Color:", waterCount);


    
    return (
        <div className="filters">
            <h4 className="filter-header">Global Event Details</h4>
            <div >
                <ul className="filter-items">
                    {fireCount > 0 ? <li><span>Wildfires:</span><span>{fireCount}</span></li> : null }
                    {stormCount > 0 ? <li><span>Severe Storms:</span><span>{stormCount}</span></li> : null}
                    {volcCount > 0 ? <li><span>Volcanoes:</span><span>{volcCount}</span></li> : null}
                    {iceCount > 0 ? <li><span>Sea & Lake Ice:</span><span>{iceCount}</span></li> : null}
                    {quakeCount > 0 ? <li><span>Earthquakes:</span><span>{quakeCount}</span></li> : null}
                    {floodCount > 0 ? <li><span>Floods:</span><span>{floodCount}</span></li> : null}
                    {tempCount > 0 ? <li><span>Extreme Temps:</span><span>{tempCount}</span></li> : null}
                    {landCount > 0 ? <li><span>Landslides:</span><span>{landCount}</span></li> : null}
                    {droughtCount > 0 ? <li><span>Drought:</span><span>{droughtCount}</span></li> : null}
                    {snowCount > 0 ? <li><span>Snow:</span><span>{snowCount}</span></li> : null}
                    {dustCount > 0 ? <li><span>Dust & Haze :</span><span>{dustCount}</span></li> : null}
                    {waterCount > 0 ? <li><span>Water Color:</span><span>{waterCount}</span></li> : null}
                    {manCount > 0 ? <li><span>Manmade:</span><span>{manCount}</span></li> : null}
                    <hr/>
                    {eventsData.length ? <li><span>Total Events Reported:</span><span>{eventsData.length}</span></li> : null }
                    
                </ul>
                
            </div>
            
            

            
        </div>
    );
};

export default Filter;