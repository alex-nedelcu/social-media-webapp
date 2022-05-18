import ImageUploading from 'react-images-uploading';
import { useState } from "react";
import { pictureService } from "../services/picture.service";

const PictureUploader = () => {
    const [pictures, setPictures] = useState([]);

    const onChange = () => {
        pictureService.getPictures().then(
          response => {
              console.log("Pictures:" + response.data);
              setPictures(response.data);
          }
        );
    };


    return (
        <div>
            <ImageUploading
                multiple
                value={pictures}
                onChange={onChange}
                dataURLKey="data_url"
            >
                {
                    ({
                         imageList,
                         onImageUpload,
                         onImageRemove,
                         isDragging,
                         dragProps,
                     }) => (
                        // write your building UI
                        <div className="upload__image-wrapper">
                            <button
                                style={isDragging ? { color: 'red' } : undefined}
                                onClick={onImageUpload}
                                {...dragProps}
                            >
                                Click or Drop here
                            </button>
                            &nbsp;
                            {imageList.map((image, index) => (
                                <div key={index} className="image-item">
                                    <img src={image['data_url']} alt="" width="100"/>
                                    <div className="image-item__btn-wrapper">
                                        <button onClick={() => onImageRemove(index)}>Remove</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )
                }
            </ImageUploading>
        </div>
    );
}

export default PictureUploader;