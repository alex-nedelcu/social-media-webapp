import React from "react";

import PropTypes from "prop-types";
import { Container, CustomIcon, PopupContainer, Title } from "../utils/popup-styles";

const Popup = ({
                   title,
                   children,
                   onCancel,
                   large,
               }) => {
    return (
        <Container>
            <PopupContainer large={large}>
                <div>
                    <Title>{title}</Title>
                    <CustomIcon
                        icon="ci:off-outline-close"
                        color="#bdf841"
                        onClick={onCancel}
                    />
                </div>
                {children}
            </PopupContainer>
        </Container>
    );
};

Popup.propTypes = {
    title: PropTypes.string,
};

Popup.defaultProps = {
};

export default Popup;