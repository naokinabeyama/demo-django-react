import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import  IconButton  from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import Avatar from '@material-ui/core/Avatar';
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from '@material-ui/core/Tooltip'
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Badge from '@material-ui/core/Badge';
import { FiLogOut } from 'react-icons/fi';
import { withCookies } from 'react-cookie';
import { useContext, useState } from 'react';
import { ApiContext } from '../context/ApiContext';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import { Link, useHistory } from 'react-router-dom';




const useStyles = makeStyles((theme) => ({

    bg: {
        marginRight: theme.spacing(1),
    },
    title: {
        flexGrow: 1,
        marginLeft: 30,
        fontSize: 30,
        fontFamily: 'Courier New',
    },
}));


const Navbar = (props) => {
    const history = useHistory();
    const classes = useStyles();
    const { profile } = useContext(ApiContext);
    // ログアウト
    const Logout = () => event => {
        props.cookies.remove('current-token');
        window.location.href = '/';
    };
    // サイドバー
    const [sideOpen, setSideOpen] = useState(false);



    //サイドバークリック処理
    const handleSideBar = () => {
        sideOpen ?
            setSideOpen(false)
            :
            setSideOpen(true)
    };

    //myprofileに遷移
    const handleMyProfile = () => {
        history.push({
            pathname: '/myprofile',
        })
    }

    return (
        <AppBar position='static'>
            {/* ハンバーガーメニュー */}
            <Toolbar>
                <IconButton
                    size="medium"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                    onClick={handleSideBar}
                >
                    <MenuIcon />
                    <Drawer
                        open={sideOpen}
                        onClose={handleSideBar}
                    >
                        <Box sx={{ width: 250 }}>
                            <List>
                                <ListItemText>
                                    <Link to='/profileList'>
                                        ProfilesList
                                    </Link>
                                </ListItemText>
                                <ListItemText>
                                    <Link to='/postList'>
                                        PostList
                                    </Link>
                                </ListItemText>
                                
                            </List>
                            
                        </Box>
                    </Drawer>
                </IconButton>

                {/* タイトル */}
                <Typography variant='h5' className={classes.title}>
                    DEMO SNS
                </Typography>

                {/* 画像アイコン */}
                <div>
                    <IconButton
                        size="medium"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        color="inherit"
                        onClick={handleMyProfile}
                    >
                        {profile.img ?
                            <Avatar alt="userImage" src={profile.img} />
                            :
                            <Avatar alt="userImage" src='http://127.0.0.1:8000/media/sampleImage/null.png' />
                        }
                    </IconButton>
                    <Menu
                        anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                        }}
                    >
                    </Menu>
                </div>

                {/* ログアウトアイコン */}
                <Tooltip title='Logout'>
                    <button className='signOut' onClick={Logout()}>
                        <FiLogOut />
                    </button>
                </Tooltip>
            </Toolbar>
        </AppBar>
    );
};


export default withCookies(Navbar) 
