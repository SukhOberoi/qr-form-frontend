import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Admin = () => {
    const location = useLocation();
	const [password, setPassword] = useState("");
	const [isAuthenticated, setIsAuthenticated] = useState(location.state || false);
	const [error, setError] = useState("");

	const correctPassword = "khuljasimsim"; // Replace with your actual password

	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (password === correctPassword) {
			setIsAuthenticated(true);
			setError("");
		} else {
			setError("Incorrect password");
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			{!isAuthenticated ? (
				<form
					onSubmit={handleSubmit}
					className="p-8 bg-white rounded-lg shadow-lg w-96"
				>
					<h2 className="mb-6 text-2xl font-bold text-center">
						Admin Login
					</h2>
					<div className="mb-4">
						<label
							htmlFor="password"
							className="block text-sm font-medium text-gray-700"
						>
							Password
						</label>
						<input
							type="password"
							id="password"
							value={password}
							onChange={handlePasswordChange}
							required
							className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
						/>
					</div>
					{error && (
						<p className="mb-4 text-sm text-center text-red-500">
							{error}
						</p>
					)}
					<button
						type="submit"
						className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
					>
						Submit
					</button>
				</form>
			) : (
				
					<div className="p-8 bg-white rounded-lg shadow-lg w-96">
					    <Link to="/recruitments" state={{ isAuthenticated: isAuthenticated }}><button className="w-full px-4 py-2 my-2 font-semibold text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">Recruitments Sign ups</button></Link>
    					<Link to="/cq" state={{ isAuthenticated: isAuthenticated }}><button className="w-full px-4 py-2 my-2 font-semibold text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">CQ Registrations</button></Link>
    					<button className="w-full px-4 py-2 my-2 font-semibold text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500" onClick={()=> {setIsAuthenticated(false)}}>Log Out</button>
					</div>
			)}
		</div>
	);
};
export default Admin;
