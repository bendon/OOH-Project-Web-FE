import { useEffect, useRef, useState } from "react";
import Choices from "choices.js";
import { Loader } from "@googlemaps/js-api-loader";
import "choices.js/public/assets/styles/choices.css";

const GooglePlacesAutocomplete = ({onPlaceSelected}) => {
  const selectRef = useRef(null);
  const choicesInstance = useRef(null);
  const [placesService, setPlacesService] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [preciseLocation, setPreciseLocation] = useState([]);
  let loader = null
  const [loadedChoice, setLoadedChoice] = useState(false);

  useEffect(() => {
    if (choicesInstance.current) {
      choicesInstance.current.destroy();
  }
   
    choicesInstance.current = new Choices(selectRef.current, {
      removeItemButton: true,
      placeholder: true,
      searchEnabled: true,
      paste: false,
      allowHTML: true,
      duplicateItemsAllowed: false,
      editItems: true,
      placeholderValue: "Search for a location",
      searchPlaceholderValue: "Search for a location",

    });
    setLoadedChoice(true)
  }, [])

  const startLoader = () => {
    if (!loader)
    {
      loader = new Loader({
        apiKey: import.meta.env.VITE_GOOGLE_MAP_KEY, // Replace with your API key
        version: "weekly",
        libraries: ["places"],
      });
    }
    
  }

  useEffect(() => {

    setTimeout(() => {
      startLoader()
       
      if (loadedChoice) {
        initializeMapSelect()
      }
    }, 2000);
    
  }, [loadedChoice]);


  const initializeMapSelect = async () => {
    if (!loader) return;

    try {
        // Load Maps and Places libraries
        const [maps, places] = await Promise.all([
            loader.importLibrary("maps"),
            loader.importLibrary("places") // ✅ Load the places library correctly
        ]);

        console.log("Google Maps API Loaded");

        // set center of the map

      

        if (!places) {
            console.error("Google Places library failed to load");
            return;
        }

        // ✅ Ensure `AutocompleteService` is accessed properly
        const autocompleteService = new google.maps.places.AutocompleteService();

        const inputElement = document.querySelector('div.search_location input[type="search"]');


        if (inputElement) {
            inputElement.addEventListener("keyup", (event) => {
                const searchQuery = event.target.value;
                getPredictions(searchQuery);
            });
        }

        const getPredictions = (input) => {
            if (!input) return;

            autocompleteService.getPlacePredictions({ input }, (predictions, status) => {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    setPreciseLocation(predictions);
                    updateChoices(predictions);
                } else {
                    setPreciseLocation([]);
                }
            });
        };

        const updateChoices = (predictions) => {
            const choices = predictions.map((prediction) => ({
                value: prediction.place_id,
                label: prediction.description,
            }));

            if (choicesInstance.current) {
                choicesInstance.current.clearStore(); // Clear previous options
                choicesInstance.current.setChoices(choices); // Add new location options
            }
        };
    } catch (error) {
        console.error("Error loading Google Maps API:", error);
    }
};

const selectPlace = (event) => {
  if (!loader){
    startLoader()
  }
  const placeValue = event.target.value;

  loader.importLibrary("places").then(() => {
    const service = new google.maps.places.PlacesService(document.createElement('div'));
    // Request details by place_id
    service.getDetails({ placeId: placeValue }, (result, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        setPlacesService(result); // Store the detailed result

        // Calculate an approximate accuracy based on the viewport (if available)
        let accuracy = 0;
        let boundaryCoords = [];
        if (result.geometry.viewport) {
          const bounds = result.geometry.viewport;
          const latDiff = bounds.getNorthEast().lat() - bounds.getSouthWest().lat();
          const lngDiff = bounds.getNorthEast().lng() - bounds.getSouthWest().lng();

          // Approximate accuracy as the average distance of the bounding box (in meters)
          accuracy = Math.max(latDiff, lngDiff) * 111000; // Roughly converting degrees to meters

           boundaryCoords = [
            { lat: bounds.getSouthWest().lat(), lng: bounds.getSouthWest().lng() },
            { lat: bounds.getSouthWest().lat(), lng: bounds.getNorthEast().lng() },
            { lat: bounds.getNorthEast().lat(), lng: bounds.getNorthEast().lng() },
            { lat: bounds.getNorthEast().lat(), lng: bounds.getSouthWest().lng() },
          ];
        }


        const payload = {
          name: result.name,
          latitude: result.geometry.location.lat(),
          longitude: result.geometry.location.lng(),
          accuracy: accuracy,
          boundaryCoords: boundaryCoords,
        };
        onPlaceSelected(payload);
        
        // emit('place-selected', {
        //   name : result.name,
        //   latitude : result.geometry.location.lat(),
        //   longitude : result.geometry.location.lng(),
        //   accuracy : accuracy
        // })
      }
    });
  });
  
}


  return (
    <div className="search_location">
      <select ref={selectRef} data-trigger onChange={selectPlace} name="search_location" id="choices-user-location"></select>
    </div>
  );
};

export default GooglePlacesAutocomplete;
