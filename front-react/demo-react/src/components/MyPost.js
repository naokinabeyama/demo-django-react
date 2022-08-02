import { useContext } from 'react';
import { ApiContext } from '../context/ApiContext';
import ImageListItem from "@material-ui/core/ImageListItem";
import ImageListItemBar from "@material-ui/core/ImageListItemBar";
import ImageList from "@material-ui/core/ImageList";
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    postTitle: {
        margin: 40,
        textAlign: 'center',

    },
}));



const MyPost = () => {
    const classes = useStyles();
    const { profile, postFull } = useContext(ApiContext);

    //自分の全投稿
    const myPostFull = postFull.filter((post) => {
        return post.userPost === profile.userPro
    });
    
    return (
        <div>
            {/* タイトル */}
            <Typography variant='h4' className={classes.postTitle}>List of articles</Typography>
            {/* 画像一覧 */}
            <ImageList style={{ width: 900, height: 600, margin: '0 auto' }} cols={3}>
                {/* 画像の有無 */}
                {myPostFull && (
                    myPostFull.map((mypost) => (
                        <ImageListItem key={mypost.id} style={{height: 300}}>
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
        </div>
    );
};

export default MyPost
