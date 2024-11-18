import { settingsSchema } from '../lib/zodSchemas';
import { apiService } from '../services/apiService';
import { parseWithZod } from '@conform-to/zod';

export const SettingsAction = async (prevState: any, formData: FormData) => {
  const submission = parseWithZod(formData, {
    schema: settingsSchema,
  });

  if (submission.status !== 'success') {
    return {
      status: 'error',
      errors: submission.error,
    };
  }

  try {
    // Perform the action, e.g., update user settings in the backend
    const response = await apiService.updateUserSettings({ ...submission.value, id: prevState.userId, profileImage: submission.value.profileImage || '' });

    return {
      status: 'success',
      data: response,
    };
  } catch (error) {
    return {
      status: 'error',
      errors: { form: 'Failed to update settings' },
    };
  }
};