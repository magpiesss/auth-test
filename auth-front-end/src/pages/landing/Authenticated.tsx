import {Outlet, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {isLoggedIn} from "../../utils/authentication";

export default function Authenticated(): JSX.Element {
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn()) navigate('/', { replace: true });
    }, []);

    return <Outlet />
}