function InfoSection({ tripData }: { tripData: any }) {
    const destination = tripData?.userInput?.destination || ""
    const formattedDestination = destination.charAt(0).toUpperCase() + destination.slice(1)
  
    const travellerType = tripData?.userInput?.people || "default"
    const travellerImages: Record<string, string> = {
      "Just me": "/solo.jpg",
      Couple: "/couple.jpg",
      Family: "/family.jpeg",
      "Family/Frineds": "/frnds.jpg",
      default: "/placeholder.png",
    }
  
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md transition-all">
        <div className="relative w-full h-[340px] overflow-hidden rounded-xl mb-6">
          <img
            src={travellerImages[travellerType] || "/placeholder.svg"}
            alt={formattedDestination}
            className="w-full h-full object-fill rounded-xl transition-transform hover:scale-105 duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-xl"></div>
          <div className="absolute bottom-0 left-0 p-6">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{formattedDestination}</h1>
            <div className="flex flex-wrap gap-3">
              <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium">
                {tripData?.userInput?.days} days
              </span>
              <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium">
                {tripData?.userInput?.budget}
              </span>
              <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium">
                {tripData?.userInput?.people}
              </span>
            </div>
          </div>
        </div>
  
        <div className="prose dark:prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Trip Overview</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Explore the beautiful {formattedDestination} with this {tripData?.userInput?.days}-day itinerary designed for{" "}
            {tripData?.userInput?.people} with a {tripData?.userInput?.budget} budget.
          </p>
        </div>
      </div>
    )
  }
  
  export default InfoSection
  
  