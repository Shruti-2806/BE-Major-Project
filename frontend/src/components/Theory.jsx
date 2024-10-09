import React from "react";
import { useParams, Link, Navigate, useNavigate } from "react-router-dom";

const Theory = () => {
	const { id } = useParams();
	console.log(id);

	const navigate = useNavigate();

	const subtopicDetails = {
        1: {
            id: 1,
			title: "Introduction to DBMS",
			content: `
        DBMS (Database Management System) is a software suite designed to store, manage, and retrieve data from databases. 
        It acts as an interface between the end users and the database, ensuring data integrity, security, and consistency. 
        Popular DBMS examples include MySQL, PostgreSQL, Oracle, and MongoDB.
      `,
			example:
				"Example: MySQL is widely used in web applications for its robustness and flexibility.",
		},
		2: {
			title: "ER Model",
			content: `
        The Entity-Relationship (ER) model is a high-level data model used to represent the data structures. 
        It uses entities (objects) and relationships to illustrate how data is interconnected. 
        ER diagrams help in database design and provide a visual representation of data models.
      `,
			example:
				"Example: An ER diagram may represent 'Students' as an entity and 'Courses' as another entity.",
		},
		3: {
			title: "Relational Model",
			content: `
        The relational model organizes data into tables (relations), where each table consists of rows and columns. 
        Each row represents a record, while columns represent attributes of the data. 
        SQL (Structured Query Language) is used to manage and manipulate data in relational databases.
      `,
			example:
				"Example: A 'Students' table with columns like 'StudentID', 'Name', and 'Age'.",
		},
		4: {
			title: "SQL Basics",
			content: `
        SQL (Structured Query Language) is the standard language for relational database management. 
        It enables users to perform tasks such as querying data, updating records, and creating database structures.
        Basic commands include SELECT, INSERT, UPDATE, DELETE, and JOIN.
      `,
			example:
				"Example: The SQL command SELECT * FROM Students; retrieves all records from the 'Students' table.",
		},
		5: {
			title: "Normalization",
			content: `
        Normalization is the process of organizing data to minimize redundancy and dependency. 
        It involves dividing a database into tables and establishing relationships between them. 
        The goal is to ensure that each piece of data is stored only once.
      `,
			example:
				"Example: In 1NF (First Normal Form), a table should have atomic values, meaning each cell should contain a single value.",
		},
		6: {
			title: "Transactions",
			content: `
        A transaction is a sequence of operations performed as a single logical unit of work. 
        Transactions ensure that a database remains in a consistent state, even in the event of a failure. 
        Key properties of transactions include Atomicity, Consistency, Isolation, and Durability (ACID).
      `,
			example:
				"Example: In a banking system, transferring money between accounts involves two operations: deducting from one account and adding to another.",
		},
		7: {
			title: "Indexes",
			content: `
        Indexes are special data structures that improve the speed of data retrieval operations on a database table. 
        They work like a book's index, allowing the database engine to find data quickly without scanning the entire table.
      `,
			example:
				"Example: An index on the 'StudentID' column of the 'Students' table can significantly speed up queries filtering by 'StudentID'.",
		},
		8: {
			title: "Joins",
			content: `
        Joins are used to combine rows from two or more tables based on a related column. 
        Different types of joins include INNER JOIN, LEFT JOIN, RIGHT JOIN, and FULL OUTER JOIN. 
        Joins are essential for retrieving data from multiple tables in a single query.
      `,
			example:
				"Example: An INNER JOIN between 'Students' and 'Courses' tables retrieves records for students enrolled in specific courses.",
		},
	};

	const subtopic = subtopicDetails[id];

	return (
		<div className='flex flex-col h-screen p-8 bg-gray-100 text-gray-900'>
			<Link to='/core/subtopic' className='mb-4 inline-block'>
				<button className='bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition duration-300 shadow-md'>
					&lt; Back to DBMS Topics
				</button>
			</Link>
			<div className='flex-grow flex items-center justify-center'>
				{subtopic ? (
					<div className='bg-white p-8 rounded-lg shadow-lg w-full h-full overflow-auto'>
						<h1 className='text-4xl font-bold mb-4'>{subtopic.title}</h1>
						<p className='text-gray-700 mb-4 whitespace-pre-line'>{subtopic.content}</p>
						<h2 className='text-2xl font-semibold mt-8 mb-2'>Example:</h2>
						<p className='text-gray-700'>{subtopic.example}</p>
						<button
							onClick={() => {
								navigate(`/core/subtopic/${subtopic.id}/practise`);
							}}
							className='mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition'>
							Practice
						</button>
					</div>
				) : (
					<p className='text-gray-700'>Subtopic not found.</p>
				)}
			</div>
		</div>
	);
};

export default Theory;
