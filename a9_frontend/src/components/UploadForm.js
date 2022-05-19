import * as Yup from "yup";
import { pictureService } from "../services/picture.service";
import { Form, Formik } from "formik";
import PropTypes from "prop-types";
import FileInput from "./FileInput";

const UploadForm = ({ user, setUploaded }) => {
    const initialValues = {
        file: undefined,
    };

    const validationSchema = Yup.object().shape({
        file: Yup.mixed().required("File is required!"),
    });

    const handleFormSubmitted = (formValue, actions) => {
        pictureService.upload(formValue.file)
            .then(response => {
                    console.log("Success response: " + JSON.stringify(response.data));
                    setUploaded(true);
                }
            )
            .catch(error => {
                    console.log("Error: " + error.message);
                }
            )
            .finally(() => actions.setSubmitting(false));
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleFormSubmitted}
        >
            {({
                  errors,
                  touched,
                  handleSubmit,
                  isSubmitting,
                  isValid,
                  setFieldValue,
              }) => (
                <Form
                    style={{
                        flexGrow: "1",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <div style={{ gridColumn: "span 3" }}>
                        <FileInput name="file" setFieldValue={setFieldValue}/>
                    </div>
                    <div style={{ gridColumn: "span 3" }}>
                        <button type="submit" disabled={isSubmitting}>
                            Submit
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    );
}

UploadForm.propTypes = {
    user: PropTypes.object.isRequired,
};

export default UploadForm;