import { Button, Dialog, DialogTitle, IconButton, ImageList, ImageListItem, ImageListItemBar, TextField, Typography } from '@material-ui/core';
import { useContext, useState } from 'react';
import { ApiContext } from '../context/ApiContext';
import { makeStyles } from '@material-ui/core/styles';
import { MdAddAPhoto } from 'react-icons/md';



const useStyles = makeStyles((theme) => ({
    title: {
        marginTop: 40,
        marginBottom: 50,
        textAlign: 'center',

    },
}));



const PostList = () => {
    const classes = useStyles();
    const { postFull, createPost, setEditedPost, editedPost } = useContext(ApiContext);
    const [dialogOpen, setDialogOpen] = useState(false);



    // 投稿フォーム表示
    const postOpenDialog = () => {
        setDialogOpen(true);
    };

    // 投稿フォーム非表示
    const postCloseDialog = () => {
        setDialogOpen(false);
    };


    // 画像ファイルを表示
    const handleEditPicture = () => {
        const fileInput = document.getElementById('imageInput');
        fileInput.click();
    };


    // 新規投稿
    const handleInputChange = () => event => {
        const value = event.target.value;
        const name = event.target.name;
        setEditedPost({ ...editedPost, [name]: value });
    };

    // 画像投稿
    const handleImageInput = () => event => {
        const value = event.target.files[0].name
        const name = event.target.name;
        setEditedPost({ ...editedPost, [name]: value });
    };


    return (
        <>
            <button onClick={postOpenDialog}>createpost</button>
            <div>
                <Dialog open={dialogOpen} onClose={postCloseDialog}>
                    <div className={classes.dialog}>
                        {/* 設定タイトル */}
                        <DialogTitle style={{ textAlign: 'center' }}>CreatePost</DialogTitle>
                        {/* プロフィール画像 */}
                        <div style={{ textAlign: 'center' }}>
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
                                onChange={handleInputChange()}
                            />
                        </div>
                        {/* 更新ボタン */}
                        <div style={{ textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
                            <Button
                                variant="contained"
                                onClick={() => {
                                    createPost();
                                    postCloseDialog();
                                }}
                            >
                                create
                            </Button>
                        </div>
                    </div>
                </Dialog>
            </div>
            <div className={classes.title}>
                <Typography variant='h3'>
                    PostList
                </Typography>
            </div>
            {/* 画像一覧 */}
            <ImageList style={{ width: 900, height: 600, margin: '0 auto' }} cols={4}>
                {/* 画像の有無 */}
                {postFull && (
                    postFull.map((postList) => (
                        <ImageListItem key={postList.id} style={{height: 200}}>
                            <img
                                src={postList.postImage}
                                alt={postList.title}
                                loading="lazy"
                            />
                            <ImageListItemBar title={postList.title} />
                        </ImageListItem>
                    ))
                )};
            </ImageList>
        </>
    );
};

export default PostList
