import styled from "styled-components"
import React, {useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import TextInput from "./components/TextInput";
import {ErrorMessage, Form, SuccessMessage} from "../../components/commonComponents";
import {login} from "../../utils/authentication";

type LoginState = {
    registerSuccess: boolean;
};

export default function Login() {
    const { state } = useLocation();
    const navigate = useNavigate();

    const { registerSuccess } = (state as LoginState) ?? {};

    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setSubmitting(true);
        setError(null);

        const response = await login(email, password);

        if (!response.success) {
            setSubmitting(false);
            setError(response.error!);
            return;
        }

        setSubmitting(false);
        navigate('/landing', { state: { authenticationSuccess: true } });
    }

    return (
        <>
            <HeaderSection>
                <h1>Login</h1>
            </HeaderSection>
            {registerSuccess && (
                <SuccessMessage>
                    Registration successful. Please login to continue.
                </SuccessMessage>
            )}
            <Form onSubmit={handleSubmit}>
                <TextInput label='Email*' value={email} setValue={setEmail} type={'email'} />
                <TextInput label='Password*' value={password} setValue={setPassword} type={'password'} />
                {error && <ErrorMessage>{error}</ErrorMessage>}
                <SubmitButton type="submit" disabled={submitting}>{submitting ? 'Submitting...' : 'Log in'}</SubmitButton>
                <div>
                    <Link to="/auth/register">Register</Link>
                </div>
            </Form>
        </>
    );
}

const SubmitButton = styled.button`
    margin-top: 20px;
    width: 100%;
`;

const HeaderSection = styled.div`
    display: flex;
    margin-bottom: 10px;
    justify-content: center;
`;