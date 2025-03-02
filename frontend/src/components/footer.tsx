import { Link } from "react-router"
import Github from "@/components/icons/github-icon"

function Footer() {

  return (
    <footer className="w-full  mx-auto text-center flex items-center justify-between sticky bg-neutral-100/5 p-4 rounded-md">
      <p className='text-neutral-200 text-lg font-medium'>Budget Tracker &copy;</p>
      <h3 className="text-neutral-200 text-md font-medium">
        Made by {''}
        <Link viewTransition to="https://github.com/kete102" className="inline-flex underline underline-offset-2 items-center gap-x-2">
          Flavius Catalin <Github className="size-5" />
        </Link>
      </h3>
    </footer>
  )
}

export default Footer

