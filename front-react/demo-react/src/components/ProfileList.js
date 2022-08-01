import { useContext } from 'react';
import { ApiContext } from '../context/ApiContext'
import { Link, useHistory } from 'react-router-dom';


const ProfileList = () => {
    // const { profile, profiles } = useContext(ApiContext);
    // const history = useHistory();

    // const oneToOneClick = () => {
    //     history.push({
    //         pathname: '/onetoonedm',
    //         state: {
    //             dms: dms,
    //             prof: prof,
    //             myprof: myprof,
    //         }
    //     })
    // }

    // 自分以外の全ユーザープロフィール
    // const filterProfiles = profiles.filter((prof) => {
    //         return prof.id !== profile.id
    //     })
    
    
    return (
        <>
            <p>こんにちは</p>
        </>
        
    );
};

export default ProfileList
