import { useContext } from 'react'
import { ApiContext } from '../context/ApiContext';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    profileImage: {
        width: 150,
        height: 150,
        objectFit: 'cover',
        maxWidth: '100%',
        borderRadius: '50%',
        backgroundColor: 'white',
    },
}));



const MyProfile = () => {
    const classes = useStyles();
    const { profile, editedProfile, setEditedProfile, deleteProfile, profileImg, setProfileImg, createProfile, editProfile } = useContext(ApiContext);


    const gender = (gender) => {
        if (gender === 1) {
            return '男性';
        } else if (gender === 2) {
            return '女性';
        } else {
            return 'その他';
        };
    };

    return (
        <div>
            <h1>こんにちは{profile.username}さん</h1>
            <img src={profile.img} className={classes.profileImage} />
            <p>{profile.created_at}</p>
            <p>{profile.age}</p>
            <p>{gender(profile.gender)}</p>
            {profile.introduction}
        </div>
    )
}

export default MyProfile
