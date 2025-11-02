import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed bg-[#121212] top-0 left-0 right-0 z-50 text-white custom-container">
      <div className="">
        <nav className="flex items-center justify-between h-[90px] max-w-[1440px] mx-auto">
          <Link href="/" className="w-fit">
            <Image width={143} height={25} src="/logo.svg" alt="Logo" />
          </Link>

          <ul className="flex space-x-6 max-md:hidden">
            <li>
              <a
                href="#about"
                className="hover:text-orange-600 transition-colors"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#work"
                className="hover:text-orange-600 transition-colors"
              >
                Work
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="hover:text-orange-600 transition-colors"
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>

        <hr className="border-white/[0.104] border-t w-full max-w-[1440px]  mx-auto" />
      </div>
    </header>
  );
}
