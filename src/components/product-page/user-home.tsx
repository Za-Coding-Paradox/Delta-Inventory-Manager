// src/components/product-page/user-home.tsx
import HeroSection from "./hero-section";
import CategorySection from "./category-section";
import TrendingSection from "./trending-section";
import ProductGrid from "./product-grid";
import PricingSection from "./pricing-section";
import TestimonialsSection from "./testimonials-section";
import FaqSection from "./faq-section";
import ContactSection from "./contact-section";
import FooterSection from "./footer-section";

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
			<ContactSection />
			<FooterSection />
		</>
	);
}
