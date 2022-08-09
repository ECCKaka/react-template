import React from "react";
import "./App.css";
import Layout from "./components/layout";
// console.log("process.env.MODE", process.env.MODE, process.env.BASE_URL);
function App() {
	return (
		<Layout>
			<h1 className="text-3xl font-bold underline">Hello world!</h1>
		</Layout>
	);
}

export default App;
