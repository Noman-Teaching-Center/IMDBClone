import React, { Component } from 'react';
import Table from './common/table/table.component';

class Students extends Component {
	constructor() {
		super();
		this.state = {
			students: [
				{
					id: '1',
					firstname: 'Mark',
					lastname: 'Otto',
					handle: '@mdo',
					img: 'https://img.freepik.com/free-photo/happy-young-female-student-holding-notebooks-from-courses-smiling-camera-standing-spring-clothes-against-blue-background_1258-70161.jpg?size=626&ext=jpg',
				},
				{
					id: '2',
					firstname: 'Abdullah',
					lastname: 'Noman',
					handle: '@n637',
					img: 'https://media.istockphoto.com/photos/handsome-afro-student-posing-on-bookshelves-background-picture-id1171062918?k=20&m=1171062918&s=612x612&w=0&h=I6djuMs92BCgJaBv5iIsPALt2oZ8mYQU7ttF1hmhPkE=',
				},
				{
					id: '1',
					firstname: 'Habibur',
					lastname: 'Rahman',
					handle: '@hbr',
					img: 'https://img.freepik.com/free-photo/teenager-student-girl-yellow-pointing-finger-side_1368-40175.jpg?size=626&ext=jpg',
				},
			],
		};
	}

	render() {
		const { students } = this.state;
		const studentsTableMetadata = {
			id: {
				header: 'ID',
				render: (id) => <p>{id}</p>,
				key: true,
			},
			firstname: {
				header: 'First Name',
				render: (title) => <p>{title}</p>,
			},
			lastname: {
				header: 'Last Name',
				render: (year) => <p>{year}</p>,
			},
			handle: {
				header: 'Handle',
				render: (handle) => <p>{handle}</p>,
			},
			img: {
				render: (imgSrc) => (
					<img
						className="w-16 rounded-full border-2 border-red-500"
						alt="student"
						src={imgSrc}
					/>
				),
			},

			exclude: ['img'],
		};
		return <Table data={students} metadata={studentsTableMetadata} />;
	}
}

export default Students;
