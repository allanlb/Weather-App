import {useEffect} from "react";
import {useSpring, animated} from "react-spring";
import './HeatSpot.scss'

const HeatSpot = ({
                      temperature,
                      large,
                      children
                  }: { temperature: number | null, large?: boolean, children?: JSX.Element | string }) => {

    const [color, setColor] = useSpring(() => ({backgroundColor: "rgb(255, 0, 255)"}));

    useEffect(() => {
        if (temperature !== null) {
            let newColor: string;
            switch (true) {
                case (temperature < -20):
                    newColor = "rgb(0, 0, 255)";
                    break;
                case (temperature < -10):
                    newColor = "rgb(98,161,219)";
                    break;
                case (temperature < 0):
                    newColor = "rgb(98,161,219)";
                    break;
                case (temperature < 10):
                    newColor = "rgb(231,216,125)";
                    break;
                case (temperature < 20):
                    newColor = "rgb(221,159,64)";
                    break;
                case (temperature < 30):
                    newColor = "rgb(180,69,31)";
                    break;
                case (temperature < 40):
                    newColor = "rgb(176,17,17)";

                    break;
                default:
                    newColor = "rgb(176,17,17)";

            }
            setColor({backgroundColor: newColor})
        }
    }, [temperature, setColor])


    const diameter = large ? "75px" : "50px";
    return (<div style={{width: diameter, height: diameter}} className={"HeatSpot"}>
        <animated.div style={{...color, width: diameter, height: diameter}}
                      className="HeatSpot__Circle">
            <div className="HeatSpot__Circle__Inner">{children}</div>
        </animated.div>
    </div>)

}
export default HeatSpot;