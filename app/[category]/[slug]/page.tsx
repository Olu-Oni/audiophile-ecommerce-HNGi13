
import { getProductBySlug, getAllProducts } from "@/lib/data";
import { notFound } from "next/navigation";
// import Image from "next/image";
import Link from "next/link";
import { EndContent } from "@/components/layouts/content";
import { AddToCart } from "@/components/layouts/add-to-cart";

interface PageProps {
  params: {
    category: string;
    slug: string;
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { category, slug } = await params; 
  const product = await getProductBySlug(slug);
  console.log(product);

  if (!product || product.category !== category) {
    notFound();
  }

  const othersWithData = await Promise.all(
    product.others.map(async (other) => {
      const fullProduct = await getProductBySlug(other.slug);
      return fullProduct ? { ...other, category: fullProduct.category } : null;
    })
  );

  // Filter out any nulls (in case of missing data)
  const validOthers = othersWithData.filter(Boolean) as Array<{
    slug: string;
    name: string;
    image: any;
    category: string;
  }>;

  return (
    <main className="custom-container mt-[90px] lg:mt-24">
      {/* Back button */}
      <Link href={`/${category}`} className="opacity-50 mt-4 mb-6 inline-block">
        Go Back
      </Link>

      {/* Product detail */}
      <section className="flex flex-col md:flex-row gap-y-12 gap-x-[69px] items-center mb-22">
        <div className="flex-1">
          <picture>
            <source
              media="(min-width: 1024px)"
              srcSet={product.image.desktop}
            />
            <source media="(min-width: 768px)" srcSet={product.image.tablet} />
            <img
              src={product.image.mobile}
              alt={product.name}
              className="w-full md:min-w-[281px] rounded-lg"
            />
          </picture>
        </div>

        <div className="flex-1">
          {product.new && (
            <span className="text-dark-orange text-sm uppercase tracking-[10px]">
              New Product
            </span>
          )}
          <h4 className=" mt-4 mb-6 tracking-[32px]">{product.name}</h4>
          <p className="mb-8 opacity-50">{product.description}</p>
          <h6 className="mb-8">${product.price.toLocaleString()}</h6>

          <AddToCart product={product} />
          {/* <div className="flex gap-4 ">
            <div className="flex items-center gap-4 bg-dark-grey px-4 w-30">
              <button className="opacity-25 hover:text-dark-orange w-full!">
                -
              </button>
              <span className="font-bold">1</span>
              <button className="opacity-25 hover:text-dark-orange w-full!">
                +
              </button>
            </div>
            <button className="btn-1">Add to Cart</button>
          </div> */}
        </div>
      </section>

      {/* Features */}
      <section className="flex max-laptop:flex-col sm:gap-y-[113px] md:gap-y-[120px] laptop:gap-x-[125px] mb-32">
        <div>
          <h3 className="mb-8">Features</h3>
          <p className="opacity-50 whitespace-pre-line">{product.features}</p>
        </div>

        <div className="min-w-[350px]">
          <h3 className="mb-8 ">In the Box</h3>
          <ul className="space-y-2">
            {product.includes.map((item, index) => (
              <li key={index} className="flex gap-6">
                <span className="text-dark-orange font-bold">
                  {item.quantity}x
                </span>
                <span className="opacity-50">{item.item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Gallery */}
      <section className="grid md:grid-cols-2 gap-5 md:gap-[18px] laptoo:gap-[30px] mb-40">
        <div className="flex flex-col gap-5 laptop:gap-8">
          <picture>
            <source
              media="(min-width: 1024px)"
              srcSet={product.gallery.first.desktop}
            />
            <img
              src={product.gallery.first.mobile}
              alt=""
              className="w-full rounded-lg"
            />
          </picture>
          <picture>
            <source
              media="(min-width: 1024px)"
              srcSet={product.gallery.second.desktop}
            />
            <img
              src={product.gallery.second.mobile}
              alt=""
              className="w-full rounded-lg"
            />
          </picture>
        </div>
        <picture>
          <source
            media="(min-width: 1024px)"
            srcSet={product.gallery.third.desktop}
          />
          <img
            src={product.gallery.third.mobile}
            alt=""
            className="w-full h-full object-cover rounded-lg"
          />
        </picture>
      </section>

      {/* You may also like */}
      <section className="mb-30 lg:mb-40">
        <h3 className="text-center mb-12">You May Also Like</h3>
        <div className="grid md:grid-cols-3 gap-y-14 gap-x-[11px] laptop:gap-x-[30px]">
          {validOthers.map((other) => (
            <div key={other.slug} className="text-center">
              <picture>
                <source
                  media="(min-width: 1024px)"
                  srcSet={other.image.desktop}
                />
                <source
                  media="(min-width: 768px)"
                  srcSet={other.image.tablet}
                />
                <img
                  src={other.image.mobile}
                  alt={other.name}
                  className="w-full rounded-lg mb-6"
                />
              </picture>
              <h5 className="mb-6">{other.name}</h5>
              <Link href={`/${other.category}/${other.slug}`}>
                <button className="btn-1">See Product</button>
              </Link>
            </div>
          ))}
        </div>
      </section>
      <EndContent />
    </main>
  );
}

// Generate static paths for all products
export async function generateStaticParams() {
  const products = await getAllProducts();

  return products.map((product) => ({
    category: product.category,
    slug: product.slug,
  }));
}
