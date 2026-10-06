import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductShowcase from "@/components/ProductShowcase";
import FeatureGrid from "@/components/FeatureGrid";
import ThemeShowcase from "@/components/ThemeShowcase";
import DownloadSection from "@/components/DownloadSection";
import Footer from "@/components/Footer";
import MotionProvider from "@/components/MotionProvider";

export default function Page() {
  return (
    <MotionProvider>
      <Navbar />
      <main>
        <Hero />
        <ProductShowcase />
        <FeatureGrid />
        <ThemeShowcase />
        <DownloadSection />
      </main>
      <Footer />
    </MotionProvider>
  );
}
