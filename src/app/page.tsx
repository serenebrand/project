import { About } from "@/components/sections/About";
import { Banquets } from "@/components/sections/Banquets";
import { Contacts } from "@/components/sections/Contacts";
import { Footer } from "@/components/sections/Footer";
import { Gallery } from "@/components/sections/Gallery";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { Menu } from "@/components/sections/Menu";
import { Reviews } from "@/components/sections/Reviews";
import { Services } from "@/components/sections/Services";
import { restaurantJsonLd } from "@/lib/json-ld";
import { getPhotos } from "@/lib/photos";

export default function Page() {
  const photos = getPhotos();
  const allPhotos = [...photos.interior, ...photos.food, ...photos.exterior];
  const jsonLd = restaurantJsonLd(allPhotos);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Header />
      <main id="main">
        <Hero photo={photos.interior[0]} />
        <About photos={photos.interior.slice(1, 3)} />
        <Menu photos={photos.food} />
        <Banquets photo={photos.interior[3]} />
        <Services />
        <Gallery photos={allPhotos} />
        <Reviews />
        <Contacts />
      </main>
      <Footer />
    </>
  );
}
