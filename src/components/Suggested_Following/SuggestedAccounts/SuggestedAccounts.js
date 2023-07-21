import ListAccounts from '../ListAccounts';
import './SuggestedAccounts.scss';
import { MyContext } from '~/App';
import { useContext } from 'react';
const SuggestedAccounts = ({ user }) => {
    const handleDisplayModal = useContext(MyContext);
    return (
        <div className="suggested_accounts">
            <div className="list_accounts">
                <p className="notification label">Log in to follow creators, like videos, and view comments</p>
                <button className="suggested_login btn-login" onClick={handleDisplayModal} >Log in</button>
            </div>
            <ListAccounts label="Suggested accounts" user={user} />
        </div>
    );
};

export default SuggestedAccounts;
