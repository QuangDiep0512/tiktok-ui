import './Profile.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink, faLock } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import VideoPreview from '~/components/VideoPreview/VideoPreview';
import { LockIcon } from '~/components/Icons/Icons';
import { MyContext } from '~/App';
function Profile() {
    const [profile, setProfile] = useState([]);
    const [videos, setVideos] = useState([]);
    const [isModalOpen, setModalOpen] = useState(true);
    const [isLiked, setLiked] = useState(false);
    const [line, setLine] = useState(true);

    const handleDisplayModal = useContext(MyContext);

    const location = useLocation();
    const currentPath = location.pathname;

    useEffect(() => {
        const fetchAPI = async () => {
            const result = await axios.get(`https://tiktok.fullstack.edu.vn/api/users${currentPath}`);
            setProfile(result.data.data);
            setVideos(result.data.data.videos);
        };
        fetchAPI();
    }, [currentPath]);

    const handleClickVideo = () => {
        setLine(true);
        setModalOpen(true);
        setLiked(false);
    };
    const handleClickLiked = () => {
        setLine(false);
        setLiked(true);
        setModalOpen(false);
    };

    return (
        <div className="profile">
            <div className="profile_header">
                <img src={profile.avatar} alt="" className="profile_img" />
                <div className="info">
                    <p className="nickname">{profile.nickname}</p>
                    <p className="fullname">{profile.first_name + '' + profile.last_name}</p>
                    <button className="btn-follow" onClick={handleDisplayModal}>
                        Follow
                    </button>
                </div>
            </div>
            <div className="interact_counts">
                <p>
                    <strong>{profile.followings_count}</strong> Followings
                </p>
                <p>
                    <strong>{profile.followers_count}</strong> Followers
                </p>
                <p>
                    <strong>{profile.likes_count}</strong> Likes
                </p>
            </div>
            <div className="bio">
                <p className="contact">Dr for work: 0364710367</p>
                <a href="#">
                    <FontAwesomeIcon icon={faLink} className="icon" />
                    {profile.website_url}
                </a>
            </div>
            <div className="tabs">
                <button className="active_video" onClick={handleClickVideo}>
                    Video
                </button>
                <button onClick={handleClickLiked}>
                    <FontAwesomeIcon icon={faLock} className="icon" />
                    Liked
                </button>
                {line ? <div className="activeLineVideo"></div> : <div className="activeLineLiked"></div>}
            </div>
            {isModalOpen === true && (
                <div className="all_videos">
                    <div className="video_item">
                        {videos.length > 0 && (
                            <div className="list_videos">
                                {videos.map((video) => {
                                    return <VideoPreview key={video.id} data={video} />;
                                })}
                            </div>
                        )}
                    </div>
                </div>
            )}
            {isLiked && (
                <div className="liked">
                    <LockIcon />
                    <h3>Video đã thích của người dùng này ở trạng thái riêng tư</h3>
                    <p>Các video được thích bởi luongthingocha hiện đang ẩn</p>
                </div>
            )}
        </div>
    );
}

export default Profile;
