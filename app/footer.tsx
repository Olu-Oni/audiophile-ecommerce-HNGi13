import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (<footer className="bg-black min-h-[365px] mt-auto text-white max-md:text-center  custom-container">
          <div className="max-w-[1440px]">
            <span className="h-1 w-[101px] bg-dark-orange block max-md:mx-auto"></span>
            <div className="flex max-md:flex-col flex-wrap items-center justify-between mt-13 md:mt-14 md:mb-[46px] lg:mt-[71px] lg:mb-12 gap-y-12 md:gap-y-8 ">
              <div className="md:w-full lg:w-fit">
                <Image width={143} height={25} src="/logo.svg" alt="" />
              </div>
              <nav className="flex lg:grow justify-end max-md:flex-col gap-4 font-bold text-[13px] leading-[25px] tracking-[2px] uppercase">
                <Link className="h-[25px]" href={"/"}>
                  Home
                </Link>
                <Link className="h-[25px]" href={"/category/headphones"}>
                  headphones
                </Link>
                <Link className="h-[25px]" href={"/category/speakers"}>
                  Speakers
                </Link>
                <Link className="h-[25px]" href={"/category/earphones"}>
                  Earphones
                </Link>
              </nav>
              <p className="opacity-50 w-full lg:grow  lg:max-w-[540px]">
                Audiophile is an all in one stop to fulfill your audio needs.
                We're a small team of music lovers and sound specialists who are
                devoted to helping you get the most out of personal audio. Come
                and visit our demo facility - we’re open 7 days a week.
              </p>
              <p className="opacity-50 lg:w-full lg:order-last md:mt-12 lg:mt-6">
                Copyright 2021. All Rights Reserved
              </p>
              <div className="space-x-4 mt-auto">
                <Link className="w-6 h-6" href={"#"}>
                  som
                </Link>
                <Link className="w-6 h-6" href={"#"}>
                  som
                </Link>
                <Link className="w-6 h-6" href={"#"}>
                  som
                </Link>
              </div>
            </div>
          </div>
        </footer>);
}
