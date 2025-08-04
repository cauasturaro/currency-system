import './User.css';

export function User() {
    const username = "Cauã Sturaro"

    return (
        <div className="user-div">
            <img src="/images/user.png" alt="profile picture" />

            <h2>Olá, {username}!</h2>
        </div>
    );
}
