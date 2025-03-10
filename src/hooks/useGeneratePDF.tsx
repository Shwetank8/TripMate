import jsPDF from "jspdf";

export const useGeneratePDF = (jsonData: any) => {
  const generatePDF = () => {
    if (!jsonData?.tripData) {
      console.error("Invalid data structure");
      return;
    }

    const { tripData } = jsonData;
    const {
      destination, days, budget, groupSize, hotels, restaurants,
      itinerary, visa, transport, packing, currency,
      simConnectivity, otherInformation, weather
    } = tripData;

    const doc = new jsPDF();
    let yPos = 20; // Start with more margin at top
    const lineSpacing = 8;
    const sectionSpacing = 12;
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 10;
    const textWidth = pageWidth - (margin * 2);

    // Helper function to add text with word wrapping
    const addWrappedText = (text: string, x: number, y: number, indent: number = 0) => {
      const splitText = doc.splitTextToSize(text, textWidth - indent);
      doc.text(splitText, x + indent, y);
      return splitText.length * lineSpacing; // Return the height used
    };

    // Helper function to check if we need a new page
    const checkPageBreak = (neededSpace: number) => {
      const pageHeight = doc.internal.pageSize.getHeight();
      if (yPos + neededSpace > pageHeight - margin) {
        doc.addPage();
        yPos = 20; // Reset position on new page
        return true;
      }
      return false;
    };

    // Helper function to add a section title
    const addSection = (title: string) => {
      checkPageBreak(sectionSpacing * 2);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.text(title, margin, yPos);
      yPos += sectionSpacing;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
    };

    // Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text(`Trip Plan: ${destination}`, margin, yPos);
    yPos += 16;

    // Basic Trip Details
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    
    yPos += addWrappedText(`Duration: ${days} days`, margin, yPos);
    yPos += lineSpacing;
    
    yPos += addWrappedText(`Budget: ${budget}`, margin, yPos);
    yPos += lineSpacing;
    
    yPos += addWrappedText(`Group Size: ${groupSize}`, margin, yPos);
    yPos += sectionSpacing;

    // Visa Information
    addSection("Visa Information");
    
    yPos += addWrappedText(`Requirements: ${visa.visaRequirements}`, margin, yPos);
    yPos += lineSpacing;
    
    yPos += addWrappedText(`Process: ${visa.visaProcess}`, margin, yPos);
    yPos += lineSpacing;
    
    yPos += addWrappedText(`Documents Required: ${visa.documentsRequired}`, margin, yPos);
    yPos += sectionSpacing;

    // Transport
    addSection("Transport Information");
    yPos += addWrappedText(transport.modesOfTransport, margin, yPos);
    yPos += sectionSpacing;

    // Packing
    addSection("Packing Suggestions");
    yPos += addWrappedText(packing.packingSuggestions, margin, yPos);
    yPos += sectionSpacing;

    // Currency Exchange
    addSection("Currency Exchange Rates");
    
    if (currency && currency.localCurrencyValue) {
      Object.entries(currency.localCurrencyValue).forEach(([key, value], index) => {
        const currencyText = `${index + 1}. ${key}: ${value}`;
        checkPageBreak(lineSpacing);
        yPos += addWrappedText(currencyText, margin, yPos);
      });
    } else {
      yPos += addWrappedText("No currency information available", margin, yPos);
    }
    yPos += sectionSpacing;

    // SIM Connectivity
    addSection("SIM Connectivity");
    
    if (simConnectivity) {
      yPos += addWrappedText(`Providers: ${simConnectivity.simCardProviders}`, margin, yPos);
      yPos += lineSpacing;
      
      yPos += addWrappedText(`Cost: ${simConnectivity.simCardCost}`, margin, yPos);
    } else {
      yPos += addWrappedText("No SIM connectivity information available", margin, yPos);
    }
    yPos += sectionSpacing;

    // Other Important Information
    addSection("Other Important Information");
    
    if (otherInformation && otherInformation.importantInformation) {
      yPos += addWrappedText(otherInformation.importantInformation, margin, yPos);
    } else {
      yPos += addWrappedText("No additional information available", margin, yPos);
    }
    yPos += sectionSpacing;

    // Weather Information
    addSection("Weather Information");
    
    if (weather) {
      yPos += addWrappedText(`Best Time to Visit: ${weather.bestTimeToVisit}`, margin, yPos);
      yPos += lineSpacing;
      
      yPos += addWrappedText(`Weather Conditions: ${weather.weatherConditions}`, margin, yPos);
    } else {
      yPos += addWrappedText("No weather information available", margin, yPos);
    }
    yPos += sectionSpacing;

    // Itinerary - Start on a new page
    doc.addPage();
    yPos = 20;

    // Itinerary
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Itinerary", margin, yPos);
    yPos += 12;
    doc.setFontSize(12);

    if (Array.isArray(itinerary) && itinerary.length > 0) {
      itinerary.forEach((day: any) => {
        checkPageBreak(sectionSpacing * 2);
        
        doc.setFont("helvetica", "bold");
        doc.text(`Day ${day.day}: ${day.date || ""}`, margin, yPos);
        yPos += lineSpacing + 2;
        doc.setFont("helvetica", "normal");

        if (Array.isArray(day.placesToVisit) && day.placesToVisit.length > 0) {
          day.placesToVisit.forEach((place: any, index: number) => {
            checkPageBreak(sectionSpacing * 3);
            
            const placeText = `${index + 1}. ${place.placeName} ${place.placeDescription ? `- ${place.placeDescription}` : ""}`;
            yPos += addWrappedText(placeText, margin, yPos, 0);
            yPos += lineSpacing;
            
            if (place.placeLocation) {
              yPos += addWrappedText(`Location: ${place.placeLocation}`, margin, yPos, 5);
              yPos += lineSpacing;
            }
            
            if (place.openingTime) {
              yPos += addWrappedText(`Opening Time: ${place.openingTime}`, margin, yPos, 5);
              yPos += lineSpacing;
            }
            
            yPos += 4; // Add a bit of space between places
          });
        } else {
          yPos += addWrappedText("No places scheduled for this day", margin, yPos, 5);
        }
        yPos += sectionSpacing; // Space between days
      });
    } else {
      yPos += addWrappedText("No itinerary available", margin, yPos);
    }
    yPos += sectionSpacing;

    // Hotels
    checkPageBreak(sectionSpacing * 2);
    addSection("Hotels");
    
    if (Array.isArray(hotels) && hotels.length > 0) {
      hotels.forEach((hotel, index) => {
        checkPageBreak(sectionSpacing * 3);
        
        doc.setFont("helvetica", "bold");
        yPos += addWrappedText(`${index + 1}. ${hotel.hotelName}`, margin, yPos);
        yPos += lineSpacing;
        doc.setFont("helvetica", "normal");
        
        if (hotel.hotelLocation) {
          yPos += addWrappedText(`Location: ${hotel.hotelLocation}`, margin, yPos, 5);
          yPos += lineSpacing;
        }
        
        if (hotel.hotelPrice) {
          yPos += addWrappedText(`Price: ${hotel.hotelPrice}`, margin, yPos, 5);
          yPos += lineSpacing;
        }
        
        if (hotel.hotelRating) {
          yPos += addWrappedText(`Rating: ${hotel.hotelRating}`, margin, yPos, 5);
          yPos += lineSpacing;
        }
        
        if (hotel.hotelAmenities) {
          yPos += addWrappedText(`Amenities: ${hotel.hotelAmenities}`, margin, yPos, 5);
        }
        
        yPos += sectionSpacing; // Space between hotels
      });
    } else {
      yPos += addWrappedText("No hotels available", margin, yPos);
    }
    yPos += sectionSpacing;

    // Restaurants
    checkPageBreak(sectionSpacing * 2);
    addSection("Recommended Restaurants");
    
    if (Array.isArray(restaurants) && restaurants.length > 0) {
      restaurants.forEach((restaurant, index) => {
        checkPageBreak(sectionSpacing * 3);
        
        doc.setFont("helvetica", "bold");
        yPos += addWrappedText(`${index + 1}. ${restaurant.restaurantName}`, margin, yPos);
        yPos += lineSpacing;
        doc.setFont("helvetica", "normal");
        
        if (restaurant.restaurantLocation) {
          yPos += addWrappedText(`Location: ${restaurant.restaurantLocation}`, margin, yPos, 5);
          yPos += lineSpacing;
        }
        
        if (restaurant.restaurantCuisine) {
          yPos += addWrappedText(`Cuisine: ${restaurant.restaurantCuisine}`, margin, yPos, 5);
          yPos += lineSpacing;
        }
        
        if (restaurant.averageCostPerMeal) {
          yPos += addWrappedText(`Average Cost per Meal: ${restaurant.averageCostPerMeal}`, margin, yPos, 5);
        }
        
        yPos += sectionSpacing; // Space between restaurants
      });
    } else {
      yPos += addWrappedText("No restaurants available", margin, yPos);
    }

    // Add page numbers
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.text(`Page ${i} of ${pageCount}`, pageWidth - 30, doc.internal.pageSize.getHeight() - 10);
    }

    doc.save("TripPlan.pdf");
  };

  return { generatePDF };
};

export default useGeneratePDF;