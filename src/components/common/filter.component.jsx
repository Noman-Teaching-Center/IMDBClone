/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import propTypes from 'prop-types';
import React from 'react';

const Filter = ({ categories, currentSelection, onSelect }) => {
	return (
		<ul className="m-4">
			{categories.map((category) => (
				<li
					key={category}
					onClick={() => onSelect(category)}
					className={`list-group-item ${
						currentSelection.includes(category) ? 'active' : ''
					}`}
				>
					{category}
				</li>
			))}
		</ul>
	);
};

Filter.propTypes = {
	categories: propTypes.arrayOf(propTypes.string).isRequired,
	currentSelection: propTypes.arrayOf(propTypes.string).isRequired,
	onSelect: propTypes.func.isRequired,
};

export default Filter;
