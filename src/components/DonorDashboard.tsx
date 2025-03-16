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

function DonorDashboard() {
  const navigate = useNavigate();
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [donationAmount, setDonationAmount] = useState('');

  const handleDonate = () => {
    console.log('Donation amount:', donationAmount);
    // Handle donation logic
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
          <h1 className="text-2xl font-bold text-gray-900">Support Those in Need</h1>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <Map
            center={[51.505, -0.09]}
            markers={MOCK_MARKERS}
            onMarkerClick={setSelectedMarker}
          />
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Make a Donation</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Amount (INR)</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <IndianRupee className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="number"
                  className="block w-full pl-10 pr-12 border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                  value={donationAmount}
                  onChange={(e) => setDonationAmount(e.target.value)}
                  placeholder="Enter amount"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">INR</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              {[1000, 2000, 5000, 10000].map((amount) => (
                <button
                  key={amount}
                  type="button"
                  className="flex-1 py-2 px-4 border border-green-600 rounded-md text-green-600 hover:bg-green-50"
                  onClick={() => setDonationAmount(amount.toString())}
                >
                  ₹{amount.toLocaleString('en-IN')}
                </button>
              ))}
            </div>

            <button
              onClick={handleDonate}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Donate Now
            </button>
          </div>
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DonorDashboard;