// import React from 'react';
import loader from '../assets/loading.gif'

const Loader = () => {
    return (
        <div>
            <img src={loader} alt='loading events' />
            <h2>Loading events</h2>
        </div>
    );
};

export default Loader;