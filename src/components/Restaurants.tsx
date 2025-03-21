
import RestaurantCard from "./RestaurantCard"

function Restaurants({ tripData }: { tripData: any }) {
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
            <path d="M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16"></path>
            <path d="M1 21h22"></path>
            <path d="M7 10.5a2.5 2.5 0 0 1 5 0v.5"></path>
            <path d="M12 11a2.5 2.5 0 0 1 5 0v.5"></path>
          </svg>
        </span>
        Food Reccomendations
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tripData?.tripData?.restaurants.map((restaurant: any, index: number) => (
          <RestaurantCard key={index} restaurants={restaurant} />
        ))}
      </div>
    </div>
  )
}

export default Restaurants

