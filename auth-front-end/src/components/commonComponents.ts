import styled from "styled-components";
import {THEME} from "../theme";

export const NavBar = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: ${THEME.secondaryBackgroundColour};
    padding: 20px;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    align-items: center;
`;

export const SuccessMessage = styled.p`
    background-color: #E6F9E6;
    padding: 0.5rem 1rem;
    border-radius: 5px;
`;

export const ErrorMessage = styled.p`
    padding: 0.5rem 1rem;
    border-radius: 5px;
    background-color: #FFE6E6;
`