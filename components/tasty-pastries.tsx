import {getPastryMetadata} from "@/utils/getPastryMetadata";
import { Pastry } from "./pastry";

const TastyPasteries = () => {
 const pastrySet = getPastryMetadata('pastries');

 return <div>
    {pastrySet.map((aPastry, index) => {
    return <Pastry key={index} {...aPastry} />
 })}
 </div>
};

export default TastyPasteries;
