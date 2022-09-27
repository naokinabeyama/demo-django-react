import MyProfile from './MyProfile'
import MyPost from './MyPost'
import { makeStyles } from '@material-ui/core/styles';






const useStyles = makeStyles((theme) => ({
  centerLine: {
    marginTop: 130,
    margin: '0 auto',
    borderTop: 'double 4px',
    color: 'gray',
    width: '80%',
  },
}));


const Main = () => {
  const classes = useStyles();


  return (
    <>
        <MyProfile />
        <div className={classes.centerLine}></div>
        <MyPost />
    </>
  )
}

export default Main
