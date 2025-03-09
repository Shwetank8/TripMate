import { Link } from "react-router-dom";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "./ui/card";
import { Clock } from "lucide-react";

function ItineraryCard({ place }: { place: any }) {
    return (
        <Link
            to={"https://www.google.com/maps/search/?api=1&query=" + place?.placeName + "," + place?.placeLocation}
            target="_blank"
        >
            <Card className="flex flex-col flex-grow p-4 shadow-md rounded-lg w-full hover:scale-105 transition-all">
                <CardHeader className="p-0">
                    <img src="/itinerary.png" />
                    <CardTitle className="text-base font-semibold">{place.placeName}</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <CardDescription className="text-sm text-gray-500 line-clamp-2">
                        {place?.placeDescription}
                    </CardDescription>
                </CardContent>
                <CardFooter className="flex items-center gap-2 text-sm text-gray-700">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <p>{place?.openingTime}</p>
                </CardFooter>
            </Card>
        </Link>
    );
}

export default ItineraryCard;
