import styled from "styled-components";
import TextInput from "./components/TextInput";
import React, {useState} from "react";
import {ErrorMessage, Form} from "../../components/commonComponents";
import {useNavigate} from "react-router-dom";
import {register} from "../../utils/authentication";

export default function Register() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const [registering, setRegistering] = useState(false);
    const [registrationError, setRegistrationError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setRegistering(true);
        setRegistrationError(null);

        const response = await register(email, password, name);

        if (!response.success) {
            setRegistrationError(response.error!);
            setRegistering(false);
            return;
        }

        navigate('/auth', { state: { registerSuccess: true } });
    }

    return (
        <>
            <HeaderSection>
                <h1>Register</h1>
            </HeaderSection>
            <Form onSubmit={handleSubmit}>
                <TextInput label='Name*' value={name} setValue={setName} type='text' />
                <TextInput label='Email*' value={email} setValue={setEmail} type='email' />
                <TextInput label='Password*' value={password} setValue={setPassword} type='password' />
                {registrationError && (<ErrorMessage>{registrationError}</ErrorMessage>)}
                <SubmitButton type='submit' disabled={registering}>{registering ? 'Registering...' : 'Register'}</SubmitButton>
            </Form>
        </>
    );
}

const HeaderSection = styled.div`
    display: flex;
    margin-bottom: 10px;
    justify-content: center;
`;

const SubmitButton = styled.button`
    margin-top: 20px;
    width: 100%;
`;