import { Outlet } from "react-router";
import Header from "../header";
import Footer from "../footer";

const PublicPagesLayout = () => {

	return (
		<div className="h-full flex flex-col w-screen p-4">
			<Header />
			<main className="h-full w-full my-2 mx-auto grow">
				<Outlet />
			</main>
			<Footer />
		</div >
	);
};

export default PublicPagesLayout;
