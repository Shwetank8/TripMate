import ItineraryCard from "./ItineraryCard"

function Itinerary({ tripData }: { tripData: any }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md mt-8 transition-all">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
        <span className="w-8 h-8 bg-[#f56551] rounded-full mr-3 flex items-center justify-center text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
          </svg>
        </span>
        Your Day-by-Day Itinerary
      </h2>

      <div className="space-y-10">
        {tripData?.tripData?.itinerary?.map((item: any, dayIndex: number) => (
          <div key={dayIndex} className="relative">
            {/* Day indicator with vertical line */}
            <div className="flex items-center mb-6">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#f56551]/10 text-[#f56551] font-bold border-2 border-[#f56551] z-10">
                {item.day}
              </div>
              <div className="h-0.5 flex-grow ml-4 bg-gradient-to-r from-[#f56551] to-transparent"></div>
            </div>

            {/* Places grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {item?.placesToVisit.map((place: any, index: number) => (
                <ItineraryCard key={index} place={place} />
              ))}
            </div>

            {/* Vertical timeline line (except for last item) */}
            {dayIndex < tripData?.tripData?.itinerary.length - 1 && (
              <div className="absolute left-5 top-10 w-0.5 h-[calc(100%+2rem)] bg-gray-200 dark:bg-gray-700 -z-10"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Itinerary

