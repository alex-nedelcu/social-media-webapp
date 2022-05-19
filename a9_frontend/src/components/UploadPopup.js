import * as Yup from "yup";
import { pictureService } from "../services/picture.service";
import Popup from "./Popup";
import { Form, Formik } from "formik";
import { ButtonsWrapper, Label, LargeFormContainer, MyFileUpload, StyledButton } from "../utils/popup-styles";
import PropTypes from "prop-types";

const UploadPopup = ({ closePopup, user }) => {
    const initialValues = {
        file: undefined,
    };

    const validationSchema = Yup.object().shape({
        file: Yup.mixed().required("File is required!"),
    });

    const handleFormSubmitted = (formValue, actions) => {
        console.log(formValue);
        pictureService.upload(formValue.file)
            .then(response => {
                    console.log(response);
                    closePopup();
                }
            )
            .catch(error => {
                    console.log(error.message);
                }
            )
            .finally(() => actions.setSubmitting(false));
    }

    return (
        <Popup onCancel={closePopup} title="Upload file" large>
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
                        <LargeFormContainer>
                            <Label htmlFor="file">File:</Label>
                            <div style={{ gridColumn: "span 3" }}>
                                <MyFileUpload name="file" setFieldValue={setFieldValue}/>
                            </div>
                        </LargeFormContainer>
                        <ButtonsWrapper>
                            <StyledButton type="submit" primary disabled={isSubmitting}>
                                Submit
                            </StyledButton>
                        </ButtonsWrapper>
                    </Form>
                )}
            </Formik>
        </Popup>
    );
}

UploadPopup.propTypes = {
    closePopup: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
};

export default UploadPopup;