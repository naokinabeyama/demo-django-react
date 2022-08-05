import { useContext, useEffect, useState } from 'react';
import { ApiContext } from '../context/ApiContext';
import ImageListItem from "@material-ui/core/ImageListItem";
import ImageListItemBar from "@material-ui/core/ImageListItemBar";
import ImageList from "@material-ui/core/ImageList";
import { Button, Dialog, DialogTitle, IconButton, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useLocation } from 'react-router-dom';
import { MdAddAPhoto } from 'react-icons/md';


const useStyles = makeStyles((theme) => ({
    postTitle: {
        margin: 40,
        textAlign: 'center',
    },
    postImage: {
        width: 400,
        height: 450,
        objectFit: 'cover',
        maxWidth: '100%',
        // borderRadius: '50%',
        backgroundColor: 'silver',
    },
    dialog: {
        height: 1000,
        width: 500,
    },
}));



const MyPost = () => {
    const location = useLocation();
    const classes = useStyles();
    const { profile, postFull, editedPost, setEditedPost, editPost } = useContext(ApiContext);
    const [state, setState] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [postDetail, setPostDetail] = useState([]);
    

    // 初期
    useEffect(() => {
        // 自分の投稿判定
        const postJudg = () => {
            location.state ?
                setState(true)
                :
                setState(false)
        };
        postJudg();
    }, [location.state]);


    // 投稿判定
    const myPostFull = !state ?
        postFull.filter((post) => {
            return post.userPost === profile.userPro
        })
        :
        postFull.filter((post) => {
            return post.userPost === location.state.pro.userPro
        })

    
    // プロフィールフォーム表示
    const postOpenDialog = () => {
        setDialogOpen(true);
    };

    // プロフィールフォーム非表示
    const postCloseDialog = () => {
        setDialogOpen(false);
        setPostDetail([]);
    };

    const handlePostDetail = (mypost) => {
        setPostDetail(mypost);
    }
    
    // 投稿項目を変更する
    const handleInputChange = () => event => {
        const value = event.target.value;
        const name = event.target.name;
        setEditedPost({ ...editedPost, [name]: value });
    };


    // 画像投稿
    const handleImageInput = () => event => {
        const value = event.target.files[0]
        const name = event.target.name;
        setEditedPost({ ...editedPost, [name]: value });
    };

    
    // 画像ファイルを表示
    const handleEditPicture = () => {
        const fileInput = document.getElementById('imageInput');
        fileInput.click();
    };
    
    
    return (
        <div>
            
            {/* タイトル */}
            <Typography variant='h4' className={classes.postTitle}>List of articles</Typography>
            {/* 画像一覧 */}
            <ImageList style={{ width: 900, height: 600, margin: '0 auto' }} cols={3}>
                {/* 画像の有無 */}
                {myPostFull && (
                    myPostFull.map((mypost) => (
                        
                        <ImageListItem key={mypost.id} style={{ height: 300 }} onClick={() => {
                            postOpenDialog();
                            handlePostDetail(mypost);
                        }}>
                            <img
                                src={mypost.postImage}
                                alt={mypost.title}
                                loading="lazy"
                            />
                            <ImageListItemBar title={mypost.title} />
                        </ImageListItem>
              
                    ))
                )};
            </ImageList>

            {/* ダイアログ(プロフィール作成、更新) */}
            <div>
                <Dialog open={dialogOpen} onClose={postCloseDialog}>
                    <div className={classes.dialog}>
                        {/* 設定タイトル */}
                        <DialogTitle style={{ textAlign: 'center' }}>ProfileEdit</DialogTitle>
                        {/* 投稿画像 */}
                        <div style={{ textAlign: 'center' }}>
                            <img src={postDetail.postImage} alt='post' className={classes.postImage} />
                            <input type='file'
                                id='imageInput'
                                name='postImage'
                                onChange={handleImageInput()} />
                            <IconButton onClick={handleEditPicture}>
                                <MdAddAPhoto className='photo' />
                            </IconButton>
                        </div>
                        {/* タイトル */}
                        <div style={{ textAlign: 'center' }}>
                            <TextField
                                autoFocus
                                label='title'
                                name='title'
                                style={{
                                    width: 300,
                                    marginTop: 20
                                }}
                                defaultValue={postDetail.title}
                                onChange={handleInputChange()}
                                />
                        </div>
                        {/* 説明文 */}
                        <div style={{ textAlign: 'center' }}>
                            <TextField
                                label='text'
                                name='text'
                                multiline
                                minRows={2}
                                style={{
                                    width: 300,
                                    marginTop: 20
                                }}
                                defaultValue={postDetail.text}
                                onChange={handleInputChange()}
                                />
                        </div>
                        {/* 更新ボタン */}
                        <div style={{ textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
                            <Button
                            variant="contained"
                            onClick={() => {
                                editPost(postDetail.id);
                                postCloseDialog();
                            }}
                            >
                                edit
                            </Button>
                        </div>
                        {/* 削除ボタン */}
                        {/* <button className='trash' onClick={() => { deleteProfile(); profileCloseDialog(); }}><BsTrash /></button> */}
                    </div>
                </Dialog>
            </div>
        </div>
    );
};

export default MyPost
