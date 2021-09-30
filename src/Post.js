import React, { useEffect, useState } from "react";
import "./Post.css";
import { Avatar } from "@material-ui/core";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import NearMeIcon from "@material-ui/icons/NearMe";
import { ExpandMoreOutlined } from "@material-ui/icons";
import CommentSender from "./CommentSender";
import Comment from "./Comment";
import db from "./firebase";

function Post({ profilePic, image, username, timestamp, message, id }) {
    const [comments, setComments] = useState([]);
    const [hidden, setHidden] = useState(true);

    const showComments = (e) => {
        hidden ? setHidden(false) : setHidden(true);
    };

    useEffect(() => {
        db.collection("posts")
            .doc(id)
            .collection("comments")
            .orderBy("timestamp", "desc")
            .onSnapshot((snapshot) =>
                setComments(
                    snapshot.docs.map((doc) => ({
                        id: doc.id,
                        data: doc.data(),
                    }))
                )
            );
    }, []);

    return (
        <div className="post">
            <div className="post__top">
                <Avatar src={profilePic} className="post__avatar" />
                <div className="post__topInfo">
                    <h3>{username}</h3>
                    <p>{new Date(timestamp?.toDate()).toUTCString()}</p>
                </div>
            </div>

            {message && (
                <div className="post__bottom">
                    <p>{message}</p>
                </div>
            )}

            {image && (
                <div className="post__image">
                    <img src={image} />
                </div>
            )}

            <div className="post__options">
                <div className="post__option">
                    <ThumbUpIcon />
                    <p>like</p>
                </div>

                <div
                    className="post__option"
                    onClick={(e) => {
                        hidden ? setHidden(false) : setHidden(true);
                    }}
                >
                    <ChatBubbleOutlineIcon />
                    <p>Comment</p>
                </div>

                <div className="post__option">
                    <NearMeIcon />
                    <p>Share</p>
                </div>

                <div className="post__option">
                    <AccountCircleIcon />
                    <ExpandMoreOutlined />
                </div>
            </div>

            {!hidden && (
                <div className="post__comments">
                    <CommentSender id={id} />
                    {comments.length == 0 ? (
                        "there in no commentson this post"
                    ) : (
                        <>
                            {comments.map((comment) => (
                                <Comment
                                    username={comment.data.username}
                                    text={comment.data.text}
                                    profilePic={comment.data.profilePic}
                                    timestamp={comment.data.timestamp}
                                />
                            ))}
                        </>
                    )}
                </div>
            )}
        </div>
    );
}

export default Post;
