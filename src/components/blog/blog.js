import Avatar from "@material-ui/core/Avatar";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";

function Post({blog_id, user_id, title, description, imageUrl, userData }) {
    const [user, loading] = useAuthState(auth);

    return (
        <div className="post">
        <div className="post__header">
            <span>
            <Avatar
            className="post__avatar"
            alt={String(user_id)}
            src="/static/images/avatar/1.jpg"
            />
            { user && user_id === userData.user_id ?
                <span>
                    <button className="text_button">Edit</button>
                    <button className="text__button">Delete</button>
                </span>
                :
                <></>
            }
            </span>
            <h3>{title}</h3>
        </div>
        <img className="post__image" src={imageUrl} alt={blog_id} />
        <h4 className="post__text">
            {description}
        </h4>
        </div>
    );
}

export default Post;