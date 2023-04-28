import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useMapEvents, useMap } from 'react-leaflet/hooks'
import {useState} from 'react'

// import Leaflet from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// // import Search from "react-leaflet-search";
// // import ReactLeafletSearch from "react-leaflet-search";
// Leaflet.Icon.Default.imagePath =
//     '../node_modules/leaflet'

// delete Leaflet.Icon.Default.prototype._getIconUrl;

// Leaflet.Icon.Default.mergeOptions({
//     iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
//     iconUrl: require('leaflet/dist/images/marker-icon.png'),
//     shadowUrl: require('leaflet/dist/images/marker-shadow.png')
// });

export default function Map() {
    const [position, setPosition] = useState([21.625061215394258, 39.20322455322907])

    function LocationMarker() {
        const map = useMapEvents({
            click(e) {
                setPosition(e.latlng)
                if (map.getZoom() < 18) {

                    map.flyTo(e.latlng, map.getZoom() + 1)
                }
            }
        })
    }

    function MoveMarkerToCurrentLocation() {
        const map = useMap();
        map.flyTo(position, 10)
    }
  return (
    <div style={{ height: '100px'}}>
    {/* <div style={{ height: '50px', width: '100%' }} /> */}
    <MapContainer center={position} zoom={20} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
        {/* <MoveMarkerToCurrentLocation /> */}
        <LocationMarker />
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={position}>
            <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
        </Marker>
    </MapContainer>
</div>

  )
}
