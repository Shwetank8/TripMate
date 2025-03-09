import { MapPin, Star, Wifi, Coffee, Utensils, ExternalLink } from "lucide-react"

function HotelCard({ hotel }: { hotel: any }) {
  // Extract amenities into an array for better display
  const amenitiesArray = hotel?.hotelAmenities?.split(",").map((item: string) => item.trim()) || []

  // Function to get appropriate icon for amenity
  const getAmenityIcon = (amenity: string) => {
    const lowerAmenity = amenity.toLowerCase()
    if (lowerAmenity.includes("wifi")) return <Wifi className="w-3 h-3" />
    if (lowerAmenity.includes("breakfast")) return <Coffee className="w-3 h-3" />
    if (lowerAmenity.includes("restaurant")) return <Utensils className="w-3 h-3" />
    return null
  }

  return (
    <a
      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel?.hotelName + "," + hotel?.hotelLocation)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="block h-full"
    >
      <div className="bg-white dark:bg-gray-700 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:translate-y-[-5px] h-full flex flex-col">
        {/* Card Image with price badge */}
        <div className="relative h-48 overflow-hidden">
          <img
            src="/hotel.jpeg"
            alt={hotel?.hotelName}
            className="w-full h-full object-fill transition-transform duration-500 hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70"></div>
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-white dark:bg-gray-800 text-[#f56551]">
              {hotel?.hotelPrice}
            </span>
          </div>
        </div>

        {/* Card Content */}
        <div className="p-4 flex flex-col flex-grow">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white line-clamp-1">{hotel?.hotelName}</h3>
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-400" />
              <span className="ml-1 text-sm font-medium text-gray-700 dark:text-gray-200">{hotel?.hotelRating}</span>
            </div>
          </div>

          <div className="flex items-start mb-3">
            <MapPin className="w-4 h-4 text-[#f56551] mt-0.5 flex-shrink-0" />
            <span className="ml-1.5 text-sm text-gray-500 dark:text-gray-300 line-clamp-1">{hotel?.hotelLocation}</span>
          </div>

          {/* Amenities */}
          <div className="flex flex-wrap gap-2 mb-4">
            {amenitiesArray.slice(0, 3).map((amenity: string, index: number) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-200"
              >
                {getAmenityIcon(amenity)}
                <span className="ml-1">{amenity}</span>
              </span>
            ))}
            {amenitiesArray.length > 3 && (
              <span className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-200">
                +{amenitiesArray.length - 3} more
              </span>
            )}
          </div>

          <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100 dark:border-gray-600">
            <span className="text-xs text-gray-500 dark:text-gray-400">Recommended stay</span>
            <span className="inline-flex items-center text-xs font-medium text-[#f56551]">
              View on map
              <ExternalLink className="w-3 h-3 ml-1" />
            </span>
          </div>
        </div>
      </div>
    </a>
  )
}

export default HotelCard

