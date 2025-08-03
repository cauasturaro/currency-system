import { useNavigate } from 'react-router-dom';
import './Buttons.css';

export function PayButton() {
    const navigate = useNavigate();

    const handlePayClick = () => {
        navigate('/pay');
    }

    return(
        <button className="button" onClick={handlePayClick}>
            <img src="https://placehold.co/90x90" alt="Pay Button"></img>
            <h3>Pay</h3>
        </button>
    );
}

export function ReceiveButton() {
    const navigate = useNavigate();

    const handleReciveClick = () => {
        navigate('/pay'); // change later
    }

    return(
        <button className="button" onClick={handleReciveClick}>
            <img src="https://placehold.co/90x90" alt="Recive Button"></img>
            <h3>Recive</h3>
        </button>
    );
}