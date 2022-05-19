import { Icon } from "@iconify/react";
import { css } from "styled-components";
import styled from "styled-components/macro";
import { useField } from "formik";

export const Container = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  background: rgba(0, 0, 0, 0.2);
  z-index: 10;
  top: 0;
`;

export const PopupContainer = styled.div`
  min-width: 500px;
  min-height: 200px;
  background-color: white;
  border-radius: 34px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px 60px;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;

  ${({ large }) =>
          large &&
          css`
            min-width: 700px;
          `}
`;

export const Title = styled.div`
  font-size: large;
  display: inline;
`;

export const CustomIcon = styled(Icon)`
  display: inline;
  float: right;
  font-size: 1.6em;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;

  gap: 20px;
`;


export const Label = styled.label`
  color: #005382;
`;

export const Input = styled.input``;

export const Select = styled.select``;

export const FormContainer = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  margin: 20px 0px;

  row-gap: 15px;
  column-gap: 10px;
  align-items: baseline;
`;

export const LargeFormContainer = styled(FormContainer)`
  grid-template-columns: 1fr 1fr 1fr 1fr;
`;

export const StyledFileInput = styled.input`
  margin: 10px 0px 10px 0px;
`;

export const MyFileUpload = (props) => {
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

export const StyledButton = styled.button`
  background: ${(props) => (props.primary ? props.theme.main : "white")};
  border-radius: 12px;
  border: ${(props) => (props.primary ? "none" : "solid")};
  border-color: ${(props) => props.theme.main};
  width: 150px;
  height: 45px;
  font-size: 18px;
  font-weight: 700;
  color: ${(props) => (props.primary ? "white" : props.theme.main)};

  &:active,
  &:focus,
  &:hover {
    cursor: pointer;
  }

  &:disabled {
    background-color: #7c8b94;
    box-shadow: none;

    &:hover,
    &:focus {
      cursor: not-allowed;
    }
  }
`;
