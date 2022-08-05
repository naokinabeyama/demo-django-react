import { useContext, useState, Fragment, useEffect } from 'react'
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
import { useLocation } from 'react-router-dom';
import { BsTrash } from 'react-icons/bs';



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
        marginTop: 100,
        margin: '0 auto',
        width: '80%',
    },
    myProfile: {
        display: 'flex',
        margin: '0 auto',
        width: '80%',
    },
    userName: {
        margin: 20,
        textAlign: 'center',
    },
    profileImage: {
        width: 160,
        height: 160,
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
        marginTop: 30,
        marginLeft: 50,
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
        '&:hover': {
            opacity: 0.3,
        },
    },
    myIntroduction: {
        clear: 'both',
        marginTop: 60,
        margin: '0 auto',
        width: '80%',
    },
}));



const MyProfile = () => {
    const location = useLocation();
    const classes = useStyles();
    const { profile, editedProfile, setEditedProfile, deleteProfile, profileImg, setProfileImg, createProfile, editProfile } = useContext(ApiContext);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [state, setState] = useState(false);


    // 初期
    useEffect(() => {
        // 自分のプロフィール判定
        const profileJudg = () => {
            location.state ?
                setState(true)
                :
                setState(false)
                
        };
        profileJudg();
    }, [location.state]);

    // 年齢
    const NUM = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100];

    const NUMBER = NUM.map((number) =>
        <MenuItem value={number}>
            {number}
        </MenuItem>
    );

    
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


    // 年齢,性別を変更する
    const handleAgeGenderChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        setEditedProfile({ ...editedProfile, [name]: value });
    };

    
    // 紹介文
    // const paragraph = (text) => {
    //     const texts = text.split(/(\n)/).map((item, index) => {
    //         return (
    //             <Fragment key={index}>
    //                 {item.match(/\n/) ? <br /> : item}
    //             </Fragment>
    //         ); 
    //     });
    //     return { texts };
    // }

    
    return (
        <>
            {!profile.id ?
                // プロフィール作成されていない場合
                <>
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
                </>
            :
                <>
                    {/* 他ユーザーの詳細 */}
                    {state ?
                        <>
                            {/* プロフィール作成されている場合  */}
                            {/* ユーザーネーム */}
                            <Typography variant='h4' className={classes.userName}>{location.state.pro.username}</Typography>

                            <div className={classes.myProfile}>
                                {/* プロフィール画像 */}
                                <img src={location.state.pro.img} className={classes.profileImage} />
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
                                                <Typography className='text-value'>{location.state.pro.age}</Typography>
                                            </div>
                                        </Grid>
                                        {/* 性別 */}
                                        <Grid item xs={2} sm={2} md={4}>
                                            <div className='text-box'>
                                                <Typography>gender:</Typography>
                                                <Typography className='text-value'>{gender(location.state.pro.gender)}</Typography>
                                            </div>
                                        </Grid>
                                        {/* 更新日 */}
                                        <Grid item xs={2} sm={2} md={4}>
                                            <div className='text-box'>
                                                <Typography>updated_at:</Typography>
                                                <Typography className='text-value'>{location.state.pro.updated_at}</Typography>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </div>
                            </div>
                        
                            {/* 説明文 */}
                            <div className={classes.myIntroduction}>
                                <Typography>
                                    {location.state.pro.introduction}
                                </Typography>
                                {/* {paragraph(profile.introduction)} */}
                            </div>
                        </>
                    :
                        // ログインユーザー詳細
                        <>
                            {/* プロフィール作成されている場合  */}
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
                        
                            {/* 説明文 */}
                            <div className={classes.myIntroduction}>
                                <Typography>
                                    {profile.introduction}
                                </Typography>
                                {/* {paragraph(profile.introduction)} */}
                                    </div>
                        </>
                    }

                   
                </>
            }


            {/* ダイアログ(プロフィール作成、更新) */}
            <div>
                <Dialog open={dialogOpen} onClose={profileCloseDialog}>
                    <div className={classes.dialog}>
                        {/* 設定タイトル */}
                        <DialogTitle style={{ textAlign: 'center' }}>ProfileEdit</DialogTitle>
                        {/* プロフィール画像 */}
                        <div style={{ textAlign: 'center' }}>
                            {profile.id ?
                                <img src={profile.img} alt='profile' className={classes.createImage} />
                                :
                                <img src='http://127.0.0.1:8000/media/sampleImage/null.png' alt='profile' className={classes.createImage} />
                            }
                            <input type='file' id='imageInput'  onChange={(event) => { setProfileImg(event.target.files[0]); event.target.value = '' }} />
                            <IconButton onClick={handleEditPicture}>
                                <MdAddAPhoto className='photo' />
                            </IconButton>
                        </div>
                        {/* ユーザーネーム */}
                        <div style={{ textAlign: 'center' }}>
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
                        <div style={{
                            textAlign: 'center',
                            marginTop: 20,
                        }}>
                            <FormControl>
                                <InputLabel>
                                    age
                                </InputLabel>
                                <Select
                                    value={editedProfile.age}
                                    label='age'
                                    name='age'
                                    style={{
                                        width: 300,
                                    }}
                                    onChange={handleAgeGenderChange}
                                >
                                    {NUMBER}
                                </Select>
                            </FormControl>
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
                                    onChange={handleAgeGenderChange}
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
                        {/* 削除ボタン */}
                        <button className='trash' onClick={() => { deleteProfile(); profileCloseDialog(); }}><BsTrash /></button>
                    </div>
                </Dialog>
            </div>
        </>
    );
};

export default MyProfile
