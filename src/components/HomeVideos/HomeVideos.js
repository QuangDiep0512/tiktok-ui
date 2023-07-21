import { Link } from 'react-router-dom';
import './HomeVideos.scss';
import {
    MusicIcon,
    PlaySolidIcon,
    ReportIcon,
    TurnOffVolume,
    TurnOnVolume,
    PauseIcon,
    ShareIcon,
    LoveBlackIcon,
    LoveRedIcon,
    CommentIcon,
} from '../Icons/Icons';
import { useRef, useState, useEffect } from 'react';
import HeadlessTippy from '@tippyjs/react/headless';
import Popper from '../Popper/Popper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { MyContext } from '~/App';
import ShareAction from '../ShareAction/ShareAction';
const HomeVideos = ({ data }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [turnOn, setTurnOn] = useState(true);
    const [liked, setLiked] = useState(data.likes_count);
    const [count, setCount] = useState(false);
    const videoRef = useRef();
    const handleDisplayModal = useContext(MyContext);

    //Xử lí tăng/giảm khi click vào nút Thả tim
    const handleClickLiked = () => {
        if (count === false) {
            setLiked(liked + 1);
            setCount(true);
        } else {
            setLiked(liked - 1);
            setCount(false);
        }
    };

    //Dừng video
    const pauseVideo = () => {
        if (isPlaying === false) {
            videoRef.current.pause();
            setIsPlaying(true);
        }
    };

    //Chạy video
    const playVideo = () => {
        if (isPlaying === true) {
            videoRef.current.play();
            setIsPlaying(false);
        }
    };

    //Click Play-Pause Video
    const togglePlayVideo = () => {
        if (isPlaying === true) {
            playVideo();
        } else {
            pauseVideo();
        }
    };

    //Xử lí Cuộn trang video phát
    function playVideoInViewport() {
        if (videoRef.current !== null) {
            let bounding = videoRef.current.getBoundingClientRect();
            if (
                bounding.top >= 0 &&
                bounding.left >= 0 &&
                bounding.right <= (window.innerWidth || document.documentElement.clientWidth) &&
                bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight)
            ) {
                playVideo();
            } else {
                pauseVideo();
            }
        }
    }

    //Xử lí Bật-Tắt Volume
    const handleVolumn = () => {
        if (turnOn === true) {
            videoRef.current.muted = false;
            setTurnOn(false);
        } else {
            videoRef.current.muted = true;
            setTurnOn(true);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', playVideoInViewport);
        return () => window.removeEventListener('scroll', playVideoInViewport);
    });

    return (
        <div className="video" key={data.id}>
            <div className="headerName">
                <div className="headerInfo">
                    <img className="image" src={data.user.avatar} alt="" />
                    <div className="info">
                        <div>
                            <HeadlessTippy
                                interactive
                                placement="bottom"
                                delay={[1000, 0]}
                                offset={[40, 30]}
                                render={(attrs) => (
                                    <div className="box" tabIndex="-1" {...attrs}>
                                        <Popper>
                                            <div className="detail_info" aria-expanded="true" tabIndex="0">
                                                <div className="header_info">
                                                    <img className="avatar_info" src={data.user.avatar} alt="" />
                                                    <button className="btn-follow">Follow</button>
                                                </div>
                                                <div className="content">
                                                    <h3 className="nickname">
                                                        {data.user.nickname}
                                                        {data.user.tick && (
                                                            <FontAwesomeIcon icon={faCheckCircle} className="icon" />
                                                        )}
                                                    </h3>
                                                    <p className="name">{`${data.user.first_name} ${data.user.last_name}`}</p>
                                                </div>
                                                <div className="follower">
                                                    <p>
                                                        {data.user.followers_count + ' '}
                                                        <span>Followers</span>
                                                    </p>
                                                    <p>
                                                        {data.user.likes_count + ' '} <span>Likes</span>
                                                    </p>
                                                </div>
                                                <div className="footer_bio">
                                                    <p>{data.user.bio}</p>
                                                </div>
                                            </div>
                                        </Popper>
                                    </div>
                                )}
                            >
                                <Link to={`/@${data.user.nickname}`}>
                                    <span>{data.user.nickname}</span>
                                    <p className="username">{`${data.user.first_name} ${data.user.last_name}`}</p>
                                </Link>
                            </HeadlessTippy>
                            <p className="title">{data.description}</p>
                        </div>
                        <div className="music">
                            <MusicIcon />
                            <p className="nameMusic">{data.music}</p>
                        </div>
                    </div>
                </div>
                <button className="suggested_login btn-follow" onClick={handleDisplayModal}>
                    Follow
                </button>
            </div>
            <div className="videoMusic">
                <div
                    className="video_items"
                    style={
                        data.meta.video.resolution_x < data.meta.video.resolution_y
                            ? { width: '273px' }
                            : { width: '463px' }
                    }
                >
                    <video src={data.file_url} autoPlay ref={videoRef} muted />
                    <div onClick={togglePlayVideo}>
                        {isPlaying ? (
                            <div className="pauseVideo">
                                <PlaySolidIcon />
                            </div>
                        ) : (
                            <div className="playVideo">
                                <PauseIcon />
                            </div>
                        )}
                    </div>
                    <div className="loudspeaker">
                        {turnOn === false && (
                            <div className="turnOn">
                                <div className="increase_decrease">
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        step="1"
                                        orient="vertical"
                                        className="salary"
                                    />
                                </div>
                            </div>
                        )}

                        <div className="volume-icon" onClick={handleVolumn}>
                            {turnOn ? <TurnOnVolume /> : <TurnOffVolume />}
                        </div>
                    </div>
                    <div className="report">
                        <div className="text">
                            <ReportIcon />
                            Report
                        </div>
                    </div>
                </div>

                <div className="interact">
                    <div className="interact_item">
                        <div className="icon" onClick={handleClickLiked}>
                            {count ? <LoveRedIcon /> : <LoveBlackIcon />}
                        </div>
                        <p>{liked}</p>
                    </div>
                    <div className="interact_item">
                        <div className="icon" onClick={handleDisplayModal}>
                            <CommentIcon />
                        </div>
                        <p>{data.comments_count}</p>
                    </div>
                    <ShareAction>
                        <div className="interact_item">
                            <div className="icon">
                                <ShareIcon />
                            </div>
                            <p>{data.shares_count}</p>
                        </div>
                    </ShareAction>
                </div>
            </div>
        </div>
    );
};

export default HomeVideos;
