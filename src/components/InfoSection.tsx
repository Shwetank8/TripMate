import { Download } from "lucide-react";
import useGeneratePDF from "../hooks/useGeneratePDF";
import { Button } from "./ui/button";

function InfoSection({ tripData }: { tripData: any }) {
    const destination = tripData?.userInput?.destination || "";
    const formattedDestination = destination.charAt(0).toUpperCase() + destination.slice(1);

    const travellerType = tripData?.userInput?.people || "default";
    const travellerImages: Record<string, string> = {
        "Solo Adventure": "/solo.jpg",
        "Romantic Getaway": "/couple.jpg",
        "Family Fun": "/family.jpeg",
        "Group Escape": "/frnds.jpg",
        "default": "/placeholder.png"
    };

    const { generatePDF } = useGeneratePDF(tripData);

    return (
        <div className="bg-[#f9f9f9] dark:bg-gray-800 rounded-xl p-6 shadow-md transition-all">
            <div className="flex w-full h-[340px] overflow-hidden rounded-xl items-center justify-center">
                <img
                    src={travellerImages[travellerType]}
                    alt={formattedDestination}
                    className="w-auto h-full object-contain rounded-xl"
                />
            </div>
            <div className="my-5 flex flex-col gap-2 mt-5">
                <h2 className="text-2xl font-bold">
                    {formattedDestination}
                </h2>
                <div className="flex gap-5 justify-between">
                    <div className="flex gap-4" >
                    <h2 className="py-2 px-3 rounded-full border-2 border-[#f56551] text-black dark:text-white text-sm md:text-md">
                        {tripData?.userInput?.days} days
                    </h2>
                    <h2 className="py-2 px-3 rounded-full border-2 border-[#f56551] text-black dark:text-white text-sm md:text-md">
                        Budget: {tripData?.userInput?.budget}
                    </h2>
                    <h2 className="py-2 px-3 rounded-full border-2 border-[#f56551] text-black dark:text-white text-sm md:text-md">
                        {tripData?.userInput?.people}
                    </h2>
                    </div>
                    <button onClick={() => generatePDF()} className="text-[#f56551] cursor-pointer flex gap-2">
                        Download Trip PDF
                        <Download/>
                    </button>
                </div>

            </div>

            {/* Trip Overview Section */}
            <div className="prose dark:prose-invert max-w-none">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Trip Overview</h2>
                <p className="text-gray-600 dark:text-gray-300">
                    Explore the beautiful {formattedDestination} with this {tripData?.userInput?.days}-day itinerary designed for{" "}
                    {tripData?.userInput?.people} with a {tripData?.userInput?.budget} budget.
                </p>
            </div>

            {/* Trip Overview Section */}
            <div className="prose dark:prose-invert max-w-none">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Trip Overview</h2>
                <p className="text-gray-600 dark:text-gray-300">
                    Explore the beautiful {formattedDestination} with this {tripData?.userInput?.days}-day itinerary designed for{" "}
                    {tripData?.userInput?.people} with a {tripData?.userInput?.budget} budget.
                </p>
                {/* Weather Overview Section */}
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mt-2 mb-4">Weather Overview</h2>
                <p className="text-gray-600 dark:text-gray-300">
                    {tripData?.tripData?.weather?.weatherConditions}
                </p>
                {/* BEST TIME TO VISIT */}
                <h3 className="text-md font-bold text-gray-800 dark:text-white mt-2 mb-4">
                    Best Time to Visit:   
                    <span className="text-gray-600 dark:text-gray-300">
                           {tripData?.tripData?.weather?.bestTimeToVisit}
                    </span> 
                </h3>
                {/* Visa Details */}
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Visa Overview</h2>
                <p className="text-gray-600 dark:text-gray-300">
                    Requirements: {tripData?.tripData?.visa?.visaRequirements}
                </p>
                <p className="mt-4">
                     Process: {tripData?.tripData?.visa?.visaProcess}
                </p>
                <p className="mt-4">
                    Documents Required: {tripData?.tripData?.visa?.documentsRequired}
                </p>

                {/* Transport */}

                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mt-5 mb-4">Transport Options</h2>
                <p> {tripData?.tripData?.transport?.modesOfTransport} </p>
{/* 
                Other Relevant Info */}
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mt-5 mb-4">Other Relevant Info</h2>
                        <ul>
                            <li>Mobile Phone Connectivity: {tripData?.tripData?.simConnectivity?.simCardProviders}</li>
                            <li className="mt-2">Packing suggestions: {tripData?.tripData?.packing?.packingSuggestions}</li>
                            <li className="mt-2">{tripData?.tripData?.otherInformation?.importantInformation}</li>
                        </ul>
            </div>
        </div>
    );
}

export default InfoSection;
