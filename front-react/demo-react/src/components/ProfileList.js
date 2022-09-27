import { useContext } from 'react';
import { ApiContext } from '../context/ApiContext'
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';


const useStyles = makeStyles((theme) => ({
    profileListAll: {
        position: 'relative',
        display: 'flex',
        marginBottom: 30,
        '&:hover': {
            opacity: 0.7,
            backgroundColor: '	#EEEEEE',
        },
    },
    title: {
        marginTop: 40,
        marginBottom: 50,
        textAlign: 'center',

    },
    profileList: {
        margin: '0 auto',
        width: '70%',
    }
}));




const ProfileList = () => {
    const classes = useStyles();
    const { profile, profiles } = useContext(ApiContext);
    // 自分以外の全ユーザープロフィール
    const filterProfiles = profiles.filter((prof) => {
        return prof.id !== profile.id
    });
    // ユーザー降順
    const reverseProfilesAll = [...filterProfiles].reverse();

    return (
        <>
            <div className={classes.title}>
                <Typography variant='h3'>ProfilesList</Typography>
            </div>
            <div style={{width: '70%', margin:'0 auto'}}>
            {reverseProfilesAll && (
                reverseProfilesAll.map((allPro) => 
                <Link key={allPro.id} to={{ pathname: '/profile/' + allPro.id, state: { pro: allPro } }}>
                    <Card className={classes.profileListAll} >
                        {/* アバター画像の有無 */}
                        {allPro.img ? (
                            <CardMedia style={{ minWidth: 100, height: 100 }} image={allPro.img} />
                        ):(
                            <CardMedia style={{ minWidth: 100, height: 100 }} image='http://127.0.0.1:8000/media/image/null.png' />
                        )}

                        <CardContent style={{ padding: 5 }}>
                            {/* ユーザーネーム */}
                            <Typography variant='h6'>{allPro.username}</Typography>
                            {/* 更新日時 */}
                            <Typography>{allPro.created_at}</Typography>
                        </CardContent>
                    </Card>
                </Link>
                )
            )}
            </div>
        </>
        
    );
};

export default ProfileList
