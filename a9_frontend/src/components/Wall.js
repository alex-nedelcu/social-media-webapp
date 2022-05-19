import { useState } from "react";
import { getCurrentUser } from "../utils/utils";
import UploadPopup from "./UploadPopup";

const Wall = () => {
    const [uploadPopupVisible, setUploadPopupVisible] = useState(false);
    const user = getCurrentUser();

    return (
        <>
            <button onClick={() => setUploadPopupVisible(true)}>Upload</button>
            {uploadPopupVisible && (
                <UploadPopup
                    closePopup={() => setUploadPopupVisible(false)}
                    user={user}
                />
            )}
            <p>Will include:</p>
            <p>1. A component that allows the user to upload a picture</p>
            <p>2. A list containing all the pictures</p>
        </>
    )
}

export default Wall;