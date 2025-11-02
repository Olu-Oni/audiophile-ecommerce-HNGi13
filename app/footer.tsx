import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-white mt-auto custom-container">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-0">
        {/* Orange accent bar */}
        <span className="h-1 w-[101px] bg-dark-orange block max-md:mx-auto"></span>

        {/* Logo and Navigation Row */}
        <div className="flex flex-col md:flex-row items-center md:justify-between mt-12 md:mt-14 lg:mt-[71px] gap-8 md:gap-0">
          <Image width={143} height={25} src="/logo.svg" alt="Audiophile" />

          <nav className="flex flex-col md:flex-row items-center gap-4 md:gap-[34px] font-bold text-[13px] leading-[25px] tracking-[2px] uppercase">
            <Link href="/" className="hover:text-dark-orange transition-colors">
              Home
            </Link>
            <Link
              href="/category/headphones"
              className="hover:text-dark-orange transition-colors"
            >
              Headphones
            </Link>
            <Link
              href="/category/speakers"
              className="hover:text-dark-orange transition-colors"
            >
              Speakers
            </Link>
            <Link
              href="/category/earphones"
              className="hover:text-dark-orange transition-colors"
            >
              Earphones
            </Link>
          </nav>
        </div>

        {/* Description and Social Icons Row */}
        <div className="flex flex-col max-md:items-center lg:flex-row lg:justify-between lg:items-end mt-9 md:mt-8 lg:mt-9 gap-12 md:gap-20 lg:gap-0">
          <p className="opacity-50 text-[15px] leading-[25px] max-w-[540px] max-md:text-center">
            Audiophile is an all in one stop to fulfill your audio needs. We're
            a small team of music lovers and sound specialists who are devoted
            to helping you get the most out of personal audio. Come and visit
            our demo facility - we're open 7 days a week.
          </p>

          <div className="flex gap-4 max-md:justify-center lg:mb-2 max-lg:hidden">
            <Link
              href="#"
              className="hover:opacity-100 transition-opacity"
              aria-label="Facebook"
            >
              <Image
                src="/shared/desktop/icon-facebook.svg"
                width={24}
                height={24}
                alt=""
              />
            </Link>
            <Link
              href="#"
              className="hover:opacity-100 transition-opacity"
              aria-label="Twitter"
            >
              <Image
                src="/shared/desktop/icon-twitter.svg"
                width={24}
                height={24}
                alt=""
              />
            </Link>
            <Link
              href="#"
              className="hover:opacity-100 transition-opacity"
              aria-label="Instagram"
            >
              <Image
                src="/shared/desktop/icon-instagram.svg"
                width={24}
                height={24}
                alt=""
              />
            </Link>
          </div>
        </div>

        {/* Copyright and social icpns(on larger screen)*/}
        <div className="flex max-md:flex-col gap-y-12 justify-between mt-12 md:mt-20 lg:mt-14 pb-[38px] md:pb-12 ">
          <p className="opacity-50 text-[15px] leading-[25px] max-md:text-center">
            Copyright 2021. All Rights Reserved
          </p>

          <div className="flex gap-4 max-md:justify-center lg:mb-2 lg:hidden">
            <Link
              href="#"
              className="hover:opacity-100 transition-opacity"
              aria-label="Facebook"
            >
              <Image
                src="/shared/desktop/icon-facebook.svg"
                width={24}
                height={24}
                alt=""
              />
            </Link>
            <Link
              href="#"
              className="hover:opacity-100 transition-opacity"
              aria-label="Twitter"
            >
              <Image
                src="/shared/desktop/icon-twitter.svg"
                width={24}
                height={24}
                alt=""
              />
            </Link>
            <Link
              href="#"
              className="hover:opacity-100 transition-opacity"
              aria-label="Instagram"
            >
              <Image
                src="/shared/desktop/icon-instagram.svg"
                width={24}
                height={24}
                alt=""
              />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
