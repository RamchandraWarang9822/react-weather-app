import React, { useEffect,useState } from "react";
import "./App.css";
import Axios from "axios";


const API_KEY = '3a498c282257d30502c5f1f298f9e6ad';

const App = () => {
    const [lat, setLat] = useState([]);
    const [long, setLong] = useState([]);
    const [data, setData] = useState([]);
    const [city, setCity] = useState([]);

    useEffect(() => {
        getCurrentLocation();
    }, []);

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
    const urll =`https://api.openweathermap.org/data/2.5/weather?lat=19.075984&lon=72.877656&appid=${API_KEY}`;
    
    
    const getCurrentLocation = async () => {
        navigator.geolocation.getCurrentPosition((position) => {
            setLat(position.coords.latitude);
            setLong(position.coords.longitude);
        });

        const response = await Axios.get(urll);
        setData(response.data);
        console.log(data)
    }
    

    const fetchData = async () => {
        {
            if (city === "") {
                alert("Enter City");
            } else {
                const response = await Axios.get(url);
                setData(response.data);
                console.log(data)
            }
        }
    }

   

    return (
        
        <div className="App">
        <h1>Latitude:{lat}</h1>
        <h1>Longitude:{long}</h1>
        {data.weather && 
        <>
        <h2>Weather : {data.weather[0].main} </h2>
        <div>
            <img src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`} alt="" />
        </div>
        </>
        }

        <input 
        type="text"
        placeholder="Enter City"
        onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchData}>Fetch</button>
        </div>
    );
}

export default App;