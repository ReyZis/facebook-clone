import React, { useState } from "react";
import "./CommentSender.css";
import { Avatar, Button, IconButton } from "@material-ui/core";
import NearMeIcon from "@material-ui/icons/NearMe";
import { useStateValue } from "./StateProvider";
import db from "./firebase";
import firebase from "firebase";

function CommentSender({ id }) {
    const [{ user }, dispatch] = useStateValue();
    const [input, setInput] = useState("");

    const postComment = (e) => {
        e.preventDefault();


        if (input) {

            db.collection("posts").doc(id).collection("comments").add({
                profilePic: user.photoURL,
                text: input,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                username: user.displayName,
            });
            setInput("");
        }
    };

    return (
        <div className="commentSender">
            <Avatar src={user.photoURL} />
            <div className="commentSender__input">
                <form>
                    <input
                        onChange={(e) => setInput(e.target.value)}
                        value={input}
                        type="text"
                        placeholder="what do you think about this post?"
                    />

                    <IconButton onClick={postComment} type="submit">
                        <NearMeIcon />
                    </IconButton>
                </form>
            </div>
        </div>
    );
}

export default CommentSender;
