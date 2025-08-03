import { User } from "../../components/user/User";
import { History } from "../../components/history/History";
import { PayButton, ReceiveButton } from "../../components/buttons/Buttons";

import './Home.css';

export function HomePage() {
    return(
        <div className="main">
            <User></User>
            <div className="buttons">
                <PayButton></PayButton>
                <ReceiveButton></ReceiveButton>
            </div>
            <div className="history">
                <History></History>
            </div>
        </div>
    );
}