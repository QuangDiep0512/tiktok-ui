import HomeVideos from '~/components/HomeVideos/HomeVideos';
import { useState, useEffect } from 'react';
import { fetchHomePageVideos } from '~/service/fetchAPI';
import './Home.scss';
function Home() {
    const [videos, setVideos] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            const result = await fetchHomePageVideos(page);
            setVideos((prev) => [...prev, ...result.data]);
            setLoading(false);
        };
        fetch();

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [page]);

    function handleScroll() {
        if (window.scrollY + window.innerHeight >= document.body.offsetHeight) {
            setLoading(true);
            setPage((page) => page + 1);
            setLoading(false);
        }
    }

    return (
        <div className="home">
            {loading && (
                <div id="app">
                    <div id="loader" />
                </div>
            )}
            {videos.map((video, index) => {
                return <HomeVideos data={video} key={index} />;
            })}
        </div>
    );
}

export default Home;
