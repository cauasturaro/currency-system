import { User } from "../../components/user/User";
import { History } from "../../components/history/History";
import { PayButton, ReciveButton } from "../../components/buttons/Buttons";

import './Home.css';

export function HomePage() {
    return(
        <div className="main">
            <User></User>
            <div className="buttons">
                <PayButton></PayButton>
                <ReciveButton></ReciveButton>
            </div>
            <div className="history">
                <History></History>
            </div>
        </div>
    );
}