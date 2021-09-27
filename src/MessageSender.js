import { Avatar, Button } from "@material-ui/core";
import React, { useState } from "react";
import "./MessageSender.css";
import VideocamIcon from "@material-ui/icons/Videocam";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";
import InsertEmptionIcon from "@material-ui/icons/InsertEmoticon";
import CancelIcon from "@material-ui/icons/Cancel";
import ImageUploading from "react-images-uploading";
import { useStateValue } from "./StateProvider";
import db from "./firebase";
import firebase from "firebase";

function MessageSender() {
    const [{ user }, dispatch] = useStateValue();

    const [input, setInput] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [image, setImage] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        input &&
            db.collection("posts").add({
                message: input,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                profilePic: user.photoURL,
                username: user.displayName,
                image: imageUrl,
            });

        setInput("");
        setImageUrl("");
    };

    const handleImage = (imageList, addUpdateIndex) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        setImage(imageList[0]);
    };

    return (
        <div className="messageSender">
            <div className="messageSender__top">
                <Avatar src={user.photoURL} />
                <form>
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="messageSender__input"
                        placeholder={`What's on your mind, ${user.displayName}?`}
                    />
                    <input
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        placeholder="image URL (optional)"
                    />
                    <button onClick={handleSubmit} type="submit">
                        Hidden submit
                    </button>
                </form>
            </div>
            <div className="messageSender__middle">
                {/* I commented this just in case */}
                {/* <div className="messageSender__option">
                    <PhotoLibraryIcon style={{ color: "#00A400" }} />
                    <h3>Photo</h3>
                </div> */}

                <ImageUploading
                    value={image}
                    onChange={handleImage}
                    dataURLKey="data_url"
                >
                    {({ onImageUpload, isDragging, dragProps }) => (
                        <div
                            className="messageSender__option"
                            onClick={onImageUpload}
                        >
                            <PhotoLibraryIcon style={{ color: "#00A400" }} />
                            <h3>Photo</h3>
                        </div>
                    )}
                </ImageUploading>

                <Button onClick={handleSubmit}>Post</Button>
            </div>

            {image && (
                <div className="messageSender__bottom">
                    <img
                        src={image.data_url}
                        alt="we couldn't upload your image"
                    />
                    <CancelIcon onClick={() => setImage(null)} />
                </div>
            )}
        </div>
    );
}

export default MessageSender;
