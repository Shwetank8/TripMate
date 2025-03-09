import { Clock, MapPin, ExternalLink } from "lucide-react"

function ItineraryCard({ place }: { place: any }) {
  return (
    <a
      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place?.placeName + "," + place?.placeLocation)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="block h-full"
    >
      <div className="bg-white dark:bg-gray-700 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:translate-y-[-5px] h-full flex flex-col">
        {/* Card Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src="/itinerary.png"
            alt={place.placeName}
            className="w-full h-full object-fill transition-transform duration-500 hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70"></div>
          <div className="absolute bottom-0 left-0 p-4">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#f56551] text-white">
              <Clock className="w-3 h-3 mr-1" />
              {place?.openingTime}
            </span>
          </div>
        </div>

        {/* Card Content */}
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2 line-clamp-1">{place.placeName}</h3>

          <div className="flex items-start mb-3">
            <MapPin className="w-4 h-4 text-[#f56551] mt-0.5 flex-shrink-0" />
            <span className="ml-1.5 text-sm text-gray-500 dark:text-gray-300 line-clamp-1">
              {place?.placeLocation || "Location unavailable"}
            </span>
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 mb-4 flex-grow">
            {place?.placeDescription}
          </p>

          <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100 dark:border-gray-600">
            <span className="text-xs text-gray-500 dark:text-gray-400">Recommended visit</span>
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

export default ItineraryCard

