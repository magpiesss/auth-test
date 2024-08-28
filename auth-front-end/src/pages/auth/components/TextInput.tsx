import React, {useId} from "react";
import styled from "styled-components";
import {THEME} from "../../../theme";

export default function TextInput({label, value, setValue, type}: { label: string; value: string; setValue: Function; type: string }): JSX.Element {
    const id = useId();

    return (
        <InputGroup>
            <SecondaryTextLabel htmlFor={id}>{label}</SecondaryTextLabel>
            <input type={type} id={id} required value={value} onChange={(e) => setValue(e.target.value)} />
        </InputGroup>
    );
}

const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
`;

const SecondaryTextLabel = styled.label`
    color: ${THEME.secondaryTextColour};
`;