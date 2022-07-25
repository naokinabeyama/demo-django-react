import { useContext } from 'react';
import { ApiContext } from '../context/ApiContext';

const MyPost = () => {
    const [profile, postFull] = useContext(ApiContext);
     // 自分の全投稿
    const myPostFull = postFull.filter((post) => {
        return post.userPost === profile.userPro
    })
  return (
      <div>{myPostFull}</div>
  )
}

export default MyPost
