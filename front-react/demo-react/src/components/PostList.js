import { ImageList, ImageListItem, ImageListItemBar, Typography } from '@material-ui/core';
import { useContext } from 'react';
import { ApiContext } from '../context/ApiContext';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    title: {
        marginTop: 40,
        marginBottom: 50,
        textAlign: 'center',

    },
}));



const PostList = () => {
    const classes = useStyles();
    const { postFull } = useContext(ApiContext);


    return (
        <>
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
