import { useContext } from 'react';
import { ApiContext } from '../context/ApiContext';

const MyPost = () => {
    const { profile, postFull } = useContext(ApiContext);

    //自分の全投稿
    const myPostFull = postFull.filter((post) => {
        return post.userPost === profile.userPro
    });
    // const myPostFull = postFull.map((post) => {
    //     return post.userPost
    // })
    const myPost = myPostFull.map((mypost) => {
        return <p>{mypost}</p>
    })
    console.log(myPost[0].title)
    console.log(postFull)
    return (
        <>
            {myPost.title}
        </>
    );
};

export default MyPost
