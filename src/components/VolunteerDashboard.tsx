import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, IndianRupee, Image, Info } from 'lucide-react';
import Map from './Map';

const MOCK_MARKERS = [
  {
    id: '1',
    position: [51.505, -0.09],
    title: 'Emergency in Downtown',
    description: 'Family of 4 needs immediate assistance',
    monetaryNeed: '25000',
    images: ['https://images.unsplash.com/photo-1583847268964-b28dc8f51f92'],
    urgency: 'critical' as const
  },
  {
    id: '2',
    position: [51.51, -0.1],
    title: 'Medical Supplies Needed',
    description: 'Elderly couple requires medical supplies',
    monetaryNeed: '15000',
    images: ['https://images.unsplash.com/photo-1584036561566-baf8f5f1b144'],
    urgency: 'urgent' as const
  }
];

function VolunteerDashboard() {
  const navigate = useNavigate();
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [showRangeWarning, setShowRangeWarning] = useState(false);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);

  const handleLocationClick = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation([position.coords.latitude, position.coords.longitude]);
        setShowRangeWarning(false);
      },
      (error) => {
        console.error('Error getting location:', error);
      }
    );
  };

  const handleOfferHelp = (marker: any) => {
    if (!userLocation) {
      setShowRangeWarning(true);
      return;
    }

    // Calculate distance between user and marker
    const distance = calculateDistance(userLocation, marker.position);
    if (distance > 5) {
      setShowRangeWarning(true);
    } else {
      // Handle offer help logic
      console.log('Offering help for:', marker);
    }
  };

  const calculateDistance = (point1: [number, number], point2: [number, number]): number => {
    // Simple distance calculation (you might want to use a more accurate formula)
    const R = 6371; // Earth's radius in km
    const lat1 = point1[0] * Math.PI / 180;
    const lat2 = point2[0] * Math.PI / 180;
    const lon1 = point1[1] * Math.PI / 180;
    const lon2 = point2[1] * Math.PI / 180;
    
    const dLat = lat2 - lat1;
    const dLon = lon2 - lon1;
    
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1) * Math.cos(lat2) * 
              Math.sin(dLon/2) * Math.sin(dLon/2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/')}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Nearby SOS Requests</h1>
        </div>

        {showRangeWarning && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <Info className="h-5 w-5 text-yellow-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  You need to be within 5km range to offer help. Please enable location services.
                </p>
                <button
                  onClick={handleLocationClick}
                  className="mt-2 text-sm font-medium text-yellow-700 hover:text-yellow-600"
                >
                  Use my location
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <Map
            center={[51.505, -0.09]}
            markers={MOCK_MARKERS}
            onMarkerClick={setSelectedMarker}
          />
        </div>

        <div className="grid gap-4">
          {MOCK_MARKERS.map((marker) => (
            <div key={marker.id} className="bg-white rounded-lg shadow p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg">{marker.title}</h3>
                  <p className="text-gray-600">{marker.description}</p>
                  <p className="mt-2 flex items-center text-gray-700">
                    <IndianRupee className="h-4 w-4 mr-1" />
                    {parseInt(marker.monetaryNeed).toLocaleString('en-IN')} needed
                  </p>
                </div>
                <span className={`
                  px-2 py-1 rounded text-white text-sm
                  ${marker.urgency === 'critical' ? 'bg-red-600' :
                    marker.urgency === 'urgent' ? 'bg-orange-500' : 'bg-yellow-500'}
                `}>
                  {marker.urgency.charAt(0).toUpperCase() + marker.urgency.slice(1)}
                </span>
              </div>
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => window.open(marker.images[0], '_blank')}
                  className="flex items-center gap-2 px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50"
                >
                  <Image className="h-4 w-4" />
                  View Images
                </button>
                <button
                  className="flex items-center gap-2 px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50"
                >
                  <Info className="h-4 w-4" />
                  View Details
                </button>
                <button
                  onClick={() => handleOfferHelp(marker)}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                >
                  Offer Help
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default VolunteerDashboard;