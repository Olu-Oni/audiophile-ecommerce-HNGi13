import Image from "next/image";
import Link from "next/link";

// components/Hero.tsx
function Hero() {
  return (
    <section
      className="min-h-screen  flex flex-col items-center justify-center text-center px-4 pt-[90px] pb-10 text-white overflow-hidden relative"
      aria-labelledby="hero-heading"
    >
      {/* Base layer - darker background */}
      <div className="absolute inset-0 bg-[#121212] " />

      {/* Image layer */}
      <img
        src="/headphones.png"
        alt="Headphones"
        className="absolute inset-0 md:ml-auto w-full h-full object-cover max-w-3xl xl:w-[708.8px]"
      />

      {/* Masked color overlay - creates the vignette/fade effect */}
      <div
        className="absolute inset-0 bg-[#191919]"
        style={{
          maskImage:
            "radial-gradient(ellipse at center, transparent 100%, black 30%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, transparent 100%, black 30%)",
        }}
      />

      <div className="max-w-[379px] h-fit flex flex-col items-center z-20">
        <h6 className="overline-font opacity-[49.64%]">NEW PRODUCT</h6>
        <h1 id="hero-heading" className="mt-4 md:mt-6">
          XX99 Mark II HeadphoneS
        </h1>
        <p className="mt-6 mb-10 opacity-75">
          Experience natural, lifelike audio and exceptional build quality made
          for the passionate music enthusiast.
        </p>
        <Link href="#get-started">
          <button className="btn-1">see product</button>
        </Link>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    // <div className="flex flex-col items-center justify-center">
    <>
      <Hero />
      <main className="">
        {/* <button className="btn-2">Shtuff</button> */}
      </main>
    </>
    // </div>
  );
}
