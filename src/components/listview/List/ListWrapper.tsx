import classNames from 'classnames';
import escapeHTML from 'escape-html';
import React, { FC } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import layoutManager from '../../layoutManager';
import type { DataAttributes } from 'types/dataAttributes';

interface ListWrapperProps {
    index: number | undefined;
    title?: string | null;
    action?: string | null;
    dataAttributes?: DataAttributes;
    className?: string;
}

const ListWrapper: FC<ListWrapperProps> = ({
    index,
    action,
    title,
    className,
    dataAttributes,
    children
}) => {
    if (layoutManager.tv) {
        return (
            <Button
                data-index={index}
                className={classNames(
                    className,
                    'itemAction listItem-button listItem-focusscale'
                )}
                data-action={action}
                aria-label={escapeHTML(title)}
                {...dataAttributes}
            >
                {children}
            </Button>
        );
    } else {
        return (
            <Box data-index={index} className={className} {...dataAttributes}>
                {children}
            </Box>
        );
    }
};

export default ListWrapper;
