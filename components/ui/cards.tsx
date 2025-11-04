import Image from "next/image";
import Link from "next/link";
// import Shadows from "@/components/ui/shadows";

interface CardsCategoryProps {
  title: string;
  href: string;
  imageSrc: string;
  imageWidth?: number;
  imageHeight?: number;
  imageAlt?: string;
  className?: string;
}

export function CardsCategory({
  title,
  href,
  imageSrc,
  imageWidth = 155,
  imageHeight = 180,
  imageAlt = "",
  className = "",
}: CardsCategoryProps) {
  return (
    <div
      className={`w-full lg:grow h-[165px] lg:h-[204px] md:w-[350px] justify-end pb-[22px] lg:pb-[30px] bg-dark-grey rounded-md relative flex flex-col items-center ${className}`}
    >
      <div className="absolute -top-13 lg:scale-140">
        <Image
          src={imageSrc}
          width={imageWidth}
          height={imageHeight}
          alt={imageAlt}
        />
        {/* Layered shadows for depth */}
        {/* <Shadows /> */}
      </div>
      <h6 className="font-bold text-[15px] tracking-[1.07px] uppercase">
        {title}
      </h6>
      <Link
        href={href}
        className="btn-3 mt-[17px] font-bold tracking-[1px] flex gap-x-[13.32px] items-center justify-center"
      >
        SHOP
        <Image
          src={"/shared/desktop/icon-arrow-right.svg"}
          width={5}
          height={10}
          alt="shop arrow"
          className="grow min-w-[5px] min-h-[10px]"
        />
      </Link>
    </div>
  );
}

interface CardsCategoryGroupProps {
  title?: string;
  href?: string;
  imageSrc?: string;
  imageWidth?: number;
  imageHeight?: number;
  imageAlt?: string;

  className?: string;
}

export function CardsCategoryGroup(
    {
//   title,
//   href,
//   imageSrc,
//   imageWidth,
//   imageHeight,
//   imageAlt,
  className = "",
}: CardsCategoryGroupProps

) {
  return (
    <section
      className={`flex mt-[51.5px] flex-col md:flex-row gap-6 w-full items-center justify-center ${className} gap-x-2.5 lg:gap-x-[30px] gap-y-[68px]`}
    >
      <CardsCategory
        title={"Headphones"}
        href={"/headphones"}
        imageSrc={"/shared/desktop/image-category-thumbnail-headphones.png"}
        // imageWidth={imageWidth}
        // imageHeight={imageHeight}
        imageAlt={"headphones"}
        className={""}
      />
      <CardsCategory
        title={"Speakers"}
        href={"/speakers"}
        imageSrc={"/shared/desktop/image-category-thumbnail-speakers.png"}
        // imageWidth={imageWidth}
        // imageHeight={imageHeight}
        imageAlt={"speaker"}
        className={""}
      />
      <CardsCategory
        title={"Earphones"}
        href={"/earphones"}
        imageSrc={"/shared/desktop/image-category-thumbnail-earphones.png"}
        // imageWidth={imageWidth}
        // imageHeight={imageHeight}
        imageAlt={"earphones"}
        className={""}
      />
    </section>
  );
}
