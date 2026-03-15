import "swiper/css";
import "aos/dist/aos.css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/low-code-style.css";
import { Providers } from "../../redux/provider/Providers";
import { Nunito_Sans } from "next/font/google";

const nunito = Nunito_Sans({
  weight: "500",
  subsets: ["cyrillic"],
});

export const metadata = {
  title: "Wy Webb",
  description: "Low code platform for building static websites and landing pages",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body id="body-section" className={nunito.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
