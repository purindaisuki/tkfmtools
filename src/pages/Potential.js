import React from 'react';
import ItemShowcase from '../components/ItemShowcase';
import ItemFilter from '../components/ItemFilter';
import { OverviewIcon, FilterIcon } from '../components/Icon';
import PageWithTabs from '../components/PageWithTabs';

export default function Potential() {
    return (
        <PageWithTabs
            title='天下布魔工具箱 — 掉落道具'
            tabs={[
                { label: '總覽', icon: OverviewIcon, content: <ItemShowcase /> },
                { label: '篩選', icon: FilterIcon, content: <ItemFilter /> },
            ]}
        />
    )
}
