import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, MapPin, ArrowLeft, IndianRupee } from 'lucide-react';
import Map from './Map';
import { useMapEvents } from 'react-leaflet';

interface VictimDetails {
  age: string;
  gender: 'male' | 'female' | 'other';
}

function LocationMarker({ onLocationSelect }: { onLocationSelect: (position: [number, number]) => void }) {
  useMapEvents({
    click(e) {
      onLocationSelect([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null;
}

function VictimDashboard() {
  const navigate = useNavigate();
  const [selectedLocation, setSelectedLocation] = useState<[number, number] | null>(null);
  const [formData, setFormData] = useState({
    description: '',
    peopleCount: '',
    victims: [] as VictimDetails[],
    monetaryNeed: '',
    requirements: {
      water: false,
      food: false,
      medical: false,
      shelter: false
    },
    photos: [] as File[]
  });

  const handlePeopleCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const count = parseInt(e.target.value) || 0;
    setFormData({
      ...formData,
      peopleCount: e.target.value,
      victims: Array(count).fill({ age: '', gender: 'male' })
    });
  };

  const updateVictimDetails = (index: number, field: keyof VictimDetails, value: string) => {
    const newVictims = [...formData.victims];
    newVictims[index] = {
      ...newVictims[index],
      [field]: value
    };
    setFormData({ ...formData, victims: newVictims });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('SOS submitted:', { ...formData, location: selectedLocation });
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
          <h1 className="text-2xl font-bold text-gray-900">Create SOS Request</h1>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Your Location</label>
              <div className="mt-1">
                <Map
                  center={[51.505, -0.09]}
                  markers={selectedLocation ? [{
                    id: 'selected',
                    position: selectedLocation,
                    title: 'Selected Location',
                    description: 'Your selected location',
                    urgency: 'critical'
                  }] : []}
                >
                  <LocationMarker onLocationSelect={setSelectedLocation} />
                </Map>
                <button
                  type="button"
                  className="mt-2 flex items-center gap-2 text-blue-600 hover:text-blue-700"
                >
                  <MapPin size={20} />
                  Use my current location
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Upload Photos</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                <div className="space-y-1 text-center">
                  <Camera className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                      <span>Upload files</span>
                      <input type="file" className="sr-only" multiple accept="image/*" />
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Number of People</label>
              <input
                type="number"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={formData.peopleCount}
                onChange={handlePeopleCountChange}
                min="1"
              />
            </div>

            {formData.victims.map((victim, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-4">
                <h3 className="font-medium">Person {index + 1}</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Age</label>
                    <input
                      type="number"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      value={victim.age}
                      onChange={(e) => updateVictimDetails(index, 'age', e.target.value)}
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Gender</label>
                    <select
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      value={victim.gender}
                      onChange={(e) => updateVictimDetails(index, 'gender', e.target.value as 'male' | 'female' | 'other')}
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}

            <div>
              <label className="block text-sm font-medium text-gray-700">Monetary Need (INR)</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <IndianRupee className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="number"
                  className="block w-full pl-10 pr-12 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Amount needed"
                  value={formData.monetaryNeed}
                  onChange={(e) => setFormData({ ...formData, monetaryNeed: e.target.value })}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">INR</span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Requirements</label>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {Object.entries(formData.requirements).map(([key, value]) => (
                  <label key={key} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={(e) => setFormData({
                        ...formData,
                        requirements: {
                          ...formData.requirements,
                          [key]: e.target.checked
                        }
                      })}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-gray-700 capitalize">{key}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe your situation and needs..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Submit SOS Request
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default VictimDashboard;