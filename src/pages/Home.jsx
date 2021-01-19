import React, { Component, useState } from "react";
import { GoogleMap, LoadScript, Marker,Polyline } from "@react-google-maps/api";
import { useGeolocation } from "react-use";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

const Home = () => {
  const options = {
    strokeColor: "#ffffff",
    strokeOpacity: 0.8,
    strokeWeight: 5,
    fillColor: "#FF0000",
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: 30000,
    paths: [
      { lat: 37.772, lng: -122.214 },
      { lat: 21.291, lng: -157.821 },
      { lat: -18.142, lng: 178.431 },
      { lat: -27.467, lng: 153.027 },
    ],
    zIndex: 1,
  };
  const paths = [
    { lat: 37.772, lng: -122.214 },
    { lat: 21.291, lng: -157.821 },
    { lat: -18.142, lng: 178.431 },
    { lat: -27.467, lng: 153.027 },
  ]
  const { loading, latitude, longitude } = useGeolocation();
  const [markers, setMarkers] = useState([]);
  const addMarkers = (e) => {
    const locations = JSON.parse(JSON.stringify(e.latLng));
    let temp = [...markers];
    temp.push(locations );
    setMarkers(temp);
    console.log(markers);
  };
  return loading == false ? (
    <div className="h-screen">
      <LoadScript googleMapsApiKey="AIzaSyChYudLMSXsW96r-zFnQocooSUVt9nop0Y">
        <GoogleMap
          onClick={addMarkers}
          mapContainerStyle={containerStyle}
          center={{ lat: latitude, lng: longitude }}
          zoom={10}
        >
          {markers.map(marker => <Marker position={{lat:marker.lat,lng:marker.lng}}/>)}
          <Polyline path={markers} options={options}/>
        </GoogleMap>
      </LoadScript>
    </div>
  ) : (
    <p className="h-screen flex justify-center items-center text-5xl font-bold">
      Loading
    </p>
  );
};

export default Home;
