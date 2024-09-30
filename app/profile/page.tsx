import { cookies } from 'next/headers';
import { USER_COOKIE } from '@/app/auth/constants';
import { UserData } from '@/app/types/types';

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
        </div>
    ) : (
        <div>No User Data</div>
    );
};

export default ProfilePage;
