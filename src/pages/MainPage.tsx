import { HeroSection } from "../components/HeroSection";
import { ContactsSection } from "../components/ContactsSection";
import { Register } from "../components/Register";
import type { RefObject } from "react";

interface MainPageProps {
    contactsRef: RefObject<HTMLDivElement | null>;
    registerRef: RefObject<HTMLDivElement | null>;
    onSignUpClick: () => void;
}

function MainPage({ contactsRef, registerRef, onSignUpClick }: MainPageProps) {
    return (
        <main>
            <HeroSection onSignUpClick={onSignUpClick} />
            <div ref={contactsRef}>
                <ContactsSection />
            </div>
            <div ref={registerRef}>
                <Register />
            </div>
        </main>
    );
}

export { MainPage };