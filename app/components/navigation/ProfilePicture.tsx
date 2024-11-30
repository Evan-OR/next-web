'use client';

import { fetchUserImageUrl } from '../../auth/utils/authUtils';
import { useEffect, useState } from 'react';
import { Avatar } from '@mui/material';

const ProfilePicture = () => {
    const [imgUrl, setImgUrl] = useState('');

    const setProfilePic = async () => {
        const img = await fetchUserImageUrl();
        setImgUrl(img)
    }

    useEffect(() => {
        setProfilePic();
    }, []);

    return imgUrl ? <Avatar src={imgUrl} /> : <Avatar alt={'balls'} />;
};

export default ProfilePicture;
