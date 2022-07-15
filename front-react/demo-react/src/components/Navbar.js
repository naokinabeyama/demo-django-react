import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import  IconButton  from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import Avatar from '@material-ui/core/Avatar';
import MenuItem from '@material-ui/core/MenuItem';
import Popover from '@material-ui/core/Popover';
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
    const [forcus, setForcus] = useState(false);
    console.log(forcus)

    // Iconクリック処理
    const handleIcon = () => {
        open ?
            setOpen(false)
            :
            setOpen(true)
    };

    // ログアウトボタンフォーカス処理
    const onFocus = () => {
        setForcus(true);
    };

    const offForcus = () => {
        setForcus(false);
    };

    return (
        <AppBar position='static'>
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
                <Typography variant='h5' className={classes.title}>
                    DEMO SNS
                </Typography>
                {/* 友達申請の数(承認してない) */}
                {/* <Badge className={classes.bg}
                    badgeContent={askList.filter((ask) => {
                        return (
                            ask.approved === false && profiles.filter((item) => {
                                return item.userPro === ask.askFrom
                            })[0]
                        )
                    }).length
                    }
                    color='secondary'>
                    <NotificationsIcon />
                </Badge> */}
                {/* <button className='signOut' onClick={Logout()}>
                    <FiLogOut />
                </button> */}
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
                <Typography
                    aria-owns={forcus ? 'mouse-over-popover' : undefined}
                    aria-haspopup="true"
                    onMouseEnter={onFocus}
                    onMouseLeave={offForcus}
                >
                    aiueo
                </Typography>
                {/* <button className='signOut'>
                    <FiLogOut
                        aria-owns={forcus ? 'mouse-over-popover' : undefined}
                        aria-haspopup="true"
                        onMouseEnter={onFocus}
                        onMouseLeave={offForcus}
                    />
                </button> */}
                <Popover
                    id="mouse-over-popover"
                    open={Boolean(forcus)}
                    anchorEl={forcus}
                    anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                    }}
                    transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                    }}
                    onClose={offForcus}
                    disableRestoreFocus
                >
                    <Typography sx={{ p: 1 }}>
                        I use Popover.
                    </Typography>
                </Popover>
            </Toolbar>
        </AppBar>
    );
};


export default withCookies(Navbar) 
