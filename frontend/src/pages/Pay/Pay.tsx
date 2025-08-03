import './Pay.css';

export function PayPage() {
    return(
        <div className="pay-main">
            <form className='payForm'>
                <input type='text' placeholder='000000'/>
                <input type='submit' value="Pay"/>
            </form>
        </div>
    );
}