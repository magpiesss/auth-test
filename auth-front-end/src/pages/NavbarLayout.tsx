import {Outlet, useNavigate} from 'react-router-dom';
import {NavBar} from "../components/commonComponents";
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {isLoggedIn, logout} from "../utils/authentication";

export default function NavbarLayout(): JSX.Element {
    const navigate = useNavigate();

    function handleLogout() {
        logout();

        navigate('/', { replace: true, state: { loggedOutSuccessfully: true } });
    }

    return (
        <>
            <NavBar>
                <Link to='/'>Home</Link>
                {isLoggedIn() ? (
                    <button onClick={handleLogout}>Log out</button>
                ) : (
                    <Link to='/auth'>Log in</Link>
                )}
            </NavBar>
            <Body>
                <Outlet/>
            </Body>
        </>
    )
}

const Body = styled.div`
    display: flex;
    flex-direction: column;
    padding: 30px;
`;