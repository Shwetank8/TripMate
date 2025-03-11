import useGeneratePDF from "../hooks/useGeneratePDF";
import { Download, MapPin, Umbrella, StampIcon as Passport, Bus, Calendar, PersonStanding, Car, Phone, Luggage, Info } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

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
            <div className="sm:mt-6 flex flex-col gap-2">
                <h2 className="text-2xl font-bold">
                    {formattedDestination}
                </h2>
                <div className="flex flex-col sm:flex-row gap-5 justify-between items-start sm:items-center">
                    <div className="flex flex-wrap gap-2">
                        <div className=" px-3 py-1 sm:py-2 w-auto rounded-full flex items-center gap-2 border-2 border-[#f56551] text-black dark:text-white text-sm">
                            <Calendar className="w-3.5 h-3.5 mr-1" />{tripData?.userInput?.days} days
                        </div>
                        <div className="px-3 py-1 sm:py-2 w-auto rounded-full flex items-center gap-2 border-2 border-[#f56551] text-black dark:text-white text-sm">
                            <MapPin className="w-3.5 h-3.5 mr-1" />   Budget: {tripData?.userInput?.budget}
                        </div>
                        <div className="px-3 py-1 sm:py-2 w-auto rounded-full flex items-center gap-2 border-2 border-[#f56551] text-black dark:text-white text-sm">
                            <Car className="w-3.5 h-3.5 mr-1" />{tripData?.userInput?.people}
                        </div>
                    </div>
                    <button
                        onClick={() => generatePDF()}
                        className="text-[#f56551] cursor-pointer flex gap-2 items-center mt-3 sm:mt-0"
                    >
                        Download Trip PDF
                        <Download />
                    </button>
                </div>


            </div>



            <div className="prose dark:prose-invert max-w-none mt-6 space-y-4 items-center grid">
                {/* Trip Overview Section */}
                <Card className="bg-[#fff] dark:bg-gray-700  border-0">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold flex items-center ">
                            <MapPin className="w-5 h-5 mr-2 text-rose-400" />
                            Trip Overview
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-gray-600 dark:text-gray-300">
                            Explore the beautiful {formattedDestination} with this {tripData?.userInput?.days}-day itinerary designed for{" "}
                            {tripData?.userInput?.people} with a {tripData?.userInput?.budget} budget.
                        </p>
                    </CardContent>
                </Card>
                {/* Weather Overview Section */}
                <Card className="bg-[#fff] dark:bg-gray-700  border-0 ">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold flex items-center ">
                            <Umbrella className="w-5 h-5 mr-2 text-rose-400" />
                            Weather Overview
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-gray-600 dark:text-gray-300">
                            {tripData?.tripData?.weather?.weatherConditions}
                        </p>
                        <h3 className="text-md font-bold text-gray-800 dark:text-white mt-2 mb-4">
                            Best Time to Visit:
                            <span className="text-gray-600 dark:text-gray-300">
                                {tripData?.tripData?.weather?.bestTimeToVisit}
                            </span>
                        </h3>
                    </CardContent>
                </Card>
                {/* Visa Details */}
                <Card className="bg-[#fff] dark:bg-gray-700  border-0 ">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold flex items-center ">
                            <Passport className="w-5 h-5 mr-2 text-rose-400" />
                            Visa Overview
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-gray-600 dark:text-gray-300">
                            Requirements: {tripData?.tripData?.visa?.visaRequirements}
                        </p>
                        <p className="mt-4">
                            Process: {tripData?.tripData?.visa?.visaProcess}
                        </p>
                        <p className="mt-4">
                            Documents Required: {tripData?.tripData?.visa?.documentsRequired}
                        </p>
                    </CardContent>
                </Card>

                {/* Transport */}
                <Card className="bg-[#fff] dark:bg-gray-700  border-0 ">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold flex items-center ">
                            <Bus className="w-5 h-5 mr-2 text-rose-400" />
                            Transport Options
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-gray-600 dark:text-gray-300">
                            Requirements: {tripData?.tripData?.visa?.visaRequirements}
                        </p>
                        <p className="mt-4">
                            Process: {tripData?.tripData?.visa?.visaProcess}
                        </p>
                        <p className="mt-4">
                            Documents Required: {tripData?.tripData?.visa?.documentsRequired}
                        </p>
                    </CardContent>
                </Card>
                {/* Other Relevant Info */}
                <Card className="bg-[#fff] dark:bg-gray-700  border-0 ">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold flex items-center ">
                            <PersonStanding className="w-5 h-5 mr-2 text-rose-400" />
                            Other Relevant Info
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <ul className=" sm:space-y-5 list-disc list-inside">
                            <li className="mt-2 flex gap-6"> <Phone className="hidden sm:size-4 sm:flex"/> Mobile Phone Connectivity: {tripData?.tripData?.simConnectivity?.simCardProviders}</li>
                            <li className="mt-2 flex gap-6"> <Luggage className="hidden sm:size-7 sm:flex"/> Packing suggestions: {tripData?.tripData?.packing?.packingSuggestions}</li>
                            <li className="mt-2 flex gap-6"> <Info className="hidden sm:size-4 sm:flex"/>  {tripData?.tripData?.otherInformation?.importantInformation}</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>

        </div>
    );
}

export default InfoSection;

