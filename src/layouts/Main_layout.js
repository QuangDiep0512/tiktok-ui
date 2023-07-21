import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import './Main_layout.scss';
import GetApp from '~/components/GetApp/GetApp';

const Main_Layout = ({ children }) => {
    let checkUser = false;
    return (
        <div className="main">
            <Header checkUser={checkUser} />
            <div className="container">
                <div className="overlay_sidebar">
                    <Sidebar checkUser={checkUser} />
                </div>
                <div className="overlay_content">
                    <div className="content">{children}</div>
                </div>
            </div>
            <GetApp />
        </div>
    );
};

export default Main_Layout;
