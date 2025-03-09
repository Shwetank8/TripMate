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

function HotelCard({ hotel }: { hotel: any }) {
    return (
        <Link
            to={"https://www.google.com/maps/search/?api=1&query=" + hotel?.hotelName + "," + hotel?.hotelLocation} 
            target="_blank"
            className="block" // Ensure the Link behaves as a block element
        >
            <Card className="flex flex-col flex-grow p-4 shadow-md rounded-lg w-full hover:scale-105 transition-all">
                {/* Card Header */}
                <CardHeader className="p-0 mb-2">
                    <img 
                        src="/hotel.jpeg" 
                        alt={hotel?.hotelName} 
                        className="w-full h-48 object-cover rounded-lg" 
                    />
                    <CardTitle className="text-lg font-semibold mt-2">
                        {hotel?.hotelName}
                    </CardTitle>
                </CardHeader>

                {/* Card Content */}
                <CardContent className="p-0 mb-2">
                    <CardDescription className="text-sm text-gray-500">
                        <p className="mb-1">{hotel?.hotelLocation}</p>
                        <p className="text-yellow-500">Rating: {hotel?.hotelRating}</p>
                    </CardDescription>
                </CardContent>

                {/* Card Footer */}
                <CardFooter className="flex flex-col items-start text-sm text-gray-700 p-0">
                    <p className="text-gray-600 mb-2">{hotel?.hotelAmenities}</p>
                    <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <p className="text-gray-600">{hotel?.hotelPrice}</p>
                    </div>
                </CardFooter>
            </Card>
        </Link>
    );
}

export default HotelCard;