import "./Hero.css";
import HeroImage from "../public/Hero-image.svg";
import { Link } from "react-router-dom";

function Hero(){
    return(
        <>
            <section className="container">
            <div className="hero-text">
                    <div className="hero-heading">Build Habits <br />That Stick.</div>
                    <p className="hp">Track, analyze and improve your daily <br />habits with smart reminders and <br />progress charts.</p>
                    <div className="hero-btn">
                        <Link to="/auth">
                        <button className="get-started-btn">Get Started (Free)</button>
                        </Link>
                        <button className="learn-more-btn" id="#about">Learn more</button>
                    </div>
            </div>

            <div className="hero-img">
                <img src={HeroImage} alt="Hero illustration" />
            </div>
            </section>
            <div className="social">⭐ Trusted by 2,000+ people worldwide</div>
        </>
    );
}
export default Hero;