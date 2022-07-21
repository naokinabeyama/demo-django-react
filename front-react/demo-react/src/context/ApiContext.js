import {createContext, useState, useEffect} from 'react'
import { withCookies } from 'react-cookie'
import axios from 'axios'


export const ApiContext = createContext();


const ApiContextProvider = (props) => {
    // current-token ログイン認証が成功したトークンが格納されている
    const token = props.cookies.get('current-token');
    // ログインユーザーのプロフィール
    const [profile, setProfile] = useState([]);
    // 全ユーザーのプロフィール
    const [profiles, setProfiles] = useState([])
    // プロフィール更新
    const [editedProfile, setEditedProfile] = useState({
        id: '',
        username: '',
        age: '',
        gender: '',
        introduction: ''
    });
    // プロフィール画像
    const [profileImg, setProfileImg] = useState([]);
    // 友達リスト
    const [friendList, setFriendList] = useState([]);
    // ログインユーザー投稿
    const [post, setPost] = useState([]);
    // 全ユーザー投稿
    const [postFull, setPostFull] = useState([]);
    // 投稿更新
    const [editedPost, setEditedPost] = useState({
        id: '',
        postImage: '',
        title: '',
        text: '',
    });
    // コメント
    const [comment, setComment] = useState([]);
    // お気に入り
    const [favorid, setFavorid] = useState([]);


    // 初期画面
    useEffect(() => {
        console.log(token)
        const getMyProfile = async () => {
            try {
                const resmy = await axios.get('http://localhost:8000/api/user/myprofile/', {
                    headers: {
                        'Authorization': `Token ${token}`
                    }
                });
            } catch {
                console.log('error');
            };
        };
        getMyProfile();
    }, [token, profile.id]);


    // 新規プロフィール作成
    const createProfile = async () => {
        const createData = new FormData();
        // 格納されているユーザーネーム
        createData.append('username', editedProfile.username);
        // 年齢
        createData.append('age', editedProfile.age);
        // 性別
        createData.append('gender', editedProfile.gender);
        // 自己紹介
        createData.apppend('introduce', editedProfile.introduction);
        // プロフィール画像
        profileImg.name && createData.append('img', profileImg, profileImg.name);
        try {
            const res = await axios.post('http://localhost:8000/api/user/profile/', createData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`
                }
            });
            // ログインユーザーのプロフィール
            setProfile(res.data);
            // プロフィール更新
            setEditedProfile({
                id: res.data.id,
                username: res.data.username,
                age: res.data.age,
                gender: res.data.gender,
                introduction: res.data.introduction
            });
        } catch {
            console.log('error');
        };
    };


    // プロフィール削除
    const deleteProfile = async () => {
        try {
            await axios.delete(`http://localhost:8000/api/user/profile/${profile.id}/`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`
                }
            });
            // ユーザーの初期化
            setProfile([]);
            setEditedProfile({
                id: '',
                username: '',
                age: '',
                gender: '',
                introduction: ''
            });
            // プロフィール画像
            setProfileImg([]);
            // 友達リスト 
            setFriendList([]);
            // 投稿
            setPost([]);
            // 投稿更新
            setEditedPost({
                id: '',
                postImage: '',
                title: '',
                text: ''
            });
            // コメント
            setComment([]);
            // お気に入り
            setFavorid([]);
        } catch {
            console.log('error');
        };
    };

    // プロフィール更新
    const editProfile = async () => {
        const editData = new FormData();
        // 格納されているユーザーネーム
        editData.append('username', editedProfile.username);
        // 年齢
        editData.append('age', editedProfile.age);
        // 性別
        editData.append('gender', editedProfile.gender);
        // 自己紹介
        editData.apppend('introduce', editedProfile.introduction);
        // プロフィール画像
        profileImg.name && editData.append('img', profileImg, profileImg.name);
        try {
            const res = await axios.put(`http://localhost:8000/api/user/profile/${profile.id}/`, editData, {
                headers: {
                    'Context-Type': 'application/json',
                    'Authorization': `Token ${token}`
                }
            });
            // プロフィール
            setProfile(res.data);
        } catch {
            console.log('error');
        };
    };


    // 新規投稿作成
    const createPost = async () => {
        const createData = new FormData();
        // 格納されている投稿画像
        createData.append('postImage', editedPost.postImage);
        // タイトル
        createData.append('title', editedPost.title);
        // 説明
        createData.append('text', editedPost.text);
        try {
            const res = await axios.post('http://localhost:8000/api/article/', createData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`
                }
            });
            // ログインユーザーの投稿
            setPost(res.data);
            // 投稿更新
            setEditedPost({
                id: res.data.id,
                postImage: res.data.postImage,
                title: res.data.title,
                text: res.data.text
            });
        } catch {
            console.log('error');
        };
    };


    // 投稿削除
    const deletePost = async () => {
        try {
            await axios.delete(`http://localhost:8000/api/post/article/${post.id}/`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`
                }
            });
            // コメント
            setComment([]);
            // お気に入り
            setFavorid([]);
        } catch {
            console.log('error');
        };
    };


    // 投稿更新
    const editePost = async () => {
        const editData = new FormData();
        // 格納されている投稿画像
        editData.append('postImage', editedPost.postImage);
        // タイトル
        editData.append('title', editedPost.title);
        // 説明
        editData.append('text', editedPost.text);
        try {
            const res = await axios.put(`http://localhost:8000/api/post/article/${post.id}/`, editData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`
                }
            });
            // 投稿
            setPost(res.data);
        } catch {
            console.log('error');
        };
    };


    return (
        <ApiContext.Provider value={{
            profile,
            profiles,
            profileImg,

        }}>
            {props.children}
        </ApiContext.Provider>
    )
}

export default withCookies(ApiContextProvider)
