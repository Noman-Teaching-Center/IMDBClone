/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import propTypes, { object } from 'prop-types';
import _ from 'lodash';

import TableHeader from './tableHeader.component';
import TableBody from './tableBody.component';

import { getFilteredColumns, getSortingColumns } from './tableUtility';

class Table extends Component {
	constructor(props) {
		super(props);

		const filteredColumns = getFilteredColumns(props.metadata);
		const sortingColumns = getSortingColumns(filteredColumns);

		this.state = {
			sort: {
				column: sortingColumns[0],
				order: 'asc',
			},
		};
	}

	getOrganizedData = () => {
		const { data: rawData } = this.props;
		const { sort } = this.state;

		// sort the data
		const data = _.orderBy(rawData, [sort.column], [sort.order]);
		// TODO pagination

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

	render() {
		const { metadata } = this.props;
		const { sort } = this.state;

		const filteredColumns = getFilteredColumns(metadata);
		const data = this.getOrganizedData();

		return (
			<table className="table">
				<TableHeader
					columns={filteredColumns}
					sort={sort}
					updateSort={this.updateSort}
				/>
				<TableBody data={data} metadata={metadata} />
			</table>
		);
	}
}

Table.propTypes = {
	data: propTypes.arrayOf(object).isRequired,
	metadata: object.isRequired,
};

export default Table;
