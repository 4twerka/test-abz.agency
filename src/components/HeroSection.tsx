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

            <div className="w-full relative z-10 flex flex-col items-center justify-center text-center h-full px-4">
                <div className="w-full max-w-[380px] md:max-w-[380px] lg:max-w-[380px] xl:max-w-[380px] flex flex-col gap-[21px]">
                    <h1 className="font-nunito text-[32px] sm:text-[40px] text-white leading-tight">
                        Test assignment for front-end developer
                    </h1>
                    <p className="font-nunito text-white text-[14px] sm:text-[16px] leading-relaxed">
                        What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast understanding of User design thinking as they'll be building web interfaces with accessibility in mind. They should also be excited to learn, as the world of Front-End Development keeps evolving.
                    </p>
                    <div className="flex justify-center">
                        <a href="#register">
                            <Button className="py-2 px-7">Sign up</Button>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}

export { HeroSection };