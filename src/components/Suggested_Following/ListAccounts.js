import AccountItem from './AccountItem';
const ListAccounts = ({ label }) => {
    return (
        <div className="list_accounts">
            <p className="label">{label}</p>
            <AccountItem />
        </div>
    );
};

export default ListAccounts;
