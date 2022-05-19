import styled from "styled-components/macro";
import { useField } from "formik";

export const StyledFileInput = styled.input`
  margin: 10px 0 10px 0;
`;

const FileInput = (props) => {
    const [field, meta] = useField(props);

    const { setFieldValue } = props;

    return (
        <div>
            <StyledFileInput
                name={field.name}
                type="file"
                onChange={(event) => {
                    const file = event.target.files[0];
                    setFieldValue(field.name, file);
                }}
            />
        </div>
    );
};

export default FileInput;