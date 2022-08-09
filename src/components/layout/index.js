import React from "react";
import Navbar from "../navbar";
import Footer from "../footer";
export default function Layout({ children }) {
	return (
		<div className="h-screen">
			<Navbar />
			{children}
      <Footer />
		</div>
	);
}
