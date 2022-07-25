import { useContext } from 'react'
import { ApiContext } from '../context/ApiContext';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles((theme) => ({
    bg: {
        marginRight: theme.spacing(1),
    },
    myProfile: {
        // backgroundColor: 'gray',
        marginLeft: 100,
    },
    userName: {
        margin: 20,
        textAlign: 'center',
    },
    profileImage: {
        width: 150,
        height: 150,
        objectFit: 'cover',
        maxWidth: '100%',
        borderRadius: '50%',
        backgroundColor: 'silver',
    },
    text: {
        float: 'right',
        marginTop: 30,
        marginRight: 80,
        display: 'flex',
        '& .text-box': {
            margin: 20,
            display: 'flex',
        },
        '& .text-value': {
            paddingLeft: 15,
            display: 'flex',
        },
    },
    text: {
        float: 'right',
        marginTop: 50,
        marginRight: 50,
        display: 'flex',
        '& .text-box': {
            display: 'flex',
        },
        '& .text-value': {
            paddingLeft: 15,
            display: 'flex',
        },
    },
    introduction: {
        clear: 'both',
        margin: 20,
    },
}));



const MyProfile = () => {
    const classes = useStyles();
    const { profile, editedProfile, setEditedProfile, deleteProfile, profileImg, setProfileImg, createProfile, editProfile, postFull } = useContext(ApiContext);

    const gender = (gender) => {
        if (gender === 1) {
            return 'Man';
        } else if (gender === 2) {
            return 'Woman';
        } else {
            return 'Others';
        };
    };

    return (
        <>

            <Typography variant='h4' className={classes.userName}>{profile.username}</Typography>
            
            <div className={classes.myProfile}>
                <img src={profile.img} className={classes.profileImage} />
                <div className={classes.text}>
                    <Grid container spacing={3}>
                        <Grid item xs={2} sm={2} md={4}>
                            <div className='text-box'>
                                <Typography>follow:</Typography>
                                <Typography className='text-value'>0</Typography>
                            </div>
                        </Grid>
                        <Grid item xs={2} sm={2} md={4}>
                             <div className='text-box'>
                                <Typography>follower:</Typography>
                                <Typography className='text-value'>0</Typography>
                            </div>
                        </Grid>
                        <Grid item xs={2} sm={2} md={4}>
                            <div className='text-box'>
                                <Typography>friends:</Typography>
                                <Typography className='text-value'>0</Typography>
                            </div>
                        </Grid>
                        <Grid item xs={2} sm={2} md={4}>
                            <div className='text-box'>
                                <Typography>age:</Typography>
                                <Typography className='text-value'>{profile.age}</Typography>
                            </div>
                        </Grid>
                        <Grid item xs={2} sm={2} md={4}>
                            <div className='text-box'>
                                <Typography>gender:</Typography>
                                <Typography className='text-value'>{gender(profile.gender)}</Typography>
                            </div>
                        </Grid>
                        <Grid item xs={2} sm={2} md={4}>
                            <div className='text-box'>
                                <Typography>updated_at:</Typography>
                                <Typography className='text-value'>{profile.updated_at}</Typography>
                            </div>
                        </Grid>
                    </Grid>

                </div>
                <div className={classes.introduction}>
                    {profile.introduction}
                </div>
            </div>
        </>
    )
}

export default MyProfile
