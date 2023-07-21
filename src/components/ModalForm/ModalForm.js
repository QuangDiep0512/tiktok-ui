import { faFacebook, faGoogle, faInstagram, faLine, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faClose, faQrcode, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useMemo, useState } from 'react';
import './ModalForm.scss';
const ModalForm = ({ handleCloseModal }) => {
    const [formLogin, setFormLogin] = useState('login');
    const [filteredForm, setFilteredForm] = useState([]);
    const loginRegisterForm = useMemo(
        () => [
            {
                type: 'login',
                title: 'Log in to TikTok',
                content: [
                    {
                        icon: <FontAwesomeIcon icon={faQrcode} className="icons" />,
                        title: 'Use QR code',
                    },
                    {
                        icon: <FontAwesomeIcon icon={faUser} className="icons" />,
                        title: 'Use phone / email / username',
                    },
                    {
                        icon: <FontAwesomeIcon icon={faFacebook} className="facebook_icon icons" />,
                        title: 'Continue with Facebook',
                    },
                    {
                        icon: <FontAwesomeIcon icon={faGoogle} className="google_icon icons" />,
                        title: 'Continue with Google',
                    },
                    {
                        icon: <FontAwesomeIcon icon={faTwitter} className="twitter_icon icons" />,
                        title: 'Continue with Twitter',
                    },
                    {
                        icon: <FontAwesomeIcon icon={faLine} className="line_icon icons" />,
                        title: 'Continue with Line',
                    },
                ],
            },
            {
                type: 'register',
                title: 'Sign up for TikTok',
                content: [
                    {
                        icon: <FontAwesomeIcon icon={faUser} className="icons" />,
                        title: 'Use phone / email / username',
                    },
                    {
                        icon: <FontAwesomeIcon icon={faFacebook} className="facebook_icon icons" />,
                        title: 'Continue with Facebook',
                    },
                    {
                        icon: <FontAwesomeIcon icon={faGoogle} className="google_icon icons" />,
                        title: 'Continue with Google',
                    },
                    {
                        icon: <FontAwesomeIcon icon={faTwitter} className="twitter_icon icons" />,
                        title: 'Continue with Twitter',
                    },
                    {
                        icon: <FontAwesomeIcon icon={faLine} className="line_icon icons" />,
                        title: 'Continue with Line',
                    },
                    {
                        icon: <FontAwesomeIcon icon={faInstagram} className="instagram_icon icons" />,
                        title: 'Continue with Instagram',
                    },
                ],
            },
        ],
        [],
    );

    useEffect(() => {
        const formData = loginRegisterForm.find((data) => data.type === formLogin);
        setFilteredForm([formData]);
    }, [formLogin, loginRegisterForm]);
    return (
        <div className="modal">
            <div className="modal_mask">
                <div className="modal_container">
                    <div className="inner">
                        <div className="wrapp">
                            <div className="header_login" onClick={handleCloseModal}>
                                <FontAwesomeIcon icon={faClose} className="close_modal" />
                            </div>
                        </div>
                        <div className="list_btn_login">
                            <h2 className="heading_login">{filteredForm[0]?.title}</h2>
                            {filteredForm[0]?.content.map((item, index) => {
                                return (
                                    <button className="button" key={index}>
                                        {item.icon}
                                        <div className="useLogin">
                                            <p className="txt_login">{item.title}</p>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                    <div className="fotter_modal">
                        {formLogin === 'login' ? (
                            <>
                                <p className="txt">Don't have an account?</p>
                                <span className="signUp">
                                    <a href="##" className="link" onClick={() => setFormLogin('register')}>
                                        Sign up
                                    </a>
                                </span>
                            </>
                        ) : (
                            <>
                                <p className="txt">Already have an account?</p>
                                <span className="signUp">
                                    <a href="##" className="link" onClick={() => setFormLogin('login')}>
                                        Log in
                                    </a>
                                </span>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalForm;
