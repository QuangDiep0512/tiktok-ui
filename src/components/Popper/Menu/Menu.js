import Tippy from '@tippyjs/react/headless';
import Popper from '../Popper';
import MenuItems from './Menu-item';
import './Menu.scss';
import Header from './Header';
import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
const Menu = ({ children, listItem }) => {
    const [history, setHistory] = useState([{ data: listItem }]);
    let curent = history[history.length - 1];

    //Quay lại menu cấp cha
    let handleReset = () => {
        setHistory((prev) => prev.slice(0, prev.length - 1));
    };

    //Console.log ra các Element khi click vào listMenu tương ứng
    let handleChangeItem = (item) => {
        console.log(item);
    };

    //Ẩn listMenu khi hover ra ngoài và reset về menu đầu tiên
    const handleResetToFirstPage = () => {
        setHistory((prev) => prev.slice(0, 1));
    };

    const renderResult = (attrs) => (
        <div aria-expanded="true" className="menuIems" tabIndex="0" {...attrs}>
            <Popper>
                {history.length > 1 && <Header title="Language" onBack={handleReset} />}
                <div className="menu">
                    {curent.data.map((item, index) => {
                        const isParent = !!item.language;
                        let menuItem = (
                            <MenuItems
                                items={item}
                                onClickMenu={() => {
                                    if (isParent) {
                                        setHistory((prev) => [...prev, item.language]);
                                    } else {
                                        handleChangeItem(item);
                                    }
                                }}
                            />
                        );
                        return !!item.link ? (
                            <Link to={item.link} key={index}>
                                <Fragment>{menuItem}</Fragment>
                            </Link>
                        ) : (
                            <Fragment key={index}>{menuItem}</Fragment>
                        );
                    })}
                </div>
            </Popper>
        </div>
    );

    return (
        <Tippy
            interactive
            hideOnClick={false}
            delay={[0, 2000]}
            placement="bottom-end"
            appendTo={document.body}
            onHide={handleResetToFirstPage}
            render={renderResult}
        >
            {children}
        </Tippy>
    );
};

export default Menu;
