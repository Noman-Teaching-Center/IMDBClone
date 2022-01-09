/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import propTypes from 'prop-types';
import React, { Component } from 'react';

class Rating extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isHovered: false,
		};
	}

	handleMouseOver = (isHovered) => {
		this.setState({
			isHovered,
		});
	};

	getClassName = () => {
		const { isRated } = this.props;
		const { isHovered } = this.state;
		return isRated
			? 'bi bi-star-fill'
			: `bi bi-star ${isHovered ? 'text-primary' : ''}`;
	};

	render() {
		const { toggleIsRated } = this.props;
		return (
			<i
				onMouseOver={() => this.handleMouseOver(true)}
				onMouseOut={() => this.handleMouseOver(false)}
				className={this.getClassName()}
				onClick={toggleIsRated}
			/>
		);
	}
}

Rating.propTypes = {
	isRated: propTypes.bool.isRequired,
	toggleIsRated: propTypes.func.isRequired,
};

export default Rating;
