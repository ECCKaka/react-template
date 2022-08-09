import React from "react";
// import Logo2 from "@/assets/img/Logo2.svg";
export default function Navbar() {
	return (
		<div className="w-screen h-1/6 flex flex-row">
			<div className="w-screen grid-rows-3 flex justify-between">
				{/* <div className="flex items-center">
					<img className="w-28 h5 ml-20" src={Logo2} alt="Logo2" />
				</div> */}
				<div className="flex items-center">
					<div className="w-36 h-12 flex grid items-center justify-items-center">
						Home
					</div>
					<div className="w-36 h-12 flex grid items-center justify-items-center">
						Projects
					</div>
					<div className="w-36 h-12 flex grid items-center justify-items-center">
						About Us
					</div>
					<div className="w-36 h-12 flex grid items-center justify-items-center">
						Blog
					</div>
					<div className="w-36 h-12 flex grid items-center justify-items-center">
						Contact Us
					</div>
				</div>
				<div className="flex items-center mr-20">
					{/* <img src={SignUp} alt="SignUp" ></img> */}
					<div className="w-32 h-12 rounded border-solid border font-semibold border-[#E0E5EB] mx-1  flex grid items-center justify-items-center">
						Sign In
					</div>
					<div className="w-32 h-12 rounded bg-[#09BC8A] font-semibold text-white mx-1 flex grid items-center justify-items-center">
						Sign Up
					</div>
				</div>
			</div>
		</div>
	);
}
