import { Button, Card, CardContent, CardMedia, Dialog, DialogTitle, IconButton, ImageList, ImageListItem, ImageListItemBar, TextField, Typography } from '@material-ui/core';
import { useContext, useState } from 'react';
import { ApiContext } from '../context/ApiContext';
import { makeStyles } from '@material-ui/core/styles';
import { MdAddAPhoto } from 'react-icons/md';
import { BsTrash } from 'react-icons/bs';
import SpeakerNotesIcon from '@material-ui/icons/SpeakerNotes';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';


const useStyles = makeStyles((theme) => ({
    title: {
        marginTop: 40,
        marginBottom: 50,
        textAlign: 'center',
    },
    postItem: {
        cursor: 'pointer',
        '&:hover': {
            opacity: 0.7,
        },
    },
    postImage: {
        width: 400,
        height: 450,
        objectFit: 'cover',
        maxWidth: '100%',
        backgroundColor: 'silver',
    },
    dialog: {
        height: 1000,
        width: 500,
    },
    postDetail: {
        display: 'flex',
        margin: 10,
    },
    profileImg: {
        width: 40,
        height: 40,
        objectFit: 'cover',
        maxWidth: '100%',
        borderRadius: '50%',
        backgroundColor: 'silver',
    },
    profileName: {
        margin: 10,
    },
    icons: {
        textAlign: 'right',
        marginRight: 50,
        cursor: 'pointer',
        color: 'grey',
        '& .icons-star': {
            marginRight: 10,
            '&:hover': {
                color: '#FFD700', 
            },
        },
        '& .icons-comment': {
            fontSize: 21,
            '&:hover': {
                color: '#444444',
            },
        },
    },
    postTitle: {
        marginTop: 10,
        marginLeft: 80,
        display: 'flex',
        '& .text-title': {
            marginRight: 30,
        },
        '& .text-value': {
           marginLeft: 30,
        },
    },
    postText: {
        marginTop: 30,
        marginLeft: 80,
        marginBottom: 20,
    },
    deleteBtn: {
        color: 'grey',
        cursor: 'pointer',
        '&:hover': {
            color: '#444444',
        },
    },
    commentTitle: {
        marginLeft: 5,
        marginBottom: 10,
    },
    commentField: {
        textAlign: 'center',
    },
    commentBtn: {
        textAlign: 'center',
        marginTop: 15,
    },
    dialogClose: {
        textAlign: 'right',
        cursor: 'pointer',
        color: 'grey',
        '&:hover': {
            color: '#444444',
        },
    },
}));



const PostList = () => {
    const classes = useStyles();
    const { profile, profiles, post, setPost, postFull, createPost, setEditedPost, editedPost, deletePost, createComment, comment, setComment, commentFull, deleteComment} = useContext(ApiContext);
    // 新規投稿ダイアログ
    const [createDialogOpen, setCreateDialogOpen] = useState(false);
    // 投稿詳細ダイアログ
    const [detailDialogOpen, setDetailDialogOpen] = useState(false);
    const [name, setName] = useState('');
    const [userImg, setUserImg] = useState('');
    const [commentOpen, setCommentOpen] = useState(false);
    const [commentValue, setCommentValue] = useState(false);
    // 投稿コメント
    const commentFilter = commentFull.filter((comment) => {
        return post.id === comment.postComment
    });



    // 投稿フォーム表示
    const postCreateOpenDialog = () => {
        setCreateDialogOpen(true);
    };

    // 投稿フォーム非表示
    const postCreateCloseDialog = () => {
        setCreateDialogOpen(false);
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
        const value = event.target.files[0]
        const name = event.target.name;
        setEditedPost({ ...editedPost, [name]: value });
    };

    // 投稿詳細
    const handlePostDetail = (postList) => {
        setPost(postList);
        // 投稿ユーザー
        const postUser = profiles.filter((user) => {
            return user.userPro === postList.userPost
        });
        setName(postUser[0].username);
        setUserImg(postUser[0].img);
    };

    // 投稿詳細表示
    const postDetailOpenDialog = () => {
        setDetailDialogOpen(true);
    };

    // 投稿詳細非表示
    const postDetailCloseDialog = () => {
        setDetailDialogOpen(false);
        setCommentOpen(false);
    };

    // コメント表示非表示
    const postCommentOpen = () => {
        {commentOpen ?
            setCommentOpen(false)
        :
            setCommentOpen(true)
        }
    }

    // コメント非表示
    // const postCommentClose = () => {
    //     setCommentOpen(false);
    // }

    // 新規コメント
    const handleCreateComment = () => event => {
        const value = event.target.value;
        const name = event.target.name;
        {!value || !value.match(/\S/g) ? 
            setCommentValue(false)
        :
            setCommentValue(true)
        }
        setComment({ ...comment, [name]: value }); 
    }

    // コメントしたユーザープロフィール画像
    const commentProfileImg = (commentUserId) => {
        const commentPro = profiles.filter((item) => {
            return commentUserId === item.userPro
        });
        return commentPro[0].img;
    };

    // コメントしたユーザーネーム
    const commentProfileName = (commentUserId) => {
        const commentPro = profiles.filter((item) => {
            return commentUserId === item.userPro
        });
        return commentPro[0].username;
    };
     

    // コメント作成後textfieldを空に
    const resetValue = () => {
        const textForm = document.getElementById('commentText');
        textForm.value = '';
    };
        
    



    return (
        <>
            <button onClick={postCreateOpenDialog}>createpost</button>
            {/* 新規投稿 */}
            <div>
                <Dialog open={createDialogOpen} onClose={postCreateCloseDialog}>
                    <div className={classes.dialog}>
                        {/* 設定タイトル */}
                        <DialogTitle style={{ textAlign: 'center' }}>CreatePost
                        </DialogTitle>
                        {/* 投稿画像 */}
                        <div style={{ textAlign: 'center' }}>
                            <img src='http://127.0.0.1:8000/media/sampleImage/null.png' alt='profile' className={classes.postImage} />
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
                                    postCreateCloseDialog();
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
                        <ImageListItem className={classes.postItem} key={postList.id} style={{height: 200}} onClick={() => {
                            handlePostDetail(postList);
                            postDetailOpenDialog();
                        }}>
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


            {/* ダイアログ(詳細、更新) */}
            <div>
                <Dialog open={detailDialogOpen} onClose={postDetailCloseDialog}>
                    <div className={classes.dialog}>
                        {/* 詳細タイトル */}
                        <div className={classes.postDetail}>
                            <img className={classes.profileImg} src={userImg} alt='profileImg' />
                            <Typography className={classes.profileName}>{name}</Typography>
                        </div>
                        {/* ログインユーザーの投稿なら編集できる */}
                        {profile.userPro === post.userPost ?
                            <>
                                {/* 投稿画像 */}
                                <div style={{ textAlign: 'center' }}>
                                    <img src={post.postImage} alt='post' className={classes.postImage} />
                                    <input
                                        type='file'
                                        id='imageInput'
                                        name='postImage'
                                        hidden='hidden'
                                        onChange={handleImageInput()} />
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <IconButton onClick={handleEditPicture}>
                                        <MdAddAPhoto className='photo' />
                                    </IconButton>
                                </div>
                                {/* タイトル */}
                                <div style={{ textAlign: 'center' }}>
                                    <TextField
                                        label='title'
                                        name='title'
                                        style={{
                                            width: 300,
                                            marginTop: 20
                                        }}
                                        defaultValue={post.title}
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
                                        defaultValue={post.text}
                                        onChange={handleInputChange()}
                                        />
                                </div>
                                {/* 更新ボタン */}
                                <div style={{ textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
                                    <Button
                                    variant="contained"
                                    onClick={() => {
                                        // editPost(post.id);
                                        postDetailCloseDialog();
                                    }}
                                    >
                                        edit
                                    </Button>
                                </div>
                                {/* 削除ボタン */}
                                <button className='trash' onClick={() => { deletePost(); postDetailCloseDialog(); }}><BsTrash /></button>
                            </>
                        :
                            <>
                                {/* 投稿画像 */}
                                <div style={{ textAlign: 'center' }}>
                                    <img src={post.postImage} alt='post' className={classes.postImage} />
                                </div>
                                {/* icon */}
                                <div className={classes.icons}>
                                    {/* お気に入り */}
                                    <StarBorderIcon className='icons-star' />
                                    {/* コメント */}
                                    <SpeakerNotesIcon
                                        className='icons-comment'
                                        onClick={postCommentOpen}
                                    />
                                </div>
                                {/* タイトル */}
                                <div className={classes.postTitle}>
                                    <Typography className='text-title'>title:</Typography>
                                    <Typography className='text-value'>{post.title}</Typography>
                                </div>
                                {/* 説明文 */}
                                <div className={classes.postText}>
                                    <Typography>text:</Typography>
                                    <Typography>{post.text}</Typography>
                                </div>

                                
                                {/* コメント一覧 */}
                                {commentOpen &&
                                    <div>
                                        <div className={classes.commentTitle}> 
                                            <Typography >comment<CreateOutlinedIcon style={{fontSize: 15}} /></Typography>
                                        </div>
                                        {/* コメント */}
                                        {commentFilter && 
                                            (commentFilter.map((com) => (
                                                <div key={com.id}>
                                                    <Card style={{ position: 'relative', display: 'flex', marginBottom: 30 }} >
                                                        {/* アバター画像の有無 */}
                                                        {commentProfileImg(com.userComment) ? (
                                                            <CardMedia style={{ minWidth: 70, height: 70 }} image={commentProfileImg(com.userComment)} />
                                                        ):(
                                                            <CardMedia style={{ minWidth: 70, height: 70 }} image='http://127.0.0.1:8000/media/image/null.png' />
                                                        )}
                                                        <CardContent style={{ padding: 5 }}>
                                                            <div style={{display: 'flex'}}>
                                                                {/* ユーザーネーム */}
                                                                <Typography style={{fontSize: 13, fontWeight: 'bolder'}}>{commentProfileName(com.userComment)}</Typography>
                                                                {/* 作成日時 */}
                                                                <Typography style={{ marginLeft: 15, marginRight: 15, opacity: 0.5, fontSize: 13 }}>{com.created_at}</Typography>
                                                                {/* 削除ボタン */}
                                                                <BsTrash
                                                                    className={classes.deleteBtn}
                                                                    onClick={() => { deleteComment(com.id) }} />
                                                            </div>
                                                            <div style={{marginTop: 5}}>
                                                                {/* コメント */}
                                                                <Typography>{com.comment}</Typography>
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                </div>
                                            )))
                                        }
                                        <div className={classes.commentField}>
                                            <TextField
                                                id='commentText'
                                                label='comment'
                                                name='comment'
                                                multiline
                                                minRows={2}
                                                style={{
                                                    width: 400,
                                                }}
                                                onChange={handleCreateComment()}
                                            />
                                        </div>
                                        {commentValue ? 
                                            <div className={classes.commentBtn}>
                                                <Button
                                                    variant="contained"
                                                    onClick={() => {
                                                        createComment(post.id);
                                                        resetValue();
                                                    }}
                                                >
                                                    comment
                                                </Button>
                                            </div>
                                        :
                                            <div className={classes.commentBtn}>
                                                <Button
                                                    variant="contained"
                                                    disabled
                                                    onClick={() => {
                                                        createComment(post.id);
                                                        resetValue();
                                                    }}
                                                >
                                                    comment
                                                </Button>
                                            </div>
                                        }
                                    </div>
                                }
                                
                                
                            </>
                        }
                        <div className={classes.dialogClose}>
                            <HighlightOffOutlinedIcon
                                onClick={postDetailCloseDialog} />
                        </div>
                    </div>
                </Dialog>
            </div>
        </>
    );
};

export default PostList
