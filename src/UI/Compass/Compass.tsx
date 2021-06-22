import {useSpring, animated} from "react-spring";
import './Compass.scss';
import {useEffect} from "react";

const Compass = ({direction, speed}: { direction: number | null, speed: string | null }) => {
    const [orientation, setOrientation] = useSpring(() => ({transform: "rotate(0deg)"}));
    let label = "";
    if (direction != null) {
        switch (true) {
            case (direction < 33 || direction >= 327):
                label = "North"
                break;
            case (direction < 78):
                label = "North-East"
                break;
            case (direction < 123):
                label = "East"
                break;
            case (direction < 146):
                label = "South-East"
                break
            case (direction < 213):
                label = "South"
                break
            case (direction < 258):
                label = "South-West"
                break
            case (direction < 303):
                label = "West"
                break
            case (direction < 326):
                label = "North-West"
                break
            default:
                label = ""


        }
    }
    useEffect(() => {
        if (direction != null) {
            setOrientation({transform: `rotate(${direction}deg)`})
        }
    }, [direction, setOrientation])

    return (
        <div className="Compass">
            <animated.div style={orientation} className="Compass__Arrow">🠡</animated.div>
            <span className="Compass__Direction">{label}</span>
            <span className="Compass__Speed">{speed}</span>
        </div>);
}
export default Compass;