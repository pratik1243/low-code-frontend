import "swiper/css";
import "aos/dist/aos.css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Nunito } from "next/font/google";
import { Providers } from "../../redux/provider/Providers";

const nunito = Nunito({
  weight: "500",
  subsets: ["cyrillic"],
});

export const metadata = {
  title: "Wy Webb",
  description: "Low code platform for building websites",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
