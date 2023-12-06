"use client";
import { Button } from "@/components/ui/button";
// Import shadcn UI components
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import Image from "next/image";

// Import Stripe components
import { useShoppingCart } from "use-shopping-cart";

// Import local components
import UpCarrot from "../components/svg/UpCarrot";
import DownCarrot from "../components/svg/DownCarrot";

export default function ShoppingCartModal() {
  const {
    cartCount,
    shouldDisplayCart,
    handleCartClick,
    cartDetails,
    incrementItem,
    decrementItem,
    removeItem,
    totalPrice,
  } = useShoppingCart();

  return (
    <Sheet open={shouldDisplayCart} onOpenChange={() => handleCartClick()}>
      <SheetContent className="sm:max-w-lg w-[90dvw]">
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>

        <div className="h-full flex flex-col justify-between">
          <div className="mt-8 flex-1 overflow-y-auto">
            <ul className="-my-6 divide-y divide-gray-200">
              {cartCount === 0 ? (
                <h1 className="py-6">You don't have any items</h1>
              ) : (
                <>
                  {Object.values(cartDetails ?? {}).map((entry) => (
                    <li key={entry.id} className="flex py-6">
                      {/* Product Image */}
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <Image
                          src={entry.image as string}
                          alt="Product image"
                          width={100}
                          height={100}
                        />
                      </div>

                      {/* Product Info and Remove button */}
                      <div className="ml-4 flex flex-1 flex-col">
                        {/* Product Info */}
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>{entry.name}</h3>
                            <p className="ml-4">
                              ${entry.price * entry.quantity}
                            </p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                            {entry.description}
                          </p>
                        </div>

                        {/* Product quanity in cart  and Remove button*/}
                        <div className="flex flex-1 items-end justify-between align-top text-sm">
                          {/* Product quanity in cart */}
                          <div className="flex flex-row justify-center align-middle">
                            <p className="text-gray-500 pt-0.5">
                              QTY: {entry.quantity}
                            </p>
                            <div className="flex flex-col  ">
                              <button
                                className="center"
                                onClick={() => incrementItem(entry.id)}
                              >
                                <UpCarrot />
                              </button>
                              <button
                                className=""
                                onClick={() => decrementItem(entry.id)}
                              >
                                <DownCarrot />
                              </button>
                            </div>
                          </div>
                          {/* add quant
                          ity amount edit */}

                          {/* Product Remove button */}
                          <div className="flex">
                            <button
                              type="button"
                              onClick={() => removeItem(entry.id)}
                              className="font-medium text-primary hover:text-primary/80"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </>
              )}
            </ul>
          </div>
          {/* Subtotal and Checkout button */}
          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            {/* Subtotal */}
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Subttal:</p>
              <p>${totalPrice}</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">
              Shipping and taxes are calculated at checkout.
            </p>
            {/* Checkout button */}
            <div className="mt-6">
              <Button
                className="w-full"
                onClick={() => {
                  console.log("checkout");
                }}
              >
                Checkout
              </Button>
            </div>

            {/* Continue Shopping button */}
            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              <p>
                OR{" "}
                <button
                  onClick={() => handleCartClick()}
                  className="font-medium text-primary hover:text-primary/80"
                >
                  Continue Shopping
                </button>
              </p>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
