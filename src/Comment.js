import { Avatar, IconButton } from "@material-ui/core";
import React from "react";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import moment from "moment";
import "./Comment.css";

function Comment({ text, username, profilePic, timestamp }) {
    return (
        <div className="comment">
            <div className="comment__container">
                <Avatar src={profilePic} />
                <div className="comment__info">
                    <span>{username}</span>
                    <p>{text}</p>
                </div>
                <IconButton>
                    <MoreHorizIcon />
                </IconButton>
            </div>
            <div className="comment__reaction">
                <span>like</span>
                <span>reply</span>
                <span>
                    {moment(
                        new Date(timestamp?.toDate()).toUTCString(),
                        "ddd, DD MMM YYYY HH:mm:ss "
                    ).format("DD, MMM HH:mm")}
                </span>
            </div>
        </div>
    );
}

export default Comment;
