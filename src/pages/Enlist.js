import React from 'react';
import CharFilter from '../components/CharFilter';
import PageWithTabs from '../components/PageWithTabs';
import { OverviewIcon, FilterIcon } from '../components/Icon';

export default function Enlist() {
    return (
        <PageWithTabs
            title='天下布魔工具箱 — 全境徵才'
            tabs={[
                { label: '總覽', icon: OverviewIcon, content: <div /> },
                { label: '篩選', icon: FilterIcon, content: <CharFilter /> },
            ]}
        />
    )
}