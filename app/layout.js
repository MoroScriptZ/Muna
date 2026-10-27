import "./globals.css";
import { Playfair_Display, Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import FloatingCart from "@/components/FloatingCart";
import AIAssistant from "@/components/AIAssistant";
import { CartProvider } from "@/components/CartContext";
import { ToastProvider } from "@/components/ToastContext";
import { WishlistProvider } from "@/components/WishlistContext";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display"
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body"
});

export const metadata = {
  title: "MUNA | Belleza que eliges para ti",
  description: "Maquillaje, skincare y accesorios en un solo lugar."
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${playfair.variable} ${inter.variable}`}>
      <body>
        <ToastProvider>
          <WishlistProvider>
            <CartProvider>
              <Navbar />
              <main>{children}</main>
              <Footer />
              <WhatsAppButton />
              <FloatingCart />
              <AIAssistant />
            </CartProvider>
          </WishlistProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
