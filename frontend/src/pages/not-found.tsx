import Footer from "@/components/footer"
import Header from "@/components/header"
import { Link } from "react-router"

function NotFound() {
  return (
    <div className="w-full h-full text-center flex flex-col p-2">
      <section className="flex grow flex-col items-center text-center justify-center">
        <Header />
        <h1 className="text-neutral-400 text-xl mt-4">Oops, something wrong ocurred</h1>
        <p className="text-neutral-400 text-2xl font-bold mb-4">404 - Not found</p>
        <Link to='/' className="text-neutral-900 bg-neutral-100 text-lg font-semibold text-center px-4 py-2 rounded-md ">Return to homepage</Link>
      </section>
      <Footer />
    </div>
  )
}

export default NotFound

