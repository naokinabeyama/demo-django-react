import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import  IconButton  from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import Avatar from '@material-ui/core/Avatar';
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from '@material-ui/core/Tooltip';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Badge from '@material-ui/core/Badge';
import { FiLogOut } from 'react-icons/fi';
import { withCookies } from 'react-cookie';
import { useContext, useState } from 'react';
// import { ApiContext } from '../context/ApiContext';



const useStyles = makeStyles((theme) => ({

    bg: {
        marginRight: theme.spacing(1),
    },
    title: {
        flexGrow: 1,
        textAlign: 'center',
    },
}));


const Navbar = (props) => {
    const classes = useStyles();
    // const { askList, profiles } = useContext(ApiContext);
    const Logout = () => event => {
        props.cookies.remove('current-token');
        window.location.href = '/';
    };
    const [open, setOpen] = useState(false);


    // Iconクリック処理
    const handleIcon = () => {
        open ?
            setOpen(false)
            :
            setOpen(true)
    };

    return (
        <AppBar position='static'>
            {/* ハンバーガーメニュー */}
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                    <MenuIcon />
                </IconButton>

                {/* タイトル */}
                <Typography variant='h5' className={classes.title}>
                    DEMO SNS
                </Typography>

                {/* 画像アイコン */}
                <div>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleIcon}
                        color="inherit"
                    >
                        <Avatar alt="userImage" src="/static/images/man-3403180_1920.jpg" />
                    </IconButton>
                    <Menu
                        anchorEl={open}
                        anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                        }}
                        open={Boolean(open)}
                        onClose={handleIcon}
                    >
                        <MenuItem>My account</MenuItem>
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
