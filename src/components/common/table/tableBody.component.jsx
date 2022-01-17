/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-plusplus */
import propTypes, { object } from 'prop-types';
import React, { Component } from 'react';

class TableBody extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tableNonce: TableBody.nonce++,
		};
	}

	render() {
		const { data, metadata } = this.props;
		let tableKey;
		try {
			[[tableKey]] = Object.entries(metadata).filter(
				([, { key }]) => key === true
			);
		} catch (error) {
			// no handling
		}

		const renderColumns = Object.entries(metadata)
			.filter(
				([col, { render }]) =>
					render !== undefined &&
					!(metadata.exclude && metadata.exclude.includes(col))
			)
			.map(([key]) => key);

		let nonce = 0;
		const { tableNonce } = this.state;
		return (
			<tbody>
				{data.map((row) => (
					<tr key={`tr${tableNonce}${tableKey ? row[tableKey] : nonce}`}>
						{renderColumns.map((col) => (
							<td key={`td${nonce++}`}>
								{metadata[col].render(row[col], row)}
							</td>
						))}
					</tr>
				))}
			</tbody>
		);
	}
}

TableBody.propTypes = {
	data: propTypes.arrayOf(object).isRequired,
	metadata: object.isRequired,
};

TableBody.nonce = 0;

export default TableBody;
