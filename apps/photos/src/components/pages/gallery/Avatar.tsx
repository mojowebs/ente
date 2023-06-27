import React, { useState, useContext, useLayoutEffect } from 'react';
import { EnteFile } from 'types/file';
import { GalleryContext } from 'pages/gallery';
import darkThemeColors from 'themes/colors/dark';
import { styled } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { logError } from 'utils/sentry';

interface AvatarProps {
    file: EnteFile;
}

const PUBLIC_COLLECTED_FILES_AVATAR_COLOR_CODE = '#000000';

const AvatarBase = styled('div')<{ colorCode: string; size: number }>`
    width: ${({ size }) => `${size}px`};
    height: ${({ size }) => `${size}px`};
    background-color: ${({ colorCode }) => `${colorCode}95`};
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-weight: bold;
    font-size: ${({ size }) => `${Math.floor(size / 2)}px`};
`;

const Avatar: React.FC<AvatarProps> = ({ file }) => {
    const { idToMail, user } = useContext(GalleryContext);
    const theme = useTheme();

    const [colorCode, setColorCode] = useState('');
    const [userLetter, setUserLetter] = useState('');

    useLayoutEffect(() => {
        try {
            if (file.ownerID !== user.id) {
                // getting email from in-memory id-email map
                const email = idToMail.get(file.ownerID);
                const colorIndex =
                    file.ownerID % theme.colors.avatarColors.length;
                const colorCode = darkThemeColors.avatarColors[colorIndex];
                setUserLetter(email?.charAt(0)?.toUpperCase());
                setColorCode(colorCode);
            } else if (file.ownerID === user.id) {
                const uploaderName = file.pubMagicMetadata.data.uploaderName;
                setUserLetter(uploaderName?.charAt(0)?.toUpperCase());
                setColorCode(PUBLIC_COLLECTED_FILES_AVATAR_COLOR_CODE);
            }
        } catch (err) {
            logError(err, 'AvatarIcon.tsx - useLayoutEffect failed');
        }
    }, []);

    return (
        <AvatarBase size={18} colorCode={colorCode}>
            {userLetter}
        </AvatarBase>
    );
};

export default Avatar;
