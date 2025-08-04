import { useNavigate } from 'react-router-dom';
import './Buttons.css';


export function PayButton() {
    const navigate = useNavigate();
    const handlePayClick = () => {
        navigate('/pay');
    };
    return (
        <button className="button" onClick={handlePayClick}>
            <img src="/images/paybtn.png" alt="Pay Button" />
            <h3>Pay</h3>
        </button>
    );
}

export function ReceiveButton() {
    const navigate = useNavigate();
    const handleReceiveClick = () => {
        navigate('/pay');  //temp
    };
    return (
        <button className="button" onClick={handleReceiveClick}>
            <img src="/images/receivebtn.png" alt="Receive Button" />
            <h3>Receive</h3>
        </button>
    );
}

export function HideButton({ isVisible, onToggle }) {
    const imageUrl = isVisible ? "/images/visible.png" : "/images/invisible.png";
    const altText = isVisible ? "Hide balance" : "Show balance";

    return (
        <button className="hide-button" onClick={onToggle}>
            <img src={imageUrl} alt={altText} />
        </button>
    );
}
