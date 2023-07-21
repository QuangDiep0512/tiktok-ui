import './Following.scss';
import { useState, useEffect, useRef, useContext } from 'react';
import { MyContext } from '~/App';
import { fetchVideos } from '~/service/fetchAPI';
function Following() {
    const [users, setUsers] = useState([]);
    const [activeVideoIndex, setActiveVideoIndex] = useState(null);
    const videoRefs = useRef([]);

    const handleDisplayModal = useContext(MyContext);

    useEffect(() => {
        try {
            let fetchApi = async () => {
                // const result = await axios.get(
                //     'https://tiktok.fullstack.edu.vn/api/users/suggested?page=1&per_page=20',
                // );
                const result = await fetchVideos(1, 20);
                setUsers(result.data);
            };
            fetchApi();
        } catch (error) {
            console.error(error);
        }
    }, []);

    const handleHover = (index) => {
        if (activeVideoIndex !== null && activeVideoIndex !== index) {
            videoRefs.current[activeVideoIndex].pause();
        }
        setActiveVideoIndex(index);
        videoRefs.current[index].play();
    };

    return (
        <div className="following_page">
            {users.map((data, index) => {
                return (
                    <div
                        className="follow_account"
                        key={data.id}
                        onMouseEnter={() => handleHover(index)}
                        onMouseLeave={() => {
                            videoRefs.current[index].pause();
                            setActiveVideoIndex(null);
                        }}
                    >
                        <video
                            muted
                            className="video_account"
                            src={data.popular_video.file_url}
                            ref={(ref) => {
                                videoRefs.current[index] = ref;
                            }}
                        />

                        <div className="user_info">
                            <img className="img_avatar" src={data.avatar} alt={data.nickname} />
                            <h3 className="username">
                                {data.first_name} {data.last_name}
                            </h3>
                            <p className="nickname">{data.nickname}</p>
                            <button className="btn-follow" onClick={handleDisplayModal}>
                                Follow
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default Following;
