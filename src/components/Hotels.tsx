import HotelCard from "./HotelCard";

function Hotels({tripData}:{tripData:any}){
    return (
        <div>
            <h2 className="font-bold text-xl mt-5 mb-5">Hotel Recommendations</h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {tripData?.tripData?.hotels.map((hotel:any,index:number) => (
                    <div key={index}>
                        <HotelCard hotel={hotel} />
                    </div>
                ))}
            </div>
        </div>
    )
}
export default Hotels;












