// Import local interface
import Link from "next/link";
import { simplifiedProduct } from "../interface";

// Import sanity components
import { client } from "../lib/sanity";
import { ArrowRight } from "lucide-react";
import product from "@/sanity/schemas/product";

// Import next components
import Image from "next/image";
import { revalidatePath } from "next/cache";

revalidatePath("/");

{
  /*fetch data for the 4 newest products and assign it the variable data on the server */
}
async function getData() {
  const query = `*[_type =="product"][0...4] | order(_createdAt desc) {
        _id,
          price,
          name,
          "slug": slug.current,
          "categoryName": category->name,
          "imageUrl": images[0].asset->url
      }`;

  const fourNewestData = await client.fetch(query);
  return fourNewestData;
}

// Start of tsx
export default async function Newest() {
  {
    /* assign the data of the 4 newest products to the variable data inside the Newest component */
  }
  const fourNewestData: simplifiedProduct[] = await getData();
  return (
    //Setting the background of the component white
    <div className="bg-white">
      {/*formats the padding and margins for the component objects*/}
      <div className="mx-auto max-w-2xl px-4 py-16 sm:py-24 lg:max-w-7xl lg:px-8">
        {/*flex box for the Hero section Product header */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Our Newest products
          </h2>

          {/*Link to all Products */}
          <Link
            className="text-primary flex items-center gap-x-1"
            href={"/all"}
          >
            See All{" "}
            <span>
              <ArrowRight />
            </span>
          </Link>
        </div>

        {/* flex box for 4 newest products */}
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {fourNewestData.map((product) => (
            // element for each product
            <div key={product._id} className="group relative">
              {/* box for product picture */}
              <div className="aspect-square w-full overflow-hidden rounded-md bg-gray-200 hover:opacity-75 lg:h-80">
                <Image
                  src={product.imageUrl}
                  alt="Product Image"
                  className="w-full h-full object-cover object-center lg:h-full lg:w-full"
                  width={300}
                  height={300}
                />
              </div>

              {/* flex box for product information */}
              <div className="mt-4 flex justify justify-between">
                {/* element for product information */}
                <div>
                  <h3 className="text-sm text-gray-700">
                    <Link href={`/product/${product.slug}`}>
                      {product.name}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {product.categoryName}
                  </p>
                </div>
                {/*element for the price */}
                <p className="text-sm font-medium text-gray-900">
                  ${product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
