import { PCIcon, ScrollTop, SmartPhoneIcon } from '../Icons/Icons';
import HeadlessTippy from '@tippyjs/react/headless';
import Popper from '../Popper/Popper';
import './GetApp.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
const GetApp = () => {
    const [closeTippy, setCloseTippy] = useState(false);
    const [active, setActive] = useState(true);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const CloseTippy = () => {
        setCloseTippy(true);
    };

    const DisplayTippy = () => {
        setCloseTippy(false);
    };

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                setActive(false);
            } else {
                setActive(true);
            }
        });
    }, []);

    return (
        <div className={`getApp ${active ? 'active' : ''}`}>
            <span>
                <HeadlessTippy
                    trigger="click"
                    interactive
                    placement="top-end"
                    zIndex="99"
                    render={(attrs) =>
                        closeTippy === false && (
                            <div tabIndex="-1" {...attrs}>
                                <Popper>
                                    <div className="tippy-wrapper">
                                        <div className="tippy-inner">
                                            <button className="item">
                                                <PCIcon />
                                                <span className="getTiktok">Get TikTok for desktop</span>
                                            </button>
                                            <div className="splitter"></div>
                                            <button className="item">
                                                <SmartPhoneIcon />
                                                <span className="getTiktok">Get TikTok App</span>
                                            </button>
                                        </div>
                                        <FontAwesomeIcon icon={faXmark} className="iconXmark" onClick={CloseTippy} />
                                    </div>
                                </Popper>
                            </div>
                        )
                    }
                >
                    <button className="btn-getApp" onClick={DisplayTippy}>
                        Get App
                    </button>
                </HeadlessTippy>
            </span>

            <div className="scrollTop" onClick={scrollToTop}>
                <ScrollTop />
            </div>
        </div>
    );
};

export default GetApp;
