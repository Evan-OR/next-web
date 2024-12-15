import { cookies } from 'next/headers';
import { USER_COOKIE } from '@/auth/constants';
import { User } from '@/types/types';

const ProfilePage = () => {
  const cookiesList = cookies();
  const cookieValue = cookiesList.get(USER_COOKIE.Data)?.value;
  const userData: User | null = cookieValue ? JSON.parse(cookieValue) : null;

  const formatData = ({ givenName, surname, username, isSeller, wallet, mail, registration_date }: User) => {
    return {
      givenName,
      surname,
      username,
      isSeller,
      wallet,
      email: mail,
      registrationDate: registration_date,
    };
  };

  return userData ? (
    <div>
      {Object.entries(formatData(userData)).map(([key, value]) => (
        <div key={key}>
          {key}: {JSON.stringify(value)}
        </div>
      ))}
    </div>
  ) : (
    <div>No User Data</div>
  );
};

export default ProfilePage;
