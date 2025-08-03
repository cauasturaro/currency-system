import './History.css';

export function History() {
    return(
        <div className="history">
            <table>
                <thead>
                    <tr>
                        <th>Payer</th>
                        <th>Receiver</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Cauã</td>
                        <td>Maria</td>
                        <td>C$ 2000,00</td>
                    </tr>
                    <tr>
                        <td>Cauã</td>
                        <td>Maria</td>
                        <td>C$ 2000,00</td>
                    </tr>
                    <tr>
                        <td>Cauã</td>
                        <td>Maria</td>
                        <td>C$ 2000,00</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}