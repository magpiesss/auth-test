type ApiResponse = {
    error?: string;
    success: boolean;
}

export async function register(email: string, password: string, userName: string): Promise<ApiResponse> {
    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/user/register`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: userName,
            email: email,
            password: password,
        })
    });

    if (!response.ok) {
        const errorBody = await response.json();

        return { success: false, error: errorBody?.error ? errorBody.error : response.statusText };
    }

    return { success: true };
}

export async function login(email: string, password: string): Promise<ApiResponse> {
    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/user/login`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: email,
            password: password,
        })
    });

    if (!response.ok) {
        const errorBody = await response.json();

        return { success: false, error: errorBody?.error ? errorBody.error : response.statusText };
    }

    const responseObject = await response.json();

    localStorage.setItem('token', responseObject.token);

    return { success: true };
}

export function logout(): void {
    localStorage.removeItem('token');
}

export function isLoggedIn(): boolean {
    const token = localStorage.getItem('token');

    return !!token;
}