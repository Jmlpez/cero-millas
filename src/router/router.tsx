import { EcommerceLayout } from "@/layouts/ecommerce/ecommerce-layout";
import { NotFound } from "@/pages/404";
import { Home } from "@/pages/home/home";
import { EcommerceProducts } from "@/pages/ecommerce/products";
import { EcommerceProductDetails } from "@/pages/ecommerce/product-details";
import { EcommerceCategories } from "@/pages/ecommerce/categories";
import { EcommerceCategoryProducts } from "@/pages/ecommerce/category-products";
import { About } from "@/pages/ecommerce/about";
import { Deals } from "@/pages/ecommerce/deals";
import { Support } from "@/pages/ecommerce/support";
import { Cart } from "@/pages/ecommerce/cart";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter(
    [
        {
            path: "",
            element: <EcommerceLayout />,
            children: [
                {
                    index: true, // Default element for the parent route ('/')
                    element: <Home />,
                },
                {
                    path: "products",
                    children: [
                        {
                            index: true, // Default element for the parent route ('/products')
                            element: <EcommerceProducts />,
                        },
                        {
                            path: ":id",
                            element: <EcommerceProductDetails />,
                        },
                    ],
                },
                {
                    path: "categories",
                    children: [
                        {
                            index: true, // Default element for the parent route ('/categories')
                            element: <EcommerceCategories />,
                        },
                        {
                            path: ":slug",
                            element: <EcommerceCategoryProducts />,
                        },
                    ],
                },
                {
                    path: "deals",
                    element: <Deals />,
                },
                {
                    path: "about",
                    element: <About />,
                },
                {
                    path: "support",
                    element: <Support />,
                },
                {
                    path: "cart",
                    element: <Cart />,
                },
                {
                    path: "track-order",
                    element: <Support />, // For now, redirect to support
                },
            ],
        },
        {
            // TODO: 404 page
            path: "*",
            element: <NotFound />,
        },
    ],
    {
        // This is to ensure that the router works correctly with the base URL
        basename: import.meta.env.BASE_URL || "/",
    }
);

export default router;
