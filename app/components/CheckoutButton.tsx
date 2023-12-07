// Import local components
import { Button } from "@/components/ui/button";

// Import Stripe components
import { useShoppingCart } from "use-shopping-cart";


export default function CheckoutButton() {
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
    <Button
      className="w-full"
      onClick={() => {
        console.log("checkout");
        console.log(cartDetails);
      }}
    >
      Checkout
    </Button>
  );
}
