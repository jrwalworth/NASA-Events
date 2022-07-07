import './App.css';
import Nav from './components/Nav';
import Filter from './components/Filter';
import View from './components/View';
// import {useState, useEffect} from 'react';
// import {MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

function App() {
  return (
    <div className="App">
      <Nav />
      <Filter />
      <View />
      
    </div>
  );
}

export default App;
