import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { apiService } from '../services/apiService';
import SettingsForm from '../components/SettingsForm';

const Settings: React.FC = () => {
  const { user } = useAuth();
  const [data, setData] = useState<{ email: string; fullName: string; profileImage: string } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const userData = await apiService.getUser(user.id);
        setData({
          email: userData.email,
          fullName: userData.username,
          profileImage: userData.image,
        });
      }
    };

    fetchData();
  }, [user]);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <SettingsForm
      email={data.email}
      fullName={data.fullName}
      profileImage={data.profileImage}
    />
  );
};

export default Settings;