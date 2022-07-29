import ListSubheader from "@material-ui/core/ListSubheader";
import ImageListItem from "@material-ui/core/ImageListItem";
import ImageListItemBar from "@material-ui/core/ImageListItemBar";
import ImageList from "@material-ui/core/ImageList";


const MyPost = ({myPostData, myPostImg}) => {
    // const post = () => {
    //     myPostImg.postImage.forEach((item) => {
    //         return(
    //         <ImageListItem key={item.id}>
    //         <img
    //             src={item.postImage}
    //             alt={item.title}
    //             loading="lazy"
                
    //             />
    //         <ImageListItemBar title={item.title} />
    //     </ImageListItem>)
    //     });
    // }
    // console.log({post})
    
    return (
        <>
            
            <ImageList style={{ width: 700, height: 450, margin: '0 auto' }} cols={3}>
                    {/* {post} */}
                    {/* {myPostImg.map((item) => (
                        <ImageListItem key={item.id}>
                            <img
                                src={item.postImage}
                                srcSet={item.postImage}
                                alt={item.title}
                                loading="lazy"
                                
                            />
                            <ImageListItemBar title={item.title} />
                        </ImageListItem>
                    ))}; */}
                
                        {/* <ImageListItem key={myPostData.id}>
                            <img
                                src={myPostData.postImage}
                                alt={myPostData.title}
                                loading="lazy"
                                
                            />
                            <ImageListItemBar title={myPostData.title} />
                        </ImageListItem> */}
                </ImageList>
            
        </>
    );
};

export default MyPost
