import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const AptitudeSubjects = () => {
	const [subjects, setSubjects] = useState([]);

	// Fetch data from the backend using axios
	useEffect(() => {
		const fetchSubjects = async () => {
			try {
				const response = await axios.get("http://localhost:3000/api/aptitude/categories");
				setSubjects(response.data);
			} catch (error) {
				console.error("Error fetching subjects:", error);
			}
		};

		fetchSubjects();
	}, []);

	return (
		<div className='min-h-screen from-blue-900 via-purple-900 to-pink-800 px-4 sm:px-6 lg:px-8 text-white'>
			<div className='max-w-7xl mx-auto'>
				<div className='text-center mb-16'>
					<h1 className='text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-4'>
						APTITUDE
					</h1>
					<div className='w-32 h-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mx-auto mb-8 rounded-full'></div>
					<p
						className='text-2xl text-gray-500 max-w-3xl mx-auto'
						style={{ fontFamily: "Nunito" }}>
						Master these aptitude topics to excel in your online assesments.
					</p>
				</div>

				{/* Dynamically render subjects fetched from API */}
				<div className='grid md:grid-cols-2 gap-12 mb-16'>
					{subjects.map((subject) => (
						<div
							key={subject._id}
							className='bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 overflow-hidden group'>
							<div className='flex flex-col items-center space-y-4 pb-2 relative p-8'>
								<div className='w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300'>
									<img
										src='https://uxwing.com/wp-content/themes/uxwing/download/web-app-development/database-icon.png' // Example image, you can customize
										alt={subject.category_name}
										className='rounded-full w-16 h-16'
									/>
								</div>
								<h2
									className='text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400'
									style={{ fontFamily: "Nunito" }}>
									{subject.category_name}
								</h2>
								<div className='absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 opacity-10 rounded-full blur-2xl transform translate-x-12 -translate-y-12'></div>
							</div>
							<div className='px-6 py-4'>
								<p className='text-gray-300 text-center'>{subject.category_description}</p>
							</div>
							<div className='flex justify-center space-x-4 py-4'>
								{/* Link component for navigation */}
								<Link to={`/aptitude/${subject._id}/subtopic`}>
									<button className='bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-white py-2 px-4 rounded-full hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-lg'>
										Practise
									</button>
								</Link>
							</div>
						</div>
					))}
				</div>

				<div className='flex flex-col items-center mb-16'>
					<p
						className='text-center text-gray-500 max-w-3xl text-lg'
						style={{ fontFamily: "Nunito" }}>
						Aptitude tests are essential for assessing critical thinking, logical
						reasoning, and problem-solving skills. They are a key component in
						competitive exams and job placements, helping employers evaluate candidates'
						ability to perform under pressure and solve real-world problems effectively.
						Mastering these skills will significantly enhance your chances of success in
						the tech industry and beyond.
					</p>
				</div>
			</div>
		</div>
	);
};

export default AptitudeSubjects;
