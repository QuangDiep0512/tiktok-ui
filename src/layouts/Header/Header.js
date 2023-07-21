import './Header.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowRightFromBracket,
    faCloudUpload,
    faEllipsisVertical,
    faGear,
    faPlus,
} from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import Menu from '~/components/Popper/Menu/Menu';
import { faPaperPlane, faMessage, faUser } from '@fortawesome/free-regular-svg-icons';
import { faCircleQuestion, faKeyboard, faLanguage } from '@fortawesome/free-solid-svg-icons';
import { faTiktok } from '@fortawesome/free-brands-svg-icons';
import Search from '../Search/Search';
import { Link } from 'react-router-dom';
import ImageTiktok from './ImageTiktok';
import { MyContext } from '~/App';
import { useContext } from 'react';
const Header = ({ checkUser }) => {
    const handleDisplayModal = useContext(MyContext);
    let listItems = [
        {
            id: 1,
            icon: <FontAwesomeIcon icon={faLanguage} />,
            title: 'English',
            language: {
                title: 'Language',
                data: [
                    { code: 'en', title: 'English' },
                    { code: 'vn', title: 'Tiếng Việt (Việt Nam)' },
                    { code: 'en', title: 'Russia' },
                    { code: 'vn', title: 'Indonesia' },
                    { code: 'en', title: 'Lao' },
                    { code: 'vn', title: 'Thailand' },
                    { code: 'en', title: 'China' },
                    { code: 'vn', title: 'France' },
                    { code: 'en', title: 'Hungary' },
                    { code: 'vn', title: 'Germany' },
                    { code: 'en', title: 'Brazil' },
                ],
            },
        },
        { id: 2, icon: <FontAwesomeIcon icon={faCircleQuestion} />, title: 'Feedback and help', link: '/following' },
        { id: 3, icon: <FontAwesomeIcon icon={faKeyboard} />, title: 'Keyboard Shortcuts' },
    ];

    const menuUsers = [
        { icon: <FontAwesomeIcon icon={faUser} />, title: 'View Profile', link: '/profile' },
        { icon: <FontAwesomeIcon icon={faTiktok} />, title: 'Get coins', link: '/coins' },
        { icon: <FontAwesomeIcon icon={faGear} />, title: 'Settings', link: '/settings' },
        ...listItems,
        {
            icon: <FontAwesomeIcon icon={faArrowRightFromBracket} />,
            title: 'Log out',
            link: '/logout',
            classname: 'borderLogout',
        },
    ];
    return (
        <div className="header">
            <div className="header_main">
                <Link to="/" className="img-tiktok">
                    <ImageTiktok />
                </Link>
                <Search />
                {checkUser === true ? (
                    <div className="actions">
                        <div className="actions-login">
                            <Tippy content="Upload">
                                <button className="btn-icon">
                                    <FontAwesomeIcon icon={faCloudUpload} />
                                </button>
                            </Tippy>
                            <Tippy content="Message">
                                <button className="btn-icon">
                                    <FontAwesomeIcon icon={faPaperPlane} />
                                </button>
                            </Tippy>
                            <Tippy content="Mailbox">
                                <button className="mailbox btn-icon">
                                    <span>10</span>
                                    <FontAwesomeIcon icon={faMessage} />
                                </button>
                            </Tippy>
                            <Menu listItem={listItems}>
                                <img
                                    src="https://kenh14cdn.com/thumb_w/620/2020/5/28/0-1590653959375414280410.jpg"
                                    alt="anh"
                                    className="avartar"
                                />
                            </Menu>
                        </div>
                    </div>
                ) : (
                    <div className="actions">
                        <button className="upload" onClick={handleDisplayModal}>
                            <FontAwesomeIcon icon={faPlus} className="plus" />
                            Upload
                        </button>
                        <button className="logIn" onClick={handleDisplayModal}>
                            Log-in
                        </button>
                        <Menu listItem={menuUsers}>
                            <span>
                                <FontAwesomeIcon icon={faEllipsisVertical} className="menu-icon" />
                            </span>
                        </Menu>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Header;
