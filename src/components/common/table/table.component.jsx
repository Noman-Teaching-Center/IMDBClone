/* eslint-disable react/forbid-prop-types */
import React, { useState } from 'react';
import propTypes, { object } from 'prop-types';
import _ from 'lodash';

import TableHeader from './tableHeader.component';
import TableBody from './tableBody.component';

import { getFilteredColumns, getSortingColumns } from './tableUtility';
import Pagination from '../pagination.component';

const Table = (props) => {
	const {
		metadata,
		metadata: { paginate },
	} = props;

	const filteredColumns = getFilteredColumns(metadata);
	const sortingColumns = getSortingColumns(filteredColumns);

	const [sort, setSort] = useState({
		column: sortingColumns[0],
		order: 'asc',
	});

	const [currentPage, setCurrentPage] = useState(paginate?.startingPage);

	const getOrganizedData = () => {
		const {
			data: rawData,
			metadata: {
				paginate: { itemsPerPage },
			},
		} = props;

		// sort the data
		let data = _.orderBy(rawData, [sort.column], [sort.order]);

		// pagination
		data = data.slice(
			(currentPage - 1) * itemsPerPage,
			currentPage * itemsPerPage
		);

		return data;
	};

	const updateSort = ({ column, order }) => {
		if (!(sortingColumns.includes(column) && /^(a|de)sc$/.test(order))) return;
		setSort({
			column,
			order,
		});
	};

	const updateCurrentPage = (updatedCurrentPage) => {
		setCurrentPage(updatedCurrentPage);
	};

	const { data: originalData } = props;

	const data = getOrganizedData();

	return (
		<div className="flex flex-col">
			<table className="table">
				<TableHeader
					columns={filteredColumns}
					sort={sort}
					updateSort={updateSort}
				/>
				<TableBody data={data} metadata={metadata} />
			</table>
			{currentPage && data.length ? (
				<div className="m-auto">
					<Pagination
						currentPage={currentPage}
						totalNoOfItems={originalData.length}
						itemsPerPage={paginate.itemsPerPage}
						updateCurrentPage={updateCurrentPage}
					/>
				</div>
			) : null}
		</div>
	);
};

Table.propTypes = {
	data: propTypes.arrayOf(object).isRequired,
	metadata: object.isRequired,
};

export default Table;
