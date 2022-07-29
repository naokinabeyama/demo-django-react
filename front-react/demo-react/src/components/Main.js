
import MyProfile from './MyProfile'
import MyPost from './MyPost'
import { useContext } from 'react';
import {ApiContext} from '../context/ApiContext';

const Main = () => {
  const { profile, postFull } = useContext(ApiContext);
  
  //自分の全投稿
  const myPostFull = postFull.filter((post) => {
      return post.userPost === profile.userPro
  });
  const myPostList = myPostFull && (myPostFull.map((mypost) => 
    <MyPost key={mypost.id} myPostData={mypost} myPostImg={myPostFull} />
  ));

  return (
    <>
      <MyProfile />
      {myPostList}
    </>
  )
}

export default Main
