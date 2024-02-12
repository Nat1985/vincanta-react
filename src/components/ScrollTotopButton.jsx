import { useEffect, useState } from "react";

const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);
    const handleVisibility = () => {
        console.log('here')
        const scrollY = window.scrollY;
        const triggerPoint = 1000;
        setIsVisible(scrollY > triggerPoint);
    };
    useEffect(() => {
        window.addEventListener("scroll", handleVisibility);
        return () => {
            window.removeEventListener("scroll", handleVisibility)
        };
    }, []);
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    };
    return (
        <div className={`fixed bottom-2 right-2 cursor-pointer ${isVisible ? 'block' : 'hidden'}`} onClick={scrollToTop}>
            <i class="fi fi-sr-up text-[#782a76] text-4xl"></i>
        </div>
    )
}

export default ScrollToTopButton;