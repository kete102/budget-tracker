import { Navigate, Outlet } from "react-router";
import Header from "../header";
import Footer from "../footer";
import { useAuth } from "@/hooks/useAuth";

const PrivatePagesLayout = () => {
	const { user } = useAuth();


	return (
		<div className="min-h-screen flex flex-col w-full p-4">
			<Header />
			<main className="container mx-auto grow">
				<Outlet />
			</main>
			<Footer />
		</div>
	);
};

export default PrivatePagesLayout;
