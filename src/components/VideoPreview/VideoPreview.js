import './VideoPreview.scss';
import { useRef, useState } from 'react';
import { PlayRegularIcon } from '../Icons/Icons';
// import ModalForm from '../ModalForm/ModalForm';
const VideoPreview = ({ data }) => {
    const videoRef = useRef();
    const [text, setText] = useState(data.description);

    const truncateText = (str, maxLength) => {
        if (str.length <= maxLength) {
            return str;
        }
        return str.slice(0, maxLength) + '...';
    };
    const truncatedText = truncateText(text, 24);

    return (
        <div className="wrraper">
            <div className="wrapper-videos">
                <div className="video-inner" onMouseEnter={() => videoRef.current.play()}>
                    <div className="video">
                        <img src={data.thumb_url} alt="" />
                        <video muted ref={videoRef} src={data.file_url} />
                    </div>
                    <div className="views">
                        <PlayRegularIcon />
                        <p className="count">{data.views_count}</p>
                    </div>
                </div>
            </div>
            <p className="text-content">{truncatedText}</p>
        </div>
    );
};

export default VideoPreview;
