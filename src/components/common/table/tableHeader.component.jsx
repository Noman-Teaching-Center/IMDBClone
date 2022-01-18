/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-plusplus */
import propTypes from 'prop-types';
import React from 'react';

const TableHeader = ({ columns, sort, updateSort }) => {
	const headers = Object.fromEntries(
		Object.entries(columns).map(([key, { header }]) =>
			header !== undefined ? [key, header] : [key, key.toUpperCase()]
		)
	);

	const getSortingIcon = (column) => {
		return column === sort.column ? (
			<i
				className={`bi bi-arrow-${sort.order === 'asc' ? 'up' : 'down'}-short`}
			/>
		) : undefined;
	};

	const handleOnClick = (column) => {
		if (column === sort.column) {
			updateSort({ column, order: sort.order === 'asc' ? 'desc' : 'asc' });
		} else {
			updateSort({ column, order: 'asc' });
		}
	};

	let nonce = 0;
	return (
		<thead>
			<tr>
				{Object.keys(headers).map((col) => (
					<th scope="col" key={nonce++} onClick={() => handleOnClick(col)}>
						{headers[col]}
						{getSortingIcon(col)}
					</th>
				))}
			</tr>
		</thead>
	);
};

TableHeader.propTypes = {
	columns: propTypes.object.isRequired,
	sort: propTypes.shape({
		column: propTypes.string,
		order: propTypes.oneOf(['asc', 'desc']),
	}).isRequired,
	updateSort: propTypes.func.isRequired,
};

export default TableHeader;
