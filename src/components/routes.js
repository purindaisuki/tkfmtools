import home from '../pages';
import enlist from '../pages/enlist';
import potential from '../pages/potential';

export const routes = [
    {
        path: '/',
        component: home,
        exact: true,
    },
    {
        path: '/enlist',
        component: enlist,
    },
    {
        path: '/potential',
        component: potential,
    }
]
