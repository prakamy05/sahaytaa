import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';

// Fix for default marker icon
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const defaultIcon = new Icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

interface SosMarker {
  id: string;
  position: [number, number];
  title: string;
  description: string;
  urgency: 'critical' | 'urgent' | 'moderate';
}

interface MapProps {
  markers: SosMarker[];
  center: [number, number];
  onMarkerClick?: (marker: SosMarker) => void;
}

function Map({ markers, center, onMarkerClick }: MapProps) {
  return (
    <MapContainer
      center={center}
      zoom={13}
      style={{ height: '400px', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {markers.map((marker) => (
        <Marker
          key={marker.id}
          position={marker.position}
          icon={defaultIcon}
          eventHandlers={{
            click: () => onMarkerClick?.(marker),
          }}
        >
          <Popup>
            <div>
              <h3 className="font-bold">{marker.title}</h3>
              <p className="text-sm">{marker.description}</p>
              <span className={`
                inline-block px-2 py-1 rounded text-xs text-white mt-2
                ${marker.urgency === 'critical' ? 'bg-red-600' :
                  marker.urgency === 'urgent' ? 'bg-orange-500' : 'bg-yellow-500'}
              `}>
                {marker.urgency.charAt(0).toUpperCase() + marker.urgency.slice(1)}
              </span>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default Map;