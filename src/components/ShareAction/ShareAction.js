import HeadlessTippy from '@tippyjs/react/headless';
import { useState } from 'react';
import {
    EmbedIcon,
    FacebookIcon,
    LinkIcon,
    TelegramIcon,
    TwitterIcon,
    WhatsAppIcon,
    PaperPlaneIcon,
    ChevronDownIcon,
    InstagramIcon,
} from '../Icons/Icons';
import Popper from '../Popper/Popper';
import './ShareAction.scss';
const ShareAction = ({ children }) => {
    const share_menu = [
        {
            icon: <EmbedIcon />,
            title: 'Embed',
        },
        {
            icon: <PaperPlaneIcon />,
            title: 'Send to friends',
        },
        {
            icon: <FacebookIcon />,
            title: 'Share to Facebook',
        },
        {
            icon: <WhatsAppIcon />,
            title: 'Share to WhatsApp',
        },
        {
            icon: <LinkIcon />,
            title: 'Coppy Link',
        },
    ];

    const expanded_share_menu = [
        ...share_menu,
        {
            icon: <TwitterIcon />,
            title: 'Share to Twitter',
        },
        {
            icon: <TelegramIcon />,
            title: 'Share to Telegram',
        },
        {
            icon: <InstagramIcon />,
            title: 'Share to Instagram',
        },
    ];
    const [shareList, setShareList] = useState(share_menu);
    const [chevronDown, setChevronDown] = useState(true);
    const handleClickChevronDownIcon = () => {
        setShareList(expanded_share_menu);
        setChevronDown(false);
    };

    return (
        <HeadlessTippy
            interactive
            hideOnClick="false"
            placement="top"
            delay={[200, 700]}
            offset={[90, 0]}
            render={(attrs) => (
                <div className="box" tabIndex="-1" {...attrs}>
                    <Popper>
                        <div className="shareIcon">
                            {shareList.map((list, index) => {
                                return (
                                    <div className="item_icon" key={index}>
                                        <span>{list.icon} </span>
                                        <p>{list.title}</p>
                                    </div>
                                );
                            })}
                            <div className="chevronDown" onClick={handleClickChevronDownIcon}>
                                {chevronDown && <ChevronDownIcon />}
                            </div>
                        </div>
                    </Popper>
                </div>
            )}
        >
            {children}
        </HeadlessTippy>
    );
};
export default ShareAction;
