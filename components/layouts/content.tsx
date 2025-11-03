import { CardsCategoryGroup } from "../ui/cards";

export function BestGear() {
  return (
    <section className="flex max-lg:flex-col gap-y-10 gap-x-[125px] md:gap-y-[63px] place-items-center max-lg:text-center mt-30 mb-[120px] md:mb-[133px]">
      <div className="w-full  lg:min-w-[540px]    rounded-lg relative overflow-hidden flex flex-col justify-center  text-black">
        {/* <div className="bg-[url('/home/mobile/image-speaker-zx7.jpg')] md:bg-[url('/home/tablet/image-speaker-zx7.jpg')] absolute -z-20 inset-0  bg-cover bg-center  bg-no-repeat"></div> */}
        <picture className="w-full h-[300px] lg:min-h-[588px] lg:min-w-[540px] ">
          <source
            media="(min-width: 1440px)"
            srcSet="/shared/desktop/image-best-gear.jpg"
          />
          <source
            media="(min-width: 768px)"
            srcSet="/shared/tablet/image-best-gear.jpg"
          />
          <img
            src="/shared/mobile/image-best-gear.jpg"
            alt="best gear"
            className="w-full h-full object-cover"
          />
        </picture>
      </div>
      <div className="md:px-[58px] lg:p-0 lg:-order-1">
        <h4 className="tracking-[1px] mb-8 lg:hidden">
          Bringing you the <span className="text-dark-orange">best</span> audio
          gear
        </h4>
        <h2 className="mb-8 max-lg:hidden">
          Bringing you the <span className="text-dark-orange">best</span> audio
          gear
        </h2>
        <p className="opacity-50 text-black">
          Located at the heart of New York City, Audiophile is the premier store
          for high end headphones, earphones, speakers, and audio accessories.
          We have a large showroom and luxury demonstration rooms available for
          you to browse and experience a wide range of our products. Stop by our
          store to meet some of the fantastic people who make Audiophile the
          best place to buy your portable audio equipment.
        </p>
      </div>
    </section>
  );
}

export function EndContent() {
  return (
    <>
      <CardsCategoryGroup />
      <BestGear />
    </>
  );
}
