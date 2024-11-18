import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { settingsSchema } from '../lib/zodSchemas';
import { SettingsAction } from '../actions/SettingsAction';
import { toast } from 'react-toastify';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { X } from 'lucide-react';

interface iAppProps {
  fullName: string;
  email: string;
  profileImage: string;
}

const SettingsForm: React.FC<iAppProps> = ({ email, fullName, profileImage }) => {
  const [currentProfileImage, setCurrentProfileImage] = useState(profileImage || "");
  const [formData, setFormData] = useState({
    fullName: fullName || "",
    email: email || "",
    profileImage: currentProfileImage,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch('/api/auth/upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Failed to upload image');
        }

        const data = await response.json();
        setCurrentProfileImage(data.url);
        setFormData((prev) => ({ ...prev, profileImage: data.url }));
        toast.success('Profile Image has been uploaded');
      } catch (error) {
        console.error('Failed to upload image:', error);
        toast.error('Failed to upload image');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    console.log('Form data before validation:', formData); // Debugging line
    const result = settingsSchema.safeParse(formData);

    if (!result.success) {
      const formattedErrors: { [key in keyof typeof formData]?: string } = {};
      const errorFormat = result.error.format();
      for (const key in errorFormat) {
        if (errorFormat.hasOwnProperty(key)) {
          formattedErrors[key as keyof typeof formData] = (errorFormat[key as keyof typeof formData] as any)._errors?.join(', ') || '';
        }
      }
      console.log('Validation errors:', formattedErrors); // Debugging line
      setErrors(formattedErrors);
      setLoading(false);
      return;
    }

    try {
      console.log('Form data before submission:', formData); // Debugging line
      await SettingsAction(null, new FormData(e.target as HTMLFormElement));
      toast.success('Settings updated successfully');
      navigate('/dashboard'); // Redirect to dashboard or any other page
    } catch (error) {
      console.error('Failed to update settings:', error); // Debugging line
      toast.error('Failed to update settings');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteImage = () => {
    setCurrentProfileImage('');
    setFormData((prev) => ({ ...prev, profileImage: '' }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl mb-4">Settings</h2>
        {errors.form && <p className="text-red-500 mb-4">{errors.form}</p>}
        <div className="mb-4">
          <Label>Full Name</Label>
          <Input
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Jan Marshal"
            className="w-full px-3 py-2 border rounded"
            required
          />
          {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
        </div>
        <div className="mb-4">
          <Label>Email</Label>
          <Input
            disabled
            value={formData.email}
            placeholder="test@test.com"
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <Label>Profile Image</Label>
          <input
            type="hidden"
            name="profileImage"
            value={currentProfileImage}
          />
          {currentProfileImage ? (
            <div className="relative size-16">
              <img
                src={currentProfileImage}
                alt="Profile Image"
                className="size-16 rounded-lg"
              />
              <Button
                onClick={handleDeleteImage}
                variant="destructive"
                size="icon"
                type="button"
                className="absolute -top-3 -right-3"
              >
                <X className="size-4" />
              </Button>
            </div>
          ) : (
            <div>
              <input type="file" accept="image/*" onChange={handleImageChange} />
            </div>
          )}
          {errors.profileImage && <p className="text-red-500 text-sm">{errors.profileImage}</p>}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded"
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
};

export default SettingsForm;