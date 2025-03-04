import { useEffect, useRef, useState } from "react";
import Choices from "choices.js";

const GooglePlacesAutocomplete = ({ onPlaceSelected }) => {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const autocompleteServiceRef = useRef(null);
  const placesServiceRef = useRef(null);
  const choicesInstanceRef = useRef(null);

  useEffect(() => {
    if (!window.google) return;
    autocompleteServiceRef.current = new google.maps.places.AutocompleteService();
    placesServiceRef.current = new google.maps.places.PlacesService(
      document.createElement("div")
    );

    choicesInstanceRef.current = new Choices("#choices-user-location", {
      paste: false,
      allowHTML: true,
      duplicateItemsAllowed: false,
      editItems: true,
      placeholder: true,
      placeholderValue: "Your location",
    });

    document.querySelector("#choices-user-location").addEventListener("change", (event) => {
      const placeId = event.target.value;
      if (placeId) {
        handleSelectChange(placeId);
      }
    });
  }, []);

  const handleInputChange = (inputValue) => {
    if (!inputValue || !autocompleteServiceRef.current) return;

    autocompleteServiceRef.current.getPlacePredictions(
      { input: inputValue },
      (predictions, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          const choices = predictions.map((prediction) => ({
            value: prediction.place_id,
            label: prediction.description,
          }));
          
          if (choicesInstanceRef.current) {
            choicesInstanceRef.current.clearStore();
            choicesInstanceRef.current.setChoices(choices, "value", "label", true);
          }
        }
      }
    );
  };

  const handleSelectChange = (placeId) => {
    if (!placeId || !placesServiceRef.current) return;
    
    placesServiceRef.current.getDetails(
      { placeId },
      (result, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          setSelectedPlace(result);
          let accuracy = 0;
          if (result.geometry.viewport) {
            const bounds = result.geometry.viewport;
            const latDiff = bounds.getNorthEast().lat() - bounds.getSouthWest().lat();
            const lngDiff = bounds.getNorthEast().lng() - bounds.getSouthWest().lng();
            accuracy = Math.max(latDiff, lngDiff) * 111000;
          }

          onPlaceSelected({
            name: result.name,
            latitude: result.geometry.location.lat(),
            longitude: result.geometry.location.lng(),
            accuracy,
          });
        }
      }
    );
  };

  return (
    <div className="form-group mb-3 search-location">
      <select className="form-control" id="choices-user-location">
        <option value="">Your location</option>
      </select>
    </div>
  );
};

export default GooglePlacesAutocomplete;
