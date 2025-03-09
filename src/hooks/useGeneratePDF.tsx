import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const useGeneratePDF = (jsonData: any) => {
  const generatePDF = () => {
    if (!jsonData?.tripData) {
      console.error("Invalid data structure");
      return;
    }

    const { tripData } = jsonData;
    const { destination, groupSize, budget, itinerary, hotels } = tripData;

    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.text(`Trip Plan: ${destination}`, 10, 10);
    doc.setFontSize(12);
    doc.text(`Group Size: ${groupSize}`, 10, 20);
    doc.text(`Budget: ${budget}`, 10, 30);
    doc.text("Itinerary:", 10, 40);

    let yPos = 50; // Start position for itinerary text

    // Ensure itinerary exists before looping
    if (Array.isArray(itinerary)) {
      itinerary.forEach((day: any, index: number) => {
        doc.setFont("helvetica", "bold");
        doc.text(`Day ${day.day}:`, 10, yPos);
        yPos += 8; // Move down for placesToVisit

        if (Array.isArray(day.placesToVisit) && day.placesToVisit.length > 0) {
          day.placesToVisit.forEach((place: any, placeIndex: number) => {
            doc.setFont("helvetica", "normal");
            doc.text(
              `${placeIndex + 1}. ${place.placeName} - ${place.placeDescription} (${place.openingTime || "N/A"})`,
              15,
              yPos
            );
            yPos += 6; // Move down for next entry
          });
        } else {
          doc.text("No places available", 15, yPos);
          yPos += 6;
        }

        yPos += 4; // Extra spacing before the next day
      });
    } else {
      doc.text("No itinerary available", 15, yPos);
    }

    // Add a new page for hotels if needed
    doc.addPage();
    doc.setFontSize(16);
    doc.text("Hotels:", 10, 20);

    if (Array.isArray(hotels) && hotels.length > 0) {
      autoTable(doc, {
        startY: 30,
        head: [["Name", "Location", "Price", "Rating"]],
        body: hotels.map((hotel: any) => [
          hotel.hotelName,
          hotel.hotelLocation,
          hotel.hotelPrice,
          hotel.hotelRating,
        ]),
      });
    } else {
      doc.text("No hotels available", 10, 40);
    }

    doc.save("TripPlan.pdf");
  };

  return { generatePDF };
};
export default useGeneratePDF;  