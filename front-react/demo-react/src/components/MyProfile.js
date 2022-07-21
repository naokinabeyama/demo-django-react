import { useContext } from 'react'
import { ApiContext } from '../context/ApiContext';




const MyProfile = () => {
    const { profile, profileImg } = useContext(ApiContext);

    return (
        <div>
            <p>aiue</p>
            <img src={profile.img} />
            <span>{profile.username}</span>
            {profile.created_at}
            {profile.age}
            {profile.gender}
            {profile.introduction}
        </div>
    )
}

export default MyProfile
