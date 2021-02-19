import Home from './pages/Home';
import Enlist from './pages/Enlist';
import Potential from './pages/Potential';

export const routes = [
    {
        path: '/',
        component: Home,
        exact: true,
    },
    {
        path: '/enlist',
        component: Enlist,
    },
    {
        path: '/potential',
        component: Potential,
    }
]
