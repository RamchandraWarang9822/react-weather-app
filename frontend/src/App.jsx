import React, { useEffect, useState } from "react";
import "./App.css";
import Axios from "axios";  


const API_KEY = '3a498c282257d30502c5f1f298f9e6ad';

const App = () => {
    const [city, setCity] = useState([]);
    const [country, setCountry] = useState([]);
    const [data, setData] = useState([]);
    const [firstLoad, setFirstLoad] = useState(false);

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;

    const fetchData = async () => {
        {
            if (city === "") {
                alert("Enter City");
            } else {
                const response = await Axios.get(url);
                const regionNames = new Intl.DisplayNames(['en'], {type: 'region'});
                const countryCode = await response.data.sys.country;
                const countryName = regionNames.of(countryCode);
                setCountry(countryName);
                setData(response.data);
                setFirstLoad(false);
            }
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchData();
        document.getElementById('fetch').value = ""

    }

    useEffect(() => {
        setFirstLoad(true);
        fetchData();
    }, []);

    return (
        <div className="App">
            <div className="mx-auto max-w-5xl py-20 sm:px-6 sm:py-20 lg:px-16">
                <div className="relative isolate overflow-hidden bg-gray-900 px-6 pt-16 pb-5 shadow-2xl sm:rounded-3xl sm:px-16 sm:py-10 md:pt-24 lg:flex lg:gap-x-20 lg:px-30 lg:pt-0">
                    <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-8 lg:text-left ">
                        <div className="lg:py-6">
                            {!firstLoad?  (
                            <>
                                { data.weather &&
                                <div className="flex w-90 flex-row justify-evenly items-center flex-wrap">
                                    <div className="flex mt-1 mr-2 flex-row justify-evenly items-center">
                                        <div className="flex flex-col text-white font-bold text-6xl m-4 capitalize ">
                                            {data.name}
                                            <span className="text-white font-light text-sm mt-3">{country}</span>
                                        </div>
                                    </div>
                                    <div className="flex mt-1 mr-2 flex-row justify-evenly items-center">
                                        <div className="flex flex-col text-white font-bold text-5xl m-4">
                                            {data.weather[0].main}
                                            
                                        </div>
                                    </div>
                                    
                                    <div className="flex mt-1 mr-2 flex-row justify-evenly items-center">
                                        <div className="flex flex-col text-white font-bold text-4xl m-4">
                                            {Math.floor(data.main.temp - 273.15)}
                                            <span className="text-white font-light text-sm">Celsius</span>
                                        </div>
                                    </div>
                                    <div className="flex mt-1 mr-2 flex-row justify-evenly items-center">
                                        <div className="flex flex-col text-white font-bold text-4xl m-4">
                                            {data.main.humidity}
                                            <span className="text-white font-light text-sm">Humidity</span>
                                        </div>
                                    </div>
                                    <div className="flex mt-1 mr-2 flex-row justify-evenly items-center">
                                        <div className="flex flex-col text-white font-bold text-4xl m-4">
                                            {data.wind.speed}
                                            <span className="text-white font-light text-sm">Wind Speed</span>
                                        </div>
                                    </div>
                                </div>}
                                
                            </>
                            ) : (
                            <>
                            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                                <span className="block text-5xl mb-3">Weather App</span>
                                <span className="block text-2xl text-indigo-400">Get Weather Details</span>
                            </h2><p className="mt-3 text-sm text-gray-300">
                                    Enter <span className="text-indigo-400 font-bold">city</span> name of which you want to get weather details
                                </p>
                            </>
                            
                            )
                            }
                            <div className="mt-12">
                                <form className="sm:flex" method="GET">
                                    <div className="min-w-0 flex-1 ">
                                        <input
                                            id='fetch'
                                            type="text"
                                            placeholder="Enter City"
                                            onChange={(e) => setCity(e.target.value)}
                                            className="block w-full mb-5 border-gray-300 rounded-md shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />

                                        <button
                                        type="submit"
                                            onClick={handleSubmit}
                                            className="px-4 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 sm:mt-0 sm:ml-3 sm:w-auto sm:flex-shrink-0"
                                        >
                                            Check Weather
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default App;