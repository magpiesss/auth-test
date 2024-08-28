import { styled } from 'styled-components';
import {useLocation} from "react-router-dom";
import {SuccessMessage} from "../components/commonComponents";

type HomeState = {
    loggedOutSuccessfully: boolean
}

export default function Home(): JSX.Element {
    const { state } = useLocation();
    const { loggedOutSuccessfully } = (state as HomeState) ?? {};

    return (
        <HomeBody>
            {loggedOutSuccessfully && (<SuccessMessage>Logged out successfully.</SuccessMessage>)}
            <h1>Welcome to the auth testing app.</h1>
        </HomeBody>
    );
}

const HomeBody = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;