import { getCurrentUser } from "../utils/utils";

import UploadForm from "./UploadForm";
import { useEffect, useState } from "react";
import { pictureService } from "../services/picture.service";
import { Image } from "react-native";


const Wall = () => {
    const [pictures, setPictures] = useState([]);
    const [uploaded, setUploaded] = useState(false);
    const user = getCurrentUser();

    const convertToImageComponents = (pictures) => {
        return pictures.map(picture => {
            console.log("Processing picture: " + JSON.stringify({ ...picture, decompressed: "" }));
            const base64Picture = `data:${picture.type};base64,${picture.decompressed}`;
            return <Image key={picture.id} style={{ width: 50, height: 50 }} source={{ uri: base64Picture }}/>
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
            <UploadForm user={user} setUploaded={setUploaded}/>
            {pictures}
        </>

    )
}

export default Wall;