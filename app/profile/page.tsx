import { cookies } from 'next/headers';
import { USER_COOKIE } from '@/auth/constants';
import { UserData } from '@/types/types';
import { TestAuthButton } from './TestAuthButton';

const ProfilePage = () => {
  const cookiesList = cookies();
  const cookieValue = cookiesList.get(USER_COOKIE.Data)?.value;
  const userData: UserData | null = cookieValue ? JSON.parse(cookieValue) : null;

  return userData ? (
    <div>
      {Object.entries(userData).map(([key, value]) => (
        <div key={key}>
          {key}: {value}
        </div>
      ))}

      <TestAuthButton />
    </div>
  ) : (
    <div>No User Data</div>
  );
};

export default ProfilePage;
