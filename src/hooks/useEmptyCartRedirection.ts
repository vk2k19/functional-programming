import { useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export const useEmptyCartRedirection = () => {
    const navigate = useNavigate();
    const { items } = useCart();

    useEffect(() => {
        if (items.length === 0) {
            setTimeout(() => {
                navigate("/products");
            }, 3000); // Redirect to products page after 3 seconds when the cart is empty.
        }
    }, [items, navigate]);
}