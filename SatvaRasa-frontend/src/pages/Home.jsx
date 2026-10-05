import Hero from "../components/home/Hero";
import FeaturedProducts from "../components/home/FeaturedProducts";
import WhySatvaRasa from "../components/home/WhySatvaRasa";
import CategorySection from "../components/home/CategorySection";
import TestimonialSection from "../components/home/TestimonialSection";
import BrandStatement from "../components/home/BrandStatement";
import BotanicalJournal from "../components/home/BotanicalJournal";

export default function Home() {
    return (
        <>
            <Hero />
            <FeaturedProducts />
            <TestimonialSection />
            <CategorySection />
            <WhySatvaRasa />
            <BrandStatement />

        </>
    );
}