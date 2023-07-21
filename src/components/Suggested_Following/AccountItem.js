import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './SuggestedFollowing.scss';
import Tippy from '@tippyjs/react/headless';
import Popper from '~/components/Popper/Popper';
import { Link } from 'react-router-dom';
import { MyContext } from '~/App';
import { useContext } from 'react';
// import { ContextMainLayout } from '~/layouts/Main_layout';
import { ContextMainLayout } from '~/layouts/Sidebar/Sidebar';

function AccountItem() {
    const handleDisplayModal = useContext(MyContext);
    const users = useContext(ContextMainLayout);
    const infoUser = (user) => (
        <Popper>
            <div className="detail_info" aria-expanded="true" tabIndex="0">
                <div className="header_info">
                    <img className="avatar_info" src={user.avatar} alt="" />
                    <button className="btn-follow" onClick={handleDisplayModal}>
                        Follow
                    </button>
                </div>
                <div className="content">
                    <h3 className="nickname">
                        {user.nickname}
                        {user.tick && <FontAwesomeIcon icon={faCheckCircle} className="icon" />}
                    </h3>
                    <p className="name">{user.full_name}</p>
                </div>
                <div className="follower">
                    <p>
                        {user.followers_count + ' '}
                        <span>Followers</span>
                    </p>
                    <p>
                        429.7M <span>Likes</span>
                    </p>
                </div>
            </div>
        </Popper>
    );

    return (
        <>
            {users.map((user) => {
                return (
                    <Tippy
                        interactive
                        hideOnClick={false}
                        key={user.id}
                        offset={[-12, 0]}
                        delay={[600, 0]}
                        render={() => infoUser(user)}
                        placement="bottom-start"
                    >
                        <Link to={`/@${user.nickname}`} className="account_item" user={user.nickname}>
                            <img className="avatar" src={user.avatar} alt="" />
                            <div className="user_info">
                                <p className="nickname">
                                    <span>{user.nickname}</span>
                                    {user.tick && <FontAwesomeIcon icon={faCheckCircle} className="icon" />}
                                </p>
                                <p className="name">{user.full_name}</p>
                            </div>
                        </Link>
                    </Tippy>
                );
            })}
             
        </>
    );
}

export default AccountItem;
