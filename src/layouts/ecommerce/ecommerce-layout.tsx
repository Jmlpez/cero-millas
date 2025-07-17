import { EcommerceHeader } from "@/components/ecommerce/header";
import { EcommerceFooter } from "@/components/ecommerce/footer";
import { WhatsAppFloat } from "@/components/ecommerce/whatsapp-float";
import { Outlet, ScrollRestoration } from "react-router";

export const EcommerceLayout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <EcommerceHeader />
            <main className="flex-1">
                <Outlet />
            </main>
            <EcommerceFooter />
            <WhatsAppFloat />
            <ScrollRestoration />
        </div>
    );
};
