import ListAccounts from '../ListAccounts';
const FollowingAccounts = ({user}) => {
    return (
        <>
            <ListAccounts label="Following accounts" user={user}/>
            <ListAccounts label="Suggested accounts" user={user} />
        </>
    );
};

export default FollowingAccounts;
