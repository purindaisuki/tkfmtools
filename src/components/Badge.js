import React from 'react';
import { Badge } from "react-bootstrap"

import { useLanguage } from 'containers/LanguageProvider';

export const NewBadge = () => {
    const { pageString } = useLanguage()
    return (
        <Badge pill variant="success">{pageString.index.updateLog.new}</Badge>
    )
}
export const FixBadge = () => {
    const { pageString } = useLanguage()
    return (
        <Badge pill variant="danger">{pageString.index.updateLog.fix}</Badge>
    )
}
export const ChangeBadge = () => {
    const { pageString } = useLanguage()
    return (
        <Badge pill variant="primary">{pageString.index.updateLog.change}</Badge>
    )
}
