import { HeroSection } from "../components/HeroSection";
import { ContactsSection } from "../components/ContactsSection";
import { Register } from "../components/Register";

function MainPage() {
    return (
        <main>
            <HeroSection />
            <div>
                <ContactsSection />
            </div>
            <div>
                <Register />
            </div>
        </main>
    );
}

export { MainPage };