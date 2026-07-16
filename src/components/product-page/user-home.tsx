// src/components/product-page/user-home.tsx
import HeroSection from "./sections/hero-section";
import CategorySection from "./sections/category-section";
import TrendingSection from "./sections/trending-section";
import ProductGrid from "./components/product-grid";
import PricingSection from "./sections/pricing-section";
import TestimonialsSection from "./sections/testimonials-section";
import FaqSection from "./sections/faq-section";
import FeaturesSection from "./sections/features-section";
import Footer from "./layout/footer";

export default function UserHome() {
	return (
		<>
			<HeroSection />
			<TrendingSection />
			<CategorySection />
			<ProductGrid />
			<PricingSection />
			<TestimonialsSection />
			<FaqSection />
			<FeaturesSection />
			<Footer />
		</>
	);
}
