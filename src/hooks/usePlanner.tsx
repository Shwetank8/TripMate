import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { doc, setDoc } from "firebase/firestore"; 
import { db } from "../utils/firebaseConfig";
import { useNavigate } from "react-router-dom";

const usePlanner = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [response, setResponse] = useState<any>(null);
    const navigate = useNavigate();

    const generateItinerary = async (destination: string, days: number, budget: string, people: string) => {
        const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
        if (!apiKey) {
            setError("API Key is missing");
            // console.log(apiKey)
            return;
        }

        // console.log("API Key:", apiKey); // Debugging step

        const genAI = new GoogleGenerativeAI(apiKey);
  
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
        });
  
        const generationConfig = {
        temperature: 1,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 8192,
        responseMimeType: "application/json",
        };
  
        const prompt = `Provide a day-to-day itinerary for ${destination} for ${days} days. 
                The budget is ${budget}, and the group includes ${people} people. Give multiple hotels that are centrally located.
                In the itinerary also include plans based on number of people, for example if it is a couple add romantic spots, if it is a solo traveller add clubs/bars, if it is a family add museums adventure parks etc.
                Each day should have a minimum of 3 places to visit. Also give top restaurants/cafes to visit with restaurant name,location,cuisine and average cost per meal, give a minimum of 3 restaurants per day.
                Also include any visa restrictions if any and a brief about the visa process and the documents required. 
                Add best modes of transport to get around the city with average price of each mode, packing suggestions based on weather conditions.
                Tell me about the weather conditions and the best time to visit. Also add best modes of transport to get around the city.
                Add currency information (value of local currency in USD,INR,EUR,GBP), SIM connectivity, add any other important information that a traveller should know.
                Return the response in **valid JSON format** with the following **exact structure**:

                {
                "destination": "${destination}",
                "days": ${days},
                "budget": "${budget}",
                "groupSize": ${people},
                "hotels": [  // This key must always be "hotels"
                    {
                    "hotelName": "string",
                    "hotelPrice": "string",
                    "hotelLocation": "string",
                    "hotelImage": "string (URL)",
                    "hotelRating": "string",
                    "hotelAmenities": "string",
                    }
                ],
                "visa": {
                    "visaRequirements": "string",   
                    "visaProcess": "string",
                    "documentsRequired": "string"
                },
                "transport": {
                    "modesOfTransport": "string",
                },
                "packing": {
                    "packingSuggestions": "string"
                },
                "currency": {
                    "localCurrencyValue": {
                    "USD": "string",
                    "INR": "string",
                    "EUR": "string",
                    "GBP": "string"
                    }
                },
                "simConnectivity": {
                    "simCardProviders": "string",
                    "simCardCost": "string",
                },
                "otherInformation": {
                    "importantInformation": "string",
        },
                "weather": {
                    "bestTimeToVisit": "string",
                    "weatherConditions": "string"
                },
                "restaurants": [
                    {
                    "restaurantName": "string",
                    "restaurantLocation": "string",
                    "restaurantCuisine": "string",
                    "averageCostPerMeal": "string"
                    }
                ],
                "itinerary": [
                    {
                    "day": 1,
                    "date": "string (e.g., YYYY-MM-DD)",
                    "placesToVisit": [
                        {
                        "placeName": "string",
                        "placeDescription": "string",
                        "placeLocation": "string",
                        "openingTime": "string"
                        }
                    ]
                    }
                ]
                }
                Ensure that:
                1. The entire response follows **this exact JSON structure**.
                2. The "hotels" key is always used (not "hotelOptions" or any other variant).
                3. The JSON is well-formatted and free of additional text.
                `;
    
        try {
        setLoading(true);
        setError(null);
    
        const chatSession = model.startChat({
            generationConfig,
            history: [
            {
                role: "user",
                parts: [{ text: prompt }],
            },
            ],
        });
    
        const result = await chatSession.sendMessage(prompt);
    
        // Parse the result as JSON
        const itinerary = JSON.parse(result.response.text());
        setResponse(itinerary);
        return itinerary;
    
        } catch (err: any) {
            console.error("Error:", err);
            setError(err.message || "An error occurred while generating the itinerary.");
        } finally {
            setLoading(false);
        }
    };

    const saveTrip = async (
        itinerary: any,
        destination: string,
        days: number,
        budget: string,
        people: string
    ) => {
        try {
            setLoading(true);
            setError(null);
            const docID = Date.now().toString(); // Generate a unique document ID
            await setDoc(doc(db, "Trips", docID), {
                tripData: itinerary, // Store the generated itinerary
                userInput: {
                    destination,
                    days,
                    budget,
                    people,
                },
                createdAt: new Date().toString(), // Store timestamp
                id: docID,
            });
            // console.log("Trip saved successfully!");
            setLoading(false);
            navigate(`/view-trip/${docID}`); // Redirect to the newly created trip

        } catch (error) {
            console.error("Error saving trip:", error);
            setError("Failed to save trip. Please try again.");
        }
    };
    


    // Return relevant data from the custom hook
    return {
        generateItinerary,
        saveTrip,
        loading,
        error,
        response,
    };
}

export default usePlanner;
