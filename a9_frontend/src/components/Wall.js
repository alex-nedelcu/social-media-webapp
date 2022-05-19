import { getCurrentUser } from "../utils/utils";

import UploadForm from "./UploadForm";
import { useEffect, useState } from "react";
import { pictureService } from "../services/picture.service";
import { Image } from "react-native";
import TopPictures from "./TopPictures";


const Wall = () => {
    const [pictures, setPictures] = useState([]);
    const [rankingPictures, setRankingPictures] = useState([]);
    const [uploaded, setUploaded] = useState(false);
    const user = getCurrentUser();

    const handleVoteFormSubmitted = (event) => {
        const pictureId = event.target.id;
        const vote = event.target.voteInput.value;
        event.target.voteButton.disabled = true;
        console.log(`Picture with id ${pictureId} was voted with ${vote}`);

        pictureService.vote(pictureId, vote).then(
            () => {
                pictureService.getPictures().then(
                    response => {
                        setPictures(convertToImageComponents(response.data));
                        setRankingPictures(convertToRankingPictures(response.data));
                    }
                );
            }, error => {
                console.log("Error: " + error);
            }
        );
        event.preventDefault();
    }


    const convertToRankingPictures = (pictures) => {
        return pictures
            .sort((a, b) => b.score - a.score)
            .map(picture => {
                const base64Picture = `data:${picture.type};base64,${picture.decompressed}`;
                return (
                    <div key={picture.id} style={{ marginBottom: '15px' }}>
                        <Image key={picture.id} style={{ width: 50, height: 50 }} source={{ uri: base64Picture }}/>
                        <p>Posted by '{picture.ownerUsername}' (id={picture.id}, score={picture.score})</p>
                    </div>
                )
            })
    }

    const convertToImageComponents = (pictures) => {
        return pictures
            .sort((a, b) => a.id - b.id)
            .map(picture => {
                console.log("Processing picture: " + JSON.stringify({ ...picture, decompressed: "" }));
                const base64Picture = `data:${picture.type};base64,${picture.decompressed}`;
                const text = `Vote picture #${picture.id}: `

                return (
                    <div key={picture.id} style={{ marginBottom: '15px' }}>
                        <Image key={picture.id} style={{ width: 50, height: 50 }} source={{ uri: base64Picture }}/>
                        <p>Current score: {picture.score}</p>
                        {
                            picture.accountId !== user.id && (
                                <form id={picture.id} onSubmit={(event) => handleVoteFormSubmitted(event)}>
                                    <label htmlFor="voteInput">{text}</label>
                                    <input type="number" name="voteInput" id="voteInput"/>
                                    <input type="submit" value="Vote" id="voteButton"/>
                                </form>
                            )
                        }
                    </div>
                )
            })
    }

    useEffect(() => {
        pictureService.getPictures().then(
            response => {
                setPictures(convertToImageComponents(response.data));
                setRankingPictures(convertToRankingPictures(response.data));
                setUploaded(false);
            }
        );
    }, [uploaded]);

    return (
        <>
            <div style={{
                flexGrow: "1",
                display: "flex",
                flexDirection: "row",
            }}
            >
                <div style={{ marginRight: "150px" }}>
                    <div style={{ marginBottom: "30px" }}>
                        <UploadForm user={user} setUploaded={setUploaded}/>
                    </div>
                    {pictures}
                </div>
                <div>
                    <TopPictures pictures={rankingPictures}/>
                </div>
            </div>
        </>

    )
}

export default Wall;