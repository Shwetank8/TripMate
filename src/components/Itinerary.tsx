import ItineraryCard from "./ItineraryCard";

function Itinerary({ tripData }: { tripData: any }) {
    return (
        <div>
            <h2 className="font-bold text-xl mb-5 mt-10">Itinerary</h2>

            <div className="space-y-6"> {/* Spacing between days */}
                {tripData?.tripData?.itinerary?.map((item: any, dayIndex: number) => (
                    <div key={dayIndex}>
                        <h2 className="font-semibold text-lg mb-3">Day {item.day}</h2>

                        {/* Smaller Card Size Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {item?.placesToVisit.map((place: any, index: number) => (
                                <div key={index} className="w-[250px] mx-auto">
                                    <ItineraryCard place={place} />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Itinerary;
