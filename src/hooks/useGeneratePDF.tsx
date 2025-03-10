import jsPDF from "jspdf";

export const useGeneratePDF = (jsonData: any) => {
  const generatePDF = () => {
    if (!jsonData?.tripData) {
      console.error("Invalid data structure");
      return;
    }

    const { tripData } = jsonData;
    const { destination, groupSize, budget, itinerary, hotels, restaurants } = tripData;

    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.text(`Trip Plan: ${destination}`, 10, 10);
    doc.setFontSize(12);
    doc.text(`Group Size: ${groupSize}`, 10, 20);
    doc.text(`Budget: ${budget}`, 10, 30);
    doc.text("Itinerary:", 10, 40);

    let yPos = 50;

    if (Array.isArray(itinerary)) {
      itinerary.forEach((day: any) => {
        doc.setFont("helvetica", "bold");
        doc.text(`Day ${day.day}:`, 10, yPos);
        yPos += 8;

        if (Array.isArray(day.placesToVisit) && day.placesToVisit.length > 0) {
          day.placesToVisit.forEach((place: any, placeIndex: number) => {
            doc.setFont("helvetica", "normal");
            doc.text(
              `${placeIndex + 1}. ${place.placeName} - ${place.placeDescription} (${place.openingTime || "N/A"})`,
              15,
              yPos
            );
            yPos += 6;
          });
        } else {
          doc.text("No places available", 15, yPos);
          yPos += 6;
        }

        yPos += 4;
      });
    } else {
      doc.text("No itinerary available", 15, yPos);
      yPos += 6;
    }

    doc.addPage();
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Hotels:", 10, 20);
    yPos = 30;

    if (Array.isArray(hotels) && hotels.length > 0) {
      hotels.forEach((hotel: any, index: number) => {
        doc.setFont("helvetica", "normal");
        doc.text(`${index + 1}. ${hotel.hotelName}`, 10, yPos);
        doc.setFont("helvetica", "normal");
        doc.text(`Location: ${hotel.hotelLocation}`, 15, yPos + 6);
        doc.text(`Price: ${hotel.hotelPrice}`, 15, yPos + 12);
        doc.text(`Rating: ${hotel.hotelRating}`, 15, yPos + 18);
        yPos += 30;
      });
    } else {
      doc.text("No hotels available", 10, yPos);
      yPos += 10;
    }

    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Recommended Restaurants:", 10, yPos);
    yPos += 10;

    if (Array.isArray(restaurants) && restaurants.length > 0) {
      restaurants.forEach((restaurant: any, index: number) => {
        doc.setFont("helvetica", "normal");
        doc.text(`${index + 1}. ${restaurant.restaurantName}`, 10, yPos);
        doc.setFont("helvetica", "normal");
        doc.text(`Location: ${restaurant.restaurantLocation}`, 15, yPos + 6);
        doc.text(`Average Cost per Meal: ${restaurant.averageCostPerMeal}`, 15, yPos + 12);
        doc.text(`Cuisine: ${restaurant.restaurantCuisine}`, 15, yPos + 18);
        yPos += 30;
      });
    } else {
      doc.text("No restaurants available", 10, yPos);
    }

    doc.save("TripPlan.pdf");
  };

  return { generatePDF };
};

export default useGeneratePDF;
