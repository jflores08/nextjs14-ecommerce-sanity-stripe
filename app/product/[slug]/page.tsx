// Import sanity components

import ImageGallery from "@/app/components/ImageGallery";
import { individualProduct } from "@/app/interface";
import { client } from "@/app/lib/sanity";
import { Button } from "@/components/ui/button";
import { Star, Truck } from "lucide-react";
// Import next components
import { revalidatePath } from "next/cache";

{
  /* Get individual product information and assign it to individualData variable */
}
async function getData(slug: string) {
  revalidatePath(`/product/${slug}`);
  const query = `*[_type =="product" && slug.current == "${slug}"][0]{
        _id,
          images,
          price,
          name,
          description,
          "slug": slug.current,
          "categoryName": category->name,
          
      }`;

  const individualProductData = await client.fetch(query);
  console.log(individualProductData.images);
  return individualProductData;
}

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const individualProductData = await getData(params.slug);
  return (
    <main className="bg-white">
      <div className="mx-auto max-w-screen-xl px-4 md:px-8">
        <section className="grid gap-8 md:grid-cols-2">
          <ImageGallery images={individualProductData.images} />
          <div className="md:py-8">
            <div className="mb-2 md:mb-3">
              <span className="mb-0.5 inline-block text-gray-500">
                {individualProductData.categoryName}
              </span>
              <h2 className="text-2xl font-bold text-gray-800 lg:text-3xl">
                {individualProductData.name}
              </h2>
            </div>

            {/*Rating button and label */}
            <div className="mb-6 flex items-center gap-3 md:mb-10">
              <Button className="rounded-full gap-x-1">
                <span className="text-sm">4.2</span>
                <Star className="h-6 w-5" />
              </Button>
              <span className="text-sm text-gray-500 transition duration-100">
                56 Ratings
              </span>
            </div>

            {/* Pricing section */}
            <div className="mb-4">
              {/* Price */}
              <div className="flex items-end gap-2">
                <span className="text-xl font-bold text-gray-800 md:text-2xl">
                  ${individualProductData.price}
                </span>
                <span className="mb-0.5 text-red-500 line-through">
                  ${individualProductData.price + 30}
                </span>
              </div>
              {/* Shipping  */}
              <span className="text-sm text-gray-500">
                Incl. Vat plus shipping
              </span>
            </div>
            <div className="mb-6 flex items-center gap-2 text-gray-500">
              <Truck className="w-6 h-6" />
              <span className="text-sm">2-4 Day shipping</span>
            </div>

            {/*Buttons to purchase */}
            <div className="flex gap-2.5">
              <Button>Add To Bag</Button>
              <Button variant={"secondary"}>Checkout Now</Button>
            </div>

            {/*Item description */}
            <p className="mt-12 text-base text-gray-500 tracking- tracking-wide">
              {individualProductData.description}
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
