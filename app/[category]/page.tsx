import { getProductsByCategory } from "@/lib/data";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { NavBtn } from "@/components/ui/buttons";
import { BestGear, EndContent } from "@/components/layouts/content";
import { CardsCategoryGroup } from "@/components/ui/cards";

interface PageProps {
  params: {
    category: string;
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  const products = getProductsByCategory(category);

  if (products.length === 0) {
    notFound();
  }

  return (
    <>
      <h2 className="main-heading">
        {category}
      </h2>
      <main className="custom-container ">
        <section className="space-y-30 mx-auto mb-30 lg:mb-40">
          {products.map((product, index) => (
            <div
              key={product.id}
              className={`flex flex-col laptop:flex-row gap-8 items-center ${
                index % 2 === 1 ? "laptop:flex-row-reverse" : ""
              }`}
            >
              <div className="flex-1">
                <picture>
                  <source
                    media="(min-width: 1024px)"
                    srcSet={product.categoryImage.desktop}
                  />
                  <source
                    media="(min-width: 768px)"
                    srcSet={product.categoryImage.tablet}
                  />
                  <img
                    src={product.categoryImage.mobile}
                    alt={product.name}
                    className="w-full rounded-lg"
                  />
                </picture>
              </div>

              <div className="flex-1 text-center lg:text-left">
                {product.new && (
                  <span className="overline-font text-dark-orange">
                    New Product
                  </span>
                )}
                <h4 className="mt-4 mb-6">
                  {product.name}
                </h4>
                <p className=" mb-8 opacity-50">
                  {product.description}
                </p>
                
                <NavBtn href={`/${category}/${product.slug}`} text="See Product" className="max-lg:mx-auto"/>
              </div>
            </div>
          ))}
        </section>
        
        <EndContent/>
      </main>
    </>
  );
}

// Generate static paths for all categories
export async function generateStaticParams() {
  return [
    { category: "headphones" },
    { category: "speakers" },
    { category: "earphones" },
  ];
}
