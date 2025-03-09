import Itinerary from "../components/Itinerary";
import Hotels from "../components/Hotels";
import InfoSection from "../components/InfoSection";
import { db } from "../utils/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ViewTrip() {
    const { id } = useParams<{ id: any }>();
    const [trip,setTrip] = useState<any>({});
   
    useEffect(() => {
        getTripData();
    }, [id]);

    const getTripData = async() =>{
        try{
            const docRef = doc(db,'Trips',id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                console.log(docSnap.data());
                setTrip(docSnap.data());
            }
            else{
                console.log('No such document');
            }
        }
        catch(e){
            console.error('Error getting document:', e);  
        }  
    }
    
    
    return(
        <div className="p-10 md:px-20 lg:px-44 xl:px-56">
          <InfoSection tripData={trip}/>
          <Hotels tripData = {trip}/>
          <Itinerary tripData = {trip}/>
        </div>
    )
}
export default ViewTrip;