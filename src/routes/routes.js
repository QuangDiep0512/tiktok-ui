import Home from '~/pages/Home/Home';
import Following from '~/pages/Following/Following';
import Profile from '~/pages/Profile/Profile';
import Upload from '~/pages/Upload/Upload';
import Search from '~/pages/Search/Search';
import HeaderOnly from '~/layouts/HeaderOnly/HeaderOnly';
import Live from '~/pages/Live/Live';
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/following', component: Following },
    { path: '/:name', component: Profile },
    { path: '/upload', component: Upload, layout: HeaderOnly },
    { path: '/search', component: Search, layout: null },
    { path: '/live', component: Live },
];

const privateRoutes = [];
export { publicRoutes, privateRoutes };
