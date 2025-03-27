// Import local components
import { simplifiedProduct } from "../interface";
import { client } from "../lib/sanity";
// Import Next components
import Image from "next/image";
import Link from "next/link";

async function getCategoryData(category: string) {
  if (category == "all") {
    const query = `*[_type =="product"] | order(_createdAt desc) {
      _id,
        price,
        name,
        "slug": slug.current,
        "categoryName": category->name,
        "imageUrl": images[0].asset->url
    }`;

    const categoryDataFromServer = await client.fetch(query);
    console.log(category);

    return categoryDataFromServer;
  } else {
    const query = `*[_type == "product" && category -> name == "${category}"]{
        _id,
          "imageUrl": images[0].asset -> url,
          price,
          name,
          "slug": slug.current,
          "categoryName": category ->name
      }`;

    const categoryDataFromServer = await client.fetch(query);
    console.log(category);

    return categoryDataFromServer;
  }
}
export default async function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const categoryData: simplifiedProduct[] = await getCategoryData(
    params.category
  );
  return (
    //Setting the background of the component white
    <div className="bg-white">
      {/*formats the padding and margins for the component objects*/}
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        {/*flex box for the Hero section Product header */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Our Products for {params.category}
          </h2>
        </div>

        {/* flex box for Categoried products */}
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {categoryData.map((product) => (
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
