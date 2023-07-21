// import Header from '~/layouts/Header/Header';
import Header from '../Header/Header';
const HeaderOnly = ({ children }) => {
    return (
        <div className="main">
            <Header />
            <div className="container">
                <div className="content">{children}</div>
            </div>
        </div>
    );
};

export default HeaderOnly;
