import './User.css';
import { useEffect, useState } from 'react';
import { getNameForUser } from '../../services/apiService';

export function User() {
    const [username, setUsername] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadUsername = async () => {
            try {
                const userId = '1';
                const data = await getNameForUser(userId);
                setUsername(data)
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError("An error ocurred.");
                }
            } finally {
                setIsLoading(false);
            }
        };

        loadUsername();
    });

    return (
        <div className="user-div">
            <img src="/images/user.png" alt="profile picture" />

            <h2>Olá, {username}!</h2>
        </div>
    );
}
