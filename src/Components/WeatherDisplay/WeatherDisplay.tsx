import React from 'react';
import './WeatherDisplay.scss';
import {useSelector} from "react-redux";
import {Tstate} from "../../Config/TypeScript/Types";
import Conv from "../../Utils/unitConverter";
import HeatSpot from "../../UI/HeatSpot/HeatSpot";
import Compass from "../../UI/Compass/Compass";

const WeatherDisplay = () => {

    const {date, city, country, summary, wind, clouds, temperature} = useSelector((state: Tstate) => state.weatherData);


    const isLoading = useSelector((state: Tstate) => state.isLoading);
    const {length_unit, temperature_unit} = useSelector((state: Tstate) => ({
        length_unit: state.length_unit,
        temperature_unit: state.temperature_unit
    }))

    return (
        <div className={`WeatherDisplay ${+(city === null) && "WeatherDisplay--inactive"}`}>
            <div className="WeatherDisplay__Summary">
                <h2 className="WeatherDisplay__Summary__Title">{!isLoading ? `${city}, ${country}` : "Loading...."}</h2>
                <p>{date !== null && date}</p>
            </div>
            <div className="WeatherDisplay__TagLine">
                <h1>{summary.description != null && summary.description.toUpperCase()}</h1>
            </div>
            <div className="WeatherDisplay__Temperature">
                <h3>Temperatures</h3>
                <div className="place-center"><HeatSpot temperature={temperature.actual}
                                                        large={true}>{Conv(temperature.actual, "celsius", temperature_unit)}</HeatSpot>
                    <span>Feels like: {Conv(temperature.feelsLike, "celsius", temperature_unit)}</span>
                </div>
                <div className="WeatherDisplay__Temperature__MinMax justify-center">
                    <div className="justify-center">Minimum Today:<HeatSpot
                        temperature={temperature.min}>{Conv(temperature.min, "celsius", temperature_unit)}</HeatSpot>
                    </div>
                    <div className="justify-center">Maximum Today:<HeatSpot
                        temperature={temperature.min}>{Conv(temperature.max, "celsius", temperature_unit)}</HeatSpot>
                    </div>
                </div>
            </div>
            <div className="WeatherDisplay__Wind">
                <h3>Wind</h3>
                <div><Compass direction={wind.deg} speed={Conv(wind.speed, "kmh", length_unit)}/></div>
            </div>
            <div className="WeatherDisplay__MoreInfo">
                <h3>More Information</h3>
                <p>{`Humidity: ${Conv(clouds.humidity, "percent")}`}</p>
                <p>{`Visibility: ${Conv(clouds.visibility, "m", length_unit)}`}</p>
                <p>{`Cloud Coverage: ${Conv(clouds.all, "percent")}`}</p>
            </div>
        </div>
    );
};

export default WeatherDisplay;