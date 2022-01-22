/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import propTypes, { object } from 'prop-types';
import _ from 'lodash';

import TableHeader from './tableHeader.component';
import TableBody from './tableBody.component';

import { getFilteredColumns, getSortingColumns } from './tableUtility';
import Pagination from '../pagination.component';

class Table extends Component {
	constructor(props) {
		super(props);

		const {
			metadata: { paginate },
		} = props;

		const filteredColumns = getFilteredColumns(props.metadata);
		const sortingColumns = getSortingColumns(filteredColumns);

		this.state = {
			sort: {
				column: sortingColumns[0],
				order: 'asc',
			},
		};

		if (paginate) {
			this.state.currentPage = paginate.startingPage;
		}
	}

	getOrganizedData = () => {
		const {
			data: rawData,
			metadata: {
				paginate: { itemsPerPage },
			},
		} = this.props;
		const { sort, currentPage } = this.state;

		// sort the data
		let data = _.orderBy(rawData, [sort.column], [sort.order]);

		// pagination
		data = data.slice(
			(currentPage - 1) * itemsPerPage,
			currentPage * itemsPerPage
		);

		return data;
	};

	updateSort = ({ column, order }) => {
		const { metadata } = this.props;

		const filteredColumns = getFilteredColumns(metadata);
		const sortingColumns = getSortingColumns(filteredColumns);

		if (!(sortingColumns.includes(column) && /^(a|de)sc$/.test(order))) return;
		this.setState({
			sort: {
				column,
				order,
			},
		});
	};

	updateCurrentPage = (currentPage) => {
		this.setState({ currentPage });
	};

	render() {
		const {
			metadata,
			metadata: { paginate },
			data: originalData,
		} = this.props;
		const { sort, currentPage } = this.state;

		const filteredColumns = getFilteredColumns(metadata);
		const data = this.getOrganizedData();

		return (
			<div>
				<table className="table">
					<TableHeader
						columns={filteredColumns}
						sort={sort}
						updateSort={this.updateSort}
					/>
					<TableBody data={data} metadata={metadata} />
				</table>
				<br />
				{currentPage && data.length ? (
					<Pagination
						currentPage={currentPage}
						totalNoOfItems={originalData.length}
						itemsPerPage={paginate.itemsPerPage}
						updateCurrentPage={this.updateCurrentPage}
					/>
				) : null}
			</div>
		);
	}
}

Table.propTypes = {
	data: propTypes.arrayOf(object).isRequired,
	metadata: object.isRequired,
};

export default Table;
