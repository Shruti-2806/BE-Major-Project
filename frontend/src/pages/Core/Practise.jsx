import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // Import useParams

export const Practise = () => {
	const { topicId } = useParams(); // Get topicId from route parameters
	const [questions, setQuestions] = useState([]);
	const [selectedAnswers, setSelectedAnswers] = useState({});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchQuestions = async () => {
			try {
				setLoading(true);
				setError(null);
				const response = await axios.get(
					`http://localhost:3000/api/core/questions/topics/${topicId}`
				);
				if (response.data.success) {
					setQuestions(response.data.data);
				} else {
					setError(response.data.message);
				}
			} catch (error) {
				setError(error.response ? error.response.data : "Network error");
			} finally {
				setLoading(false);
			}
		};

		fetchQuestions();
	}, [topicId]); // Dependency array to refetch when topicId changes

	const handleAnswerClick = (questionIndex, selectedOption) => {
		setSelectedAnswers({
			...selectedAnswers,
			[questionIndex]: selectedOption,
		});
	};

	return (
		<div className='min-h-screen from-blue-900 via-purple-900 to-pink-800 px-4 sm:px-6 lg:px-8 text-white'>
			<div className='max-w-7xl mx-auto'>
				<div className='text-center mb-16'>
					<h1 className='text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-4'>
						Practise DBMS Questions
					</h1>
					<div className='w-32 h-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mx-auto mb-8 rounded-full'></div>
				</div>

				{loading ? (
					<p className='text-gray-500'>Loading questions...</p>
				) : error ? (
					<p className='text-red-500'>{error}</p>
				) : (
					<div className='grid md:grid-cols-1 gap-12 mb-16'>
						{questions.map((question, index) => (
							<div
								key={question.id} // Use a unique key instead of index
								className='bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 overflow-hidden group'>
								<div className='p-8'>
									<h2
										className='text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400'
										style={{ fontFamily: "Nunito" }}>
										{question.subtopic}
									</h2>
									<p className='text-lg text-gray-400 mt-2'>
										<span className='font-semibold'>Question:</span>{" "}
										{question.question}
									</p>

									<ul className='mt-4 text-gray-300 space-y-2'>
										{question.options.map((option, idx) => (
											<li
												key={idx}
												className={`bg-gray-800 p-2 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors ${
													selectedAnswers[index] &&
													option === question.answer &&
													"bg-green-600 text-white"
												} ${
													selectedAnswers[index] &&
													option !== question.answer &&
													selectedAnswers[index] === option &&
													"bg-red-600 text-white"
												}`}
												onClick={() => handleAnswerClick(index, option)}>
												{option}
											</li>
										))}
									</ul>

									{selectedAnswers[index] && (
										<>
											<p className='mt-4 text-green-400'>
												<span className='font-semibold'>
													Correct Answer:
												</span>{" "}
												{question.answer}
											</p>
											<p className='mt-2 text-gray-400'>
												<span className='font-semibold'>Explanation:</span>{" "}
												{question.explanation}
											</p>
										</>
									)}
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default Practise;
