import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, Link } from "react-router-dom";
import "./blog_page.css";
import { auth, db, logout } from "../../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import Post from "../blog/blog";
import { toast } from "react-toastify";
import Avatar from "@material-ui/core/Avatar";


let images = [
  "https://images.unsplash.com/photo-1637014387463-a446e89abb68?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1637019838019-5f14d84ee308?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1471516145542-072ca3be18c4?ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY2ODkyNTczNg&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1666901945699-f49fbf6386b8?ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY2ODkyNTgxMQ&ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
]


function BlogPage() {
  const [user, loading] = useAuthState(auth);
  const [posts, setPosts] = useState([]);
  const [userdata, setData] = useState("");
  const navigate = useNavigate();
  
  useEffect(() => {
    let url = 'https://jsonplaceholder.typicode.com/posts'
    if (!user){
      url = 'https://jsonplaceholder.typicode.com/posts'
    }
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setPosts(data)
      })
      .catch((error) => {
        toast("Unable to get Post Data");
      });
  }, []);

  useEffect(() => {
    if (loading) return;
    const fetchUserData = () => {
      try {
        const q = query(collection(db, "users"), where("uid", "==", user?.uid));
        const doc = getDocs(q);
        doc.then((temp_data) => {
          console.log(temp_data)
          const data = temp_data.docs[0]?.data();
          setData(data);
        })
        .catch((error) => {
          toast(error);
        })
      } catch(err) {
        toast("Not able to fetch user data");
      }
    };
    if (user) {
      fetchUserData();
    }
  }, [user, loading, navigate]);

  return (
    <div className="app">
      <div className="app__header">
        <div className="app__headerWrapper">
          <strong>Blog Posts</strong>
          { !user ?
            <div className="app__headerButtons">
              <Link to="/login"><button className="primary__button">Login</button></Link>
              <Link to="/register"><button className="text__button">Signup</button></Link>
            </div>
          :
            <div className="app__headerButtons">
              <Avatar
                className="post__avatar"
                alt={user?.email}
                src="/static/images/avatar/1.jpg"
              />
              <button className="text__button" onClick={logout}>Logout</button>
            </div>
          }
        </div>
      </div>
      <div className="timeline">
        {posts.map((post) => (
        <Post
          key={post.id}
          blog_id={post.id}
          user_id={post.userId}
          title={post.title}
          description={post.body}
          imageUrl={images[Math.floor(Math.random() * 4)]}
          userData={userdata}
        />
      ))}
      </div>
    </div>
  );
}
export default BlogPage;