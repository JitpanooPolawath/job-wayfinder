import { useState, useEffect } from "react";
import { JobsData } from "./firebase";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

export default function TestMap({ dataMap }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (dataMap) {
        const jobsData = dataMap;
        setData(jobsData);
      } else {
        const jobsData = await JobsData();
        setData(jobsData);
      }
    };
    fetchData();
  });

  const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
    iconSize: [24, 24],
  });

  return (
    <MapContainer center={[53.201471587803326, -124.58945128601118]} zoom={5}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MarkerClusterGroup>
        {data &&
          data.map((marker) => (
            <Marker
              position={[
                marker.property.job_latitude,
                marker.property.job_longitude,
              ]}
              icon={customIcon}
            >
              <Popup>
                {marker.property.job_title} at {marker.property.employer_name},{" "}
                {marker.property.job_city}
              </Popup>
            </Marker>
          ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
}
