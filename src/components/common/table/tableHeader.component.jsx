/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-plusplus */
import { object } from 'prop-types';
import React from 'react';

const TableHeader = ({ metadata }) => {
	let nonce = 0;
	const headers = Object.entries(metadata)
		.filter(
			([key, { render }]) =>
				render !== undefined &&
				!(metadata.exclude && metadata.exclude.includes(key))
		)
		.map(([key, { header }]) =>
			header !== undefined ? header : key.toUpperCase()
		);

	return (
		<thead>
			<tr>
				{headers.map((header) => (
					<th scope="col" key={nonce++}>
						{header}
					</th>
				))}
			</tr>
		</thead>
	);
};

TableHeader.propTypes = {
	metadata: object.isRequired,
};

export default TableHeader;
