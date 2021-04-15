import React from 'react';
import Input from 'components/Input';
import styled, { useTheme } from 'styled-components';
import { ListSubheader, MenuItem } from '@material-ui/core';

import { useLanguage } from 'containers/LanguageProvider';

const StyledInput = styled(Input)`
    && {
        margin: .4rem 0;
        width: 100%;
        svg {
            fill: ${props => props.theme.colors.onSurface};
        }
    }
`
const StyledListSubheader = styled(ListSubheader)`
    && {
        color: ${props => props.theme.colors.onSurface};
        font-size: 1rem;
        font-style: italic;
        line-height: 2rem;
    }
`
const StageSelect = ({ children, className, value, error, handleChange }) => {
    const { pageString, stageString } = useLanguage()
    const { colors } = useTheme()

    return (
        <StyledInput
            className={className}
            label={pageString.team.build.stageSelectLabel}
            id='select-stage'
            onChange={handleChange}
            select
            value={value}
            SelectProps={{
                MenuProps: {
                    PaperProps: {
                        style: {
                            backgroundColor: colors.surface,
                        }
                    },
                    MenuListProps: {
                        style: {
                            backgroundColor: colors.surface,
                            color: colors.onSurface,
                        },
                        dense: true,
                    }
                }
            }}
            variant='outlined'
            size='small'
            inputProps={{ 'aria-label': 'select-stage' }}
            error={error}
            helperText={error && pageString.team.build.stageSelectHelpText}
        >
            {children}
            {stageString.map(chapter => ([
                <StyledListSubheader>
                    {chapter.name}
                </StyledListSubheader>,
                chapter.stages?.map(stage => (
                    <MenuItem value={chapter.chapter + '/' + stage.id} key={stage.id}>
                        {stage.id + ' : ' + stage.name}
                    </MenuItem >
                )),
                chapter.stagePrefix && [...Array(51).keys()].slice(1).map(ind => (
                    <MenuItem
                        value={chapter.chapter + '/' + chapter.chapter + '-' + ind}
                        key={chapter.chapter + '-' + ind}
                    >
                        {chapter.chapter + '-' + ind
                            + ' : ' + chapter.stagePrefix + ind + chapter.stageSuffix}
                    </MenuItem >
                ))
            ]))}
        </StyledInput>
    )
}

export default StageSelect