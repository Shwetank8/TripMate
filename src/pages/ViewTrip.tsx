

import Itinerary from "../components/Itinerary"
import Hotels from "../components/Hotels"
import InfoSection from "../components/InfoSection"
import { db } from "../utils/firebaseConfig"
import { doc, getDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
// Import the useTheme hook

function ViewTrip() {
  const { id } = useParams<{ id: any }>()
  const [trip, setTrip] = useState<any>({})
 // Get the current theme

  useEffect(() => {
    getTripData()
  }, [id])

  const getTripData = async () => {
    try {
      const docRef = doc(db, "Trips", id)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        console.log(docSnap.data())
        setTrip(docSnap.data())
      } else {
        console.log("No such document")
      }
    } catch (e) {
      console.error("Error getting document:", e)
    }
  }

  return (
    <div >
      <div className="flex justify-end mb-4">
        
      </div>
      <InfoSection tripData={trip} />
      <Hotels tripData={trip} />
      <Itinerary tripData={trip} />
    </div>
  )
  
}

export default ViewTrip

