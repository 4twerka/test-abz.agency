import { HeroSection } from "../components/HeroSection";
import { ContactsSection } from "../components/ContactsSection";
import { Register } from "../components/Register";

function MainPage() {
    return (
        <main>
            <HeroSection />
            <ContactsSection />
            <Register />
        </main>
    );
}

export { MainPage }