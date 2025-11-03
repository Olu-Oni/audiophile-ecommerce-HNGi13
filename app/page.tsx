import { BestGear } from "@/components/layouts/content";
import { NavBtn } from "@/components/ui/buttons";
import { CardsCategoryGroup } from "@/components/ui/cards";
import Image from "next/image";
import Link from "next/link";

// components/Hero.tsx
function Hero() {
  return (
    <section
      id="hero-section"
      className=" min-h-screen rounded-md max-md:px-0! custom-container flex flex-col items-center justify-center lg:items-start max-lg:text-center pt-[90px] pb-10 text-white overflow-hidden relative"
      aria-labelledby="hero-heading"
    >
      {/* Base layer - darker background */}
      <div className="absolute inset-0 bg-[#121212] lg:hidden" />
      <div
        className="absolute inset-0 bg-[#0E0E0E] max-lg:hidden z-10 opacity-50"
        style={{
          maskImage:
            "radial-gradient(ellipse at right, transparent 30%, black 60%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at right, transparent 10%, black 80%)",
        }}
      />
      {/* Masked color overlay - for the vignette/fade effect for smaller screen*/}
      <div
        className="absolute inset-0 bg-[#0E0E0E] lg:hidden z-10 opacity-50"
        style={{
          maskImage:
            "radial-gradient(ellipse at bottom, transparent 10%, black 40%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, transparent 10%, black 60%)",
        }}
      />

      {/* Masked color overlay - for the vignette/fade effect LARGER SCREEN*/}
      <div
        className="absolute  -z-30 inset-0 lg:bg-[#0E0E0E]"
        style={{
          maskImage:
            "radial-gradient(ellipse at center, transparent 30%, black 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, transparent 40%, black 80%)",
        }}
      />

      <picture className="absolute bg-[#1b1b1b] inset-0 flex items-center justify-center lg:justify-end min-h-full overflow-hidden">
        <source
          media="(min-width: 1440px)"
          srcSet="/home/desktop/image-hero.jpg"
        />
        <source
          media="(min-width: 768px)"
          srcSet="/home/tablet/image-header.jpg"
        />
        <img
          src="/home/mobile/image-header.jpg"
          alt="Speaker"
          className="object-scale-contain"
        />
      </picture>
      <div className="max-w-[1440px] relative w-full grow mx-auto flex items-center max-lg:justify-center">
        {/* Content */}
        <div className="max-w-[379px] h-fit flex flex-col max-lg:items-center z-20  max-md:px-4">
          <h6 className="overline-font opacity-[49.64%]">NEW PRODUCT</h6>
          <h1 id="hero-heading" className="mt-4 md:mt-6">
            XX99 Mark II HeadphoneS
          </h1>
          <p className="mt-6 mb-10 opacity-75">
            Experience natural, lifelike audio and exceptional build quality
            made for the passionate music enthusiast.
          </p>
          <NavBtn
            text="see product"
            href="/headphones/xx99-mark-two-headphones"
          />
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    // <div className="flex flex-col items-center justify-center">
    <>
      <Hero />
      <main className=" custom-container pt-[40.5px] md:pt-[148.5px] ">
        <CardsCategoryGroup />

        <section className=" mt-30 flex flex-wrap gap-y-6">
          <div className="w-full px-6 lg:pr-[95px] lg:pl-[118px] max-lg:py-14 h-[600px] md:h-[720px] lg:h-[560px] bg-dark-orange rounded-lg relative overflow-hidden place-items-center max-lg:text-center text-white flex flex-col lg:flex-row justify-between">
            <Image
              src={"/home/desktop/pattern-circles.svg"}
              alt=""
              width={558}
              height={558}
              className="absolute left-1/2 min-w-[558px] -translate-x-1/2 -top-[121px] lg:scale-[175%] lg:top-[190px] lg:left-80"
            />

            <picture className="relative lg:-bottom-11">
              <source
                media="(min-width: 1440px)"
                srcSet="/home/desktop/image-speaker-zx9.png"
              />
              <source
                media="(min-width: 768px)"
                srcSet="/home/tablet/image-speaker-zx9.png"
              />
              <img
                src="/home/mobile/image-speaker-zx9.png"
                alt="Speaker"
                className="w-[172] md:w-[197px] lg:w-[410px] lg:h-[493px] lg object-cover "
              />
            </picture>

            <div className="max-lg:place-items-center max-w-[350px] md:pb-2 lg:mt-[9px]">
              <h1 className="mt-8 mb-6">
                ZX9
                <br /> SPEAKER
              </h1>
              <p className="mb-6 md:mb-10">
                Upgrade to premium speakers that are phenomenally built to
                deliver truly remarkable sound.
              </p>
              <NavBtn
                text="see product"
                href="/speakers/zx9-speaker"
                variant="btn-4"
              />
            </div>
          </div>

          <div className="w-full  h-80   rounded-lg relative overflow-hidden flex flex-col p-6 sm:p-[62px] justify-center   text-black">
            {/* <div className="bg-[url('/home/mobile/image-speaker-zx7.jpg')] md:bg-[url('/home/tablet/image-speaker-zx7.jpg')] absolute -z-20 inset-0  bg-cover bg-center  bg-no-repeat"></div> */}
            <picture className="absolute inset-0 -z-20">
              <source
                media="(min-width: 1440px)"
                srcSet="/home/desktop/image-speaker-zx7.jpg"
              />
              <source
                media="(min-width: 768px)"
                srcSet="/home/tablet/image-speaker-zx7.jpg"
              />
              <img
                src="/home/mobile/image-speaker-zx7.jpg"
                alt="Speaker"
                className="w-full h-full object-cover "
              />
            </picture>
            <h4 className="mt-8 mb-6">ZX7 SPEAKER</h4>

            <NavBtn
              text="see product"
              href="/speakers/zx7-speaker"
              variant="btn-2"
            />
          </div>

          <div id="earphones-grp" className="flex max-md:flex-col gap-6 flex-1">
            <div className="w-full md:basis-1/2 h-50 md:h-80  rounded-lg relative overflow-hidden">
              {/* <div className="bg-[url('/home/mobile/image-speaker-zx7.jpg')] md:bg-[url('/home/tablet/image-speaker-zx7.jpg')] absolute -z-20 inset-0  bg-cover bg-center  bg-no-repeat"></div> */}
              <picture className="absolute inset-0 -z-20">
                <source
                  media="(min-width: 768px)"
                  srcSet="/home/tablet/image-earphones-yx1.jpg"
                />
                <img
                  src="/home/mobile/image-earphones-yx1.jpg"
                  alt="earphones"
                  className="w-full h-full object-cover"
                />
              </picture>
            </div>
            <div className="w-full md:basis-1/2 h-50  md:h-80 rounded-lg relative overflow-hidden flex flex-col p-6 md:p-[41px] lg:p-[95px] justify-center  bg-dark-grey text-black">
              <h4 className="mb-8">YX1 EARPHONES</h4>

              <NavBtn text="see product" href="/earphones/yx1-earphones"
               variant="btn-2" />
            </div>
          </div>
        </section>
        <BestGear />
      </main>
    </>
    // </div>
  );
}
