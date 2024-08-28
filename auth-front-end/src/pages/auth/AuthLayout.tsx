import {Outlet, useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import {THEME} from "../../theme";
import {useEffect} from "react";
import {isLoggedIn} from "../../utils/authentication";


export default function AuthLayout(): JSX.Element {
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn()) navigate('/', { replace: true });
    }, []);

    return (
        <Container>
            <Card>
                <Outlet/>
            </Card>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
    align-items: center;
    justify-content: center;
`;

const Card = styled.div`
    display: flex;
    flex-direction: column;
    background-color: ${THEME.secondaryBackgroundColour};
    border-radius: 5px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    padding: 20px 40px;
`;