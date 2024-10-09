import React from "react";
import { Link } from "react-router-dom";

const TopicList = () => {
	const subtopics = [
		{ id: 1, name: "Introduction to DBMS", progress: 80 },
		{ id: 2, name: "ER Model", progress: 50 },
		{ id: 3, name: "Relational Model", progress: 70 },
		{ id: 4, name: "SQL Basics", progress: 30 },
		{ id: 5, name: "Normalization", progress: 90 },
		{ id: 6, name: "Transactions", progress: 40 },
		{ id: 7, name: "Indexes", progress: 60 },
		{ id: 8, name: "Joins", progress: 20 },
	];

	return (
		<div className='min-h-screen text-white px-4 sm:px-6 lg:px-8 '>
			<div className='max-w-7xl mx-auto'>
				<div className='text-center mb-16'>
					<h1 className='text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-4'>
						Learn DBMS
					</h1>
					<div className='w-32 h-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mx-auto mb-8 rounded-full'></div>
					<p
						className='text-2xl text-gray-500 max-w-3xl mx-auto'
						style={{ fontFamily: "Nunito" }}>
						A comprehensive list of DBMS subtopics to help you master database concepts
						and techniques.
					</p>
				</div>

				<div className='bg-gray-900 rounded-lg shadow-2xl overflow-hidden'>
					<table className='min-w-full table-auto'>
						<thead>
							<tr className='bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-white'>
								<th className='px-6 py-4 text-left text-lg font-semibold border-b border-gray-600'>
									Subtopic ID
								</th>
								<th className='px-6 py-4 text-left text-lg font-semibold border-b border-gray-600'>
									Subtopic Name
								</th>
								<th className='px-6 py-4 text-left text-lg font-semibold border-b border-gray-600'>
									Progress
								</th>
							</tr>
						</thead>
						<tbody className='bg-gray-800'>
							{subtopics.map((subtopic, index) => (
								<tr
									key={subtopic.id}
									className={`${
										index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"
									} hover:bg-gray-600 transition-colors duration-300`}>
									<td className='px-6 py-4 text-lg text-gray-300 border-b border-gray-600'>
										{subtopic.id}
									</td>
									<td className='px-6 py-4 text-lg font-medium text-gray-200 border-b border-gray-600'>
										<Link
											to={`/core/subtopic/${subtopic.id}`}
											className='text-white-400 hover:underline'>
											{subtopic.name}
										</Link>
									</td>
									<td className='px-6 py-4 border-b border-gray-600'>
										<div className='relative pt-1'>
											<div className='flex items-center justify-between'>
												<div className='text-sm text-gray-300'>
													{subtopic.progress}%
												</div>
											</div>
											<div className='bg-gray-600 rounded-full h-2'>
												<div
													className={`bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 h-2 rounded-full`}
													style={{ width: `${subtopic.progress}%` }}
												/>
											</div>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default TopicList;
