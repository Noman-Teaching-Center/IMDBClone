/* eslint-disable react/forbid-prop-types */
import React from 'react';
import propTypes, { object } from 'prop-types';
import TableHeader from './tableHeader.component';
import TableBody from './tableBody.component';

const Table = ({ data, metadata }) => {
	return (
		<table className="table">
			<TableHeader metadata={metadata} />
			<TableBody data={data} metadata={metadata} />
		</table>
	);
};

Table.propTypes = {
	data: propTypes.arrayOf(object).isRequired,
	metadata: object.isRequired,
};

export default Table;
