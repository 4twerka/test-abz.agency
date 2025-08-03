import { Button } from "./Button";
import backGround from "../assets/pexels-alexandr-podvalny-1227513.jpeg";

function HeroSection() {
    return (
        <section className="relative h-screen">
            <div
                className="absolute inset-0 bg-cover bg-center filter brightness-50"
                style={{
                    backgroundImage: `url(${backGround})`,
                }}
            />

            <div className="max-w-[380px] mx-auto w-full relative z-10 flex flex-col items-center justify-center text-center h-full">
                <h1 className="font-nunito text-[40px] text-white mb-4">
                    Test assignment for front-end developer
                </h1>
                <span className="font-nunito text-white text-[16px] max-w-2xl mb-6">
                    What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast understanding of User design thinking as they'll be building web interfaces with accessibility in mind. They should also be excited to learn, as the world of Front-End Development keeps evolving.
                </span>
                <Button className="py-2 px-7">Sign Up</Button>
            </div>
        </section>
    );
}

export { HeroSection };
