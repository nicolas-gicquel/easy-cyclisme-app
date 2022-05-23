import { useState, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
// import useGeoLocation from "hooks/useGeoLocation";

function EasyMap({ competitions }) {
    const [center, setCenter] = useState({ lat: 47.71894, lng: -1.3778 })
    const ZOOM_LEVEL = 9
    const mapRef = useRef()

    // const location = useGeoLocation()

    return (
        <MapContainer
            center={center}
            zoom={ZOOM_LEVEL}
            scrollWheelZoom={false}
            ref={mapRef}
            style={{ height: '800px', width: '100%' }}>
            <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {competitions.map(competition => (
                <Marker
                    position={[
                        competition.lat_competition,
                        competition.lon_competition,
                    ]}>
                    <Popup>{competition.city_competition}</Popup>
                </Marker>
            ))}
        </MapContainer>
    )
}

export default EasyMap
