import instance from './customize-axios';

const fetchSearchUsers = (debounced) => {
    return instance.get(`/users/search?q=${debounced}&type=less`);
};

const fetchVideos = (page, per_page) => {
    return instance.get(`/users/suggested?page=${page}&per_page=${per_page}`);
};

const fetchHomePageVideos = (page) => {
    return instance.get(`/videos?type=for-you&page=${page}`);
};

export { fetchSearchUsers, fetchVideos, fetchHomePageVideos };
