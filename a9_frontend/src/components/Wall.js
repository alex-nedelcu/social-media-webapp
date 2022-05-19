import { getCurrentUser } from "../utils/utils";

import UploadForm from "./UploadForm";
import { useEffect, useState } from "react";
import { pictureService } from "../services/picture.service";
import { Image } from "react-native";


const Wall = () => {
    const [pictures, setPictures] = useState([]);
    const [uploaded, setUploaded] = useState(false);
    const user = getCurrentUser();

    const handleVoteFormSubmitted = (event) => {
        const pictureId = event.target.id;
        const vote = event.target.voteInput.value;
        console.log(`Picture with id ${pictureId} was voted with ${vote}`);

        pictureService.vote(pictureId, vote).then(
            () => {
                pictureService.getPictures().then(
                    response => {
                        setPictures(convertToImageComponents(response.data));
                    }
                );
            }, error => {
                console.log("Error: " + error);
            }
        );
        event.preventDefault();
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
                                    <input type="submit" value="Vote"/>
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
                setUploaded(false);
            }
        );
    }, [uploaded]);

    return (
        <>
            <div style={{ marginBottom: '30px' }}>
                <UploadForm user={user} setUploaded={setUploaded}/>
            </div>
            {pictures}
        </>

    )
}

export default Wall;