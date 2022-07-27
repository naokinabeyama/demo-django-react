import { useContext, useState } from 'react'
import { ApiContext } from '../context/ApiContext';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import BuildSharp from '@material-ui/icons/BuildSharp';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { IconButton } from '@material-ui/core';
import { MdAddAPhoto } from 'react-icons/md';



const useStyles = makeStyles((theme) => ({
    bg: {
        marginRight: theme.spacing(1),
    },
    dialog: {
        height: 1000,
        width: 500,
    },
    createPro: {
        margin: 'auto',
    },
    noMyProfile: {
        display: 'flex',
        marginLeft: 100,
        marginTop: 100,
    },
    myProfile: {
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
    createImage: {
        width: 150,
        height: 150,
        objectFit: 'cover',
        maxWidth: '100%',
        borderRadius: '50%',
        
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
    buildIcon: {
        opacity: 0.4,
        fontSize: 15,
        cursor: 'pointer',
    },
    introduction: {
        clear: 'both',
        margin: 20,
    },
}));



const MyProfile = () => {
    const classes = useStyles();
    const { profile, editedProfile, setEditedProfile, deleteProfile, profileImg, setProfileImg, createProfile, editProfile, postFull } = useContext(ApiContext);
    const [dialogOpen, setDialogOpen] = useState(false);


    // 性別変換
    const gender = (gender) => {
        if (gender === 1) {
            return 'Man';
        } else if (gender === 2) {
            return 'Woman';
        } else {
            return 'Others';
        };
    };


    // プロフィールフォーム表示
    const profileOpenDialog = () => {
        setDialogOpen(true);
    };

    // プロフィールフォーム非表示
    const profileCloseDialog = () => {
        setDialogOpen(false);
    };


    // 画像ファイルを表示
    const handleEditPicture = () => {
        const fileInput = document.getElementById('imageInput');
        fileInput.click();
    };


    // プロフィール項目を変更する
    const handleInputChange = () => event => {
        const value = event.target.value;
        const name = event.target.name;
        setEditedProfile({ ...editedProfile, [name]: value });
    };

    // 性別を変更する
    const handleGenderChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        setEditedProfile({ ...editedProfile, [name]: value });
    }


    return (
        <>
            {/* プロフィール作成されている場合 */}
            {profile.id ?
                <>
                    {/* ユーザーネーム */}
                    <Typography variant='h4' className={classes.userName}>{profile.username}</Typography>

                    <div className={classes.myProfile}>
                        {/* プロフィール画像 */}
                        <img src={profile.img} className={classes.profileImage} />
                        <div className={classes.text}>
                            <Grid container spacing={3}>
                                {/* フォロー */}
                                <Grid item xs={2} sm={2} md={4}>
                                    <div className='text-box'>
                                        <Typography>follow:</Typography>
                                        <Typography className='text-value'>0</Typography>
                                    </div>
                                </Grid>
                                {/* フォロワー */}
                                <Grid item xs={2} sm={2} md={4}>
                                    <div className='text-box'>
                                        <Typography>follower:</Typography>
                                        <Typography className='text-value'>0</Typography>
                                    </div>
                                </Grid>
                                {/* 友達 */}
                                <Grid item xs={2} sm={2} md={4}>
                                    <div className='text-box'>
                                        <Typography>friends:</Typography>
                                        <Typography className='text-value'>0</Typography>
                                    </div>
                                </Grid>
                                {/* 年齢 */}
                                <Grid item xs={2} sm={2} md={4}>
                                    <div className='text-box'>
                                        <Typography>age:</Typography>
                                        <Typography className='text-value'>{profile.age}</Typography>
                                    </div>
                                </Grid>
                                {/* 性別 */}
                                <Grid item xs={2} sm={2} md={4}>
                                    <div className='text-box'>
                                        <Typography>gender:</Typography>
                                        <Typography className='text-value'>{gender(profile.gender)}</Typography>
                                    </div>
                                </Grid>
                                {/* 更新日 */}
                                <Grid item xs={2} sm={2} md={4}>
                                    <div className='text-box'>
                                        <Typography>updated_at:</Typography>
                                        <Typography className='text-value'>{profile.updated_at}</Typography>
                                    </div>
                                </Grid>
                            </Grid>
                            {/* プロフィール設定ボタン */}
                            <div>
                                <BuildSharp className={classes.buildIcon} onClick={profileOpenDialog} />
                            </div>
                        </div>
                    </div>
                </>
                :
                // プロフィール作成されていない場合
                <div className={classes.noMyProfile}>
                    {/* プロフィール画像 */}
                    <img src='http://127.0.0.1:8000/media/sampleImage/null.png' alt='profile' className={classes.profileImage} />
                    <div className={classes.createPro}>
                        <Button
                            style={{
                                width: 500, height: 50
                            }}
                            variant="contained"
                            onClick={profileOpenDialog}
                        >
                            Create Profile
                        </Button>
                    </div>
                </div>
            }
            <div>
                {profile.introduction}
            </div>
            {/* ダイアログ(プロフィール作成、更新) */}
            <div>
                <Dialog open={dialogOpen} onClose={profileCloseDialog}>
                    <div className={classes.dialog}>
                        {/* 設定タイトル */}
                        <DialogTitle style={{ textAlign: 'center' }}>ProfileEdit</DialogTitle>
                        {/* プロフィール画像 */}
                        <div style={{textAlign: 'center'}}>
                            {profile.id ?
                                <img src={profile.img} alt='profile' className={classes.createImage} />
                            :
                                <img src='http://127.0.0.1:8000/media/sampleImage/null.png' alt='profile' className={classes.createImage} />
                            }
                            <input type='file' id='imageInput' hidden='hidden' onChange={(event) => { setProfileImg(event.target.files[0]); event.target.value = '' }} />
                            <IconButton onClick={handleEditPicture}>
                                <MdAddAPhoto className='photo' />
                            </IconButton>
                        </div>
                        {/* ユーザーネーム */}
                        <div style={{textAlign: 'center'}}>
                            <TextField
                                autoFocus
                                label='userName'
                                name='username'
                                style={{
                                    width: 300,
                                    marginTop: 20
                                }}
                                defaultValue={editedProfile.username}
                                onChange={handleInputChange()}
                            />
                        </div>
                        {/* 年齢 */}
                        <div style={{textAlign: 'center'}}>
                            <TextField
                                label='age'
                                name='age'
                                style={{
                                    width: 300,
                                    marginTop: 20
                                }}
                                defaultValue={editedProfile.age}
                                onChange={handleInputChange()}
                            />
                        </div>
                        {/* 性別 */}
                        <div style={{
                            textAlign: 'center',
                            marginTop: 20,
                        }}>
                            <FormControl>
                                <InputLabel>
                                    gender
                                </InputLabel>
                                <Select
                                    value={editedProfile.gender}
                                    label='gender'
                                    name='gender'
                                    style={{
                                        width: 300,
                                    }}
                                    onChange={handleGenderChange}
                                >
                                    <MenuItem value={0}>
                                        Other
                                    </MenuItem>
                                    <MenuItem value={1}>
                                        Man
                                    </MenuItem>
                                    <MenuItem value={2}>
                                        Woman
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        {/* 説明文 */}
                        <div style={{ textAlign: 'center' }}>
                            <TextField
                                label='introduction'
                                name='introduction'
                                multiline
                                minRows={2}
                                style={{
                                    width: 300,
                                    marginTop: 20
                                }}
                                defaultValue={editedProfile.introduction}
                                onChange={handleInputChange()}
                            />
                        </div>
                        {/* 更新ボタン */}
                        <div style={{ textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
                            {profile.id ? 
                                <Button
                                    variant="contained"
                                    onClick={() => {
                                        editProfile();
                                        profileCloseDialog();
                                    }}
                                >
                                    edit
                                </Button>
                            :
                                <Button
                                    variant="contained"
                                    onClick={() => {
                                        createProfile();
                                        profileCloseDialog();
                                    }}
                                >
                                    create
                                </Button>
                            }
                        </div>
                    </div>
                </Dialog>
            </div>
        </>
    )
}

export default MyProfile
