import React from 'react';
import styled from 'styled-components';
import { Col, Form } from 'react-bootstrap';

export const StyledForm = styled(Form)`
    form {
        > div:last-child > div {
            margin-bottom: 0;
        }
    }
`

export const Select = styled(Form.Control)`
    && {
        background-color: ${props => props.theme.colors.surface};
        color: ${props => props.theme.colors.onSurface};
        border-radius: .25rem;
        padding: .1rem;
        border: 1px solid ${props => props.theme.colors.secondary};
        width: 100%;
        height: 1.6rem;
        &:focus {
            box-shadow: 0 0 .4rem ${props => props.theme.colors.secondary};
        }
    }
`

export const NumForm = ({
    as,
    minNum,
    maxNum,
    onChange,
    defaultValue,
    disabled
}) => (
    <Form.Group as={as}>
        <Select
            as="select"
            value={defaultValue}
            onChange={onChange}
            disabled={disabled}
        >
            {disabled
                ? <option>-</option>
                : [...Array(maxNum + 1).keys()].slice(minNum)
                    .map(i => <option value={i} key={i}>{i}</option>)}
        </Select>
    </Form.Group>
)

export const TwoStageForm = ({
    title,
    handleSelect,
    subMinNum,
    minNum,
    maxNum,
    selectAttrs,
    defaultValues,
    disabled
}) => (
    <>
        {title}
        <Form.Row>
            <NumForm
                as={Col}
                minNum={minNum}
                maxNum={maxNum}
                onChange={handleSelect(selectAttrs[0])}
                defaultValue={defaultValues ? defaultValues[0] : undefined}
                disabled={disabled}
            />
            {'–'}
            <NumForm
                as={Col}
                minNum={subMinNum}
                maxNum={6}
                onChange={handleSelect(selectAttrs[1])}
                defaultValue={defaultValues ? defaultValues[1] : undefined}
                disabled={disabled}
            />
        </Form.Row>
    </>
)
