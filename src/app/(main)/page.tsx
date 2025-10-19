import FAQ from "@/components/FAQ";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Pricing from "@/components/Pricing";



export default function Home() {


  return (
    <div className="mx-auto w-full h-full">
        <Navbar/>
        <Hero/>
        <Features/>
        {/* <Pricing/> */}
        <FAQ/>
        <Footer/>
    </div>
  );
}
