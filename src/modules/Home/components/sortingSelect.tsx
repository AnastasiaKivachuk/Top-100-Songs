import React, { useState } from 'react';

import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

import { SORT_BY } from '@constants/global.constants';
import { setSortField } from '@redux/actions/actionCreator';
import { useDispatch } from 'react-redux';
import styles from './sortingSelect.module.scss';

const sortItems = [
  { value: 'snippet.position-asc', name: 'Position 🡣' },
  { value: 'snippet.position-desc', name: 'Position 🡡' },
  { value: 'snippet.title-asc', name: 'Title 🡣' },
  { value: 'snippet.title-desc', name: 'Title 🡡' },
  { value: 'snippet.publishedAt-asc', name: 'Published Date 🡣' },
  { value: 'snippet.publishedAt-desc', name: 'Published Date 🡡' },
];

function SortingSelect() {
  const dispatch = useDispatch();
  const [sortBy, setSortBy] = useState(SORT_BY);

  const handleChange = (event) => {
    setSortBy(event.target.value);
    dispatch(setSortField({ sortBy: event.target.value }));
  };

  return (
    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }} className={styles.wrapper}>
      <InputLabel id="demo-simple-select-standard-label" className={styles.label} data-testid="sortByLabel">Sort By</InputLabel>
      <Select
        labelId="sortBy"
        id="sortBy"
        value={sortBy}
        onChange={handleChange}
        label="Sort By"
        placeholder="Sort By"
      >
        {sortItems.map(({ value, name }) => <MenuItem value={value} key={name}>{name}</MenuItem>)}
      </Select>
    </FormControl>
  );
}

export default SortingSelect;
