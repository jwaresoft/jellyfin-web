import React, { FC } from 'react';
import escapeHTML from 'escape-html';
import { groupBy } from 'lodash-es';
import Box from '@mui/material/Box';
import { getIndex } from './listHelper';
import ListGroupHeaderWrapper from './ListGroupHeaderWrapper';
import List from './List';

import type { ItemDto } from 'types/itemDto';
import type { ListOptions } from 'types/listOptions';
import '../listview.scss';

interface ListsProps {
    items: ItemDto[];
    listOptions?: ListOptions;
}

const Lists: FC<ListsProps> = ({ items = [], listOptions = {} }) => {
    const groupedData = groupBy(items, (item) => {
        if (listOptions.showIndex) {
            return getIndex(item, listOptions);
        }
        return '';
    });

    const renderListItem = (item: ItemDto, index: number) => {
        return (
            <List
                // eslint-disable-next-line react/no-array-index-key
                key={`${item.Id}-${index}`}
                index={index}
                item={item}
                listOptions={listOptions}
            />
        );
    };

    return (
        <>
            {Object.entries(groupedData).map(
                ([itemGroupTitle, getItems], index) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <Box key={index}>
                        {itemGroupTitle && (
                            <ListGroupHeaderWrapper index={index}>
                                {escapeHTML(itemGroupTitle)}
                            </ListGroupHeaderWrapper>
                        )}
                        {getItems.map((item) => renderListItem(item, index))}
                    </Box>
                )
            )}
        </>
    );
};

export default Lists;
