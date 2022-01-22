import _ from 'lodash';
import propTypes from 'prop-types';
import React from 'react';

const Pagination = ({
	currentPage,
	totalNoOfItems,
	itemsPerPage,
	updateCurrentPage,
}) => {
	const totalPages = Math.ceil(totalNoOfItems / itemsPerPage);
	const pages = _.range(1, totalPages + 1, 1);
	let pages1 = _.range(currentPage - 2, currentPage + 3, 1);
	pages1 = pages1.filter((page) => page > 0 && page <= totalPages);
	console.log(pages1);

	return (
		<nav aria-label="Page navigation example" className="m-auto">
			<ul className="pagination">
				{currentPage > 1 ? (
					<li className="page-item">
						<button
							type="button"
							onClick={() =>
								currentPage - 1 > 0 ? updateCurrentPage(currentPage - 1) : null
							}
							className="page-link"
						>
							Previous
						</button>
					</li>
				) : null}
				{pages.map((page) => (
					<li
						key={page}
						className={`page-item ${page === currentPage ? 'active' : ''}`}
					>
						<button
							type="button"
							onClick={() => updateCurrentPage(page)}
							className="page-link"
						>
							{page}
						</button>
					</li>
				))}
				{currentPage < totalPages ? (
					<li className="page-item">
						<button
							type="button"
							onClick={() =>
								currentPage + 1 < totalPages
									? updateCurrentPage(currentPage + 1)
									: null
							}
							className="page-link"
						>
							Next
						</button>
					</li>
				) : null}
			</ul>
		</nav>
	);
};

Pagination.propTypes = {
	currentPage: propTypes.number.isRequired,
	totalNoOfItems: propTypes.number.isRequired,
	itemsPerPage: propTypes.number.isRequired,
	updateCurrentPage: propTypes.func.isRequired,
};

export default Pagination;
