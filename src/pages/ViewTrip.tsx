"use client"

import Itinerary from "../components/Itinerary"
import Hotels from "../components/Hotels"
import InfoSection from "../components/InfoSection"
import { db } from "../utils/firebaseConfig"
import { doc, getDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { ThemeToggle } from "../components/theme-toggle"
import { useTheme } from "../components/theme-provider" // Import the useTheme hook
import LOGO from "../assets/logo.jpg"

function ViewTrip() {
  const { id } = useParams<{ id: any }>()
  const [trip, setTrip] = useState<any>({})
  const { theme } = useTheme() // Get the current theme

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
    <div className={`${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"} min-h-screen py-6 md:px-20 lg:px-44 xl:px-56`}>
      <a href="/" className="flex justify-center w">
          <img src={LOGO} className="h-7 sm:h-9"></img>
          </a>
      <div className="flex justify-end mb-4">
        <ThemeToggle />
      </div>
      <InfoSection tripData={trip} />
      <Hotels tripData={trip} />
      <Itinerary tripData={trip} />
    </div>
  )
  
}

export default ViewTrip

