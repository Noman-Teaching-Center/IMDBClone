/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import propTypes from 'prop-types';
import React, { useState } from 'react';

const Rating = ({ isRated, toggleIsRated }) => {
	const [isHovered, setIsHovered] = useState(false);

	const handleMouseOver = (updatedIsHovered) => setIsHovered(updatedIsHovered);

	const getClassName = () => {
		return isRated
			? 'bi bi-star-fill'
			: `bi bi-star ${isHovered ? 'text-primary' : ''}`;
	};

	return (
		<i
			onMouseOver={() => handleMouseOver(true)}
			onMouseOut={() => handleMouseOver(false)}
			className={getClassName()}
			onClick={toggleIsRated}
		/>
	);
};

Rating.propTypes = {
	isRated: propTypes.bool.isRequired,
	toggleIsRated: propTypes.func.isRequired,
};

export default Rating;
