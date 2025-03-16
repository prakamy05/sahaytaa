import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, Heart, HandHeart } from 'lucide-react';
import { useUserType } from '../contexts/UserTypeContext';

function UserTypeSelection() {
  const navigate = useNavigate();
  const { setUserType } = useUserType();

  const handleSelection = (type: 'victim' | 'volunteer' | 'donor') => {
    setUserType(type);
    navigate(`/${type}`);
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center"
      style={{ 
        backgroundImage: 'url(https://images.unsplash.com/photo-1542281286-9e0a16bb7366?auto=format&fit=crop&q=80&w=2000&h=1000)',
        backgroundBlendMode: 'overlay',
        backgroundColor: 'rgba(0, 0, 0, 0.7)'
      }}
    >
      <div className="max-w-md w-full space-y-8 bg-white/90 p-8 rounded-xl shadow-lg backdrop-blur-sm">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Sahaytaa</h1>
          <h1 className="text-3xl text-gray-900">Disaster Relief SOS</h1>
          <p className="mt-2 text-gray-600">Please select your role</p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => handleSelection('victim')}
            className="w-full flex items-center justify-center gap-3 bg-red-600 text-white p-4 rounded-lg hover:bg-red-700 transition-colors"
          >
            <AlertTriangle />
            I Need Help (Victim)
          </button>

          <button
            onClick={() => handleSelection('volunteer')}
            className="w-full flex items-center justify-center gap-3 bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Heart />
            I Want to Help (Volunteer)
          </button>

          <button
            onClick={() => handleSelection('donor')}
            className="w-full flex items-center justify-center gap-3 bg-green-600 text-white p-4 rounded-lg hover:bg-green-700 transition-colors"
          >
            <HandHeart />
            I Want to Donate (NGO/Donor)
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserTypeSelection;