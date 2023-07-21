import './Sidebar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faUserGroup, faVideoCamera } from '@fortawesome/free-solid-svg-icons';
import Menu from './Menu/Menu';
import MenuItem from './Menu/MenuItem';
import SuggestedAccounts from '~/components/Suggested_Following/SuggestedAccounts/SuggestedAccounts';
import FollowingAccounts from '~/components/Suggested_Following/FollowingAccounts/FollowingAccounts';
import { useEffect, useState, createContext } from 'react';
import { fetchVideos } from '~/service/fetchAPI';
export const ContextMainLayout = createContext();

const Sidebar = ({ checkUser }) => {
    const [users, setUser] = useState([]);
    const [seeAll, setSeeAll] = useState(true);

    useEffect(() => {
        try {
            let fetchApi = async (page, per_page) => {
                const result = await fetchVideos(page, per_page);
                setUser(result.data);
            };
            if (seeAll) {
                fetchApi(1, 5);
            } else {
                fetchApi(1, 16);
            }
        } catch (error) {
            console.error(error);
        }
    }, [seeAll]);
    return (
        <ContextMainLayout.Provider value={users}>
            <div className="sidebar">
                <Menu>
                    <MenuItem title="For You" to="/" exact icon={<FontAwesomeIcon icon={faHouse} />} />
                    <MenuItem title="Following" to="/following" icon={<FontAwesomeIcon icon={faUserGroup} />} />
                    <MenuItem title="LIVE" to="/live" icon={<FontAwesomeIcon icon={faVideoCamera} />} />
                </Menu>
                {checkUser ? (
                    <>
                        <FollowingAccounts />
                    </>
                ) : (
                    <>
                        <SuggestedAccounts />
                        {seeAll ? (
                            <span className="user_more" onClick={() => setSeeAll(false)}>
                                See all
                            </span>
                        ) : (
                            <span className="user_more" onClick={() => setSeeAll(true)}>
                                See less
                            </span>
                        )}
                    </>
                )}
            </div>
        </ContextMainLayout.Provider>
    );
};

export default Sidebar;
