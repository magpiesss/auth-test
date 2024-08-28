import {useEffect} from "react";
import {useLocation} from "react-router-dom";
import {SuccessMessage} from "../../components/commonComponents";
import {useDispatch} from "react-redux";
import {fetchUser} from "../../redux/userSlice";
import {AppDispatch, useAppSelector} from "../../redux/store";

type UserDetailsState = {
    authenticationSuccess: boolean
}

export default function UserDetails() {
    const { state } = useLocation();
    const dispatch = useDispatch<AppDispatch>();
    const user = useAppSelector((state) => state.user.user);
    const loading = useAppSelector((state) => state.user.loading);
    const error = useAppSelector((state) => state.user.error);

    const { authenticationSuccess } = (state as UserDetailsState) ?? {};

    useEffect(() => {
        dispatch(fetchUser());
    }, []);

    return (
        <>
            {authenticationSuccess && (<SuccessMessage>Logged in successfully!</SuccessMessage>)}
            {loading && (<p>Loading...</p>)}
            {error && (<p>{error}</p>)}
            {user && (
                <div>
                    <h1>Welcome {user.name}.</h1>
                    <p>Your id is {user.id} and your email is {user.email}.</p>
                    <p>Have a nice day!</p>
                </div>

            )}
        </>
    );
}