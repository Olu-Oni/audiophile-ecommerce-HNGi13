import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <>
      <nav className="fixed top-0 z-50  text-white h-[90px] custom-container">
        <div className="max-w-5xl flex items-center justify-between w-full h-fit ">
          <Link href="/" className="w-fit ">
            <Image width={143} height={25} src="/logo.svg" alt="" />
          </Link>
          <ul className="flex space-x-6 max-md:hidden">
            <li>
              <a href="#about" className="hover:text-orange-600">
                About
              </a>
            </li>
            <li>
              <a href="#work" className="hover:text-orange-600">
                Work
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-orange-600">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <div className=" w-full h-px fixed top-[89px] md:px-10 lg:px-[165px] z-50">
        <hr className="text-white opacity-[10.4%] w-full h-full max-w-5xl" />
      </div>
    </>
  );
}
