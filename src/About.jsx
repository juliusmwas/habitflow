import "./About.css"
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { GoGraph } from "react-icons/go";
import { BsSliders } from "react-icons/bs";
import { PiConfettiBold } from "react-icons/pi";
import { IoPeopleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

function About(){
    return(
        <section id="about">
            <div className="about">
                <h2 className="about-h2">Turning Small Steps Into Lasting Change.</h2>
                <div className="about-p">We believe growth doesn't come from big leaps, but from small, consistent actions. <br />Our app is built to make those  actions easy, rewarding and fun.</div>
                <h3 className="about-h3">What Makes Us Your Perfect Habit Tracker.</h3>

                <div className="about-cards">
                    <div className="card">
                        <img src="" alt="" />
                        <IoMdCheckmarkCircleOutline className="card-icon"/>
                        <h4 className="about-h4">Easy to Use</h4>
                        <p className="card-p">Clean, distraction-free and designed  so you <br /> focus on building habits not the app.</p>
                    </div>

                    <div className="card">
                        <img src="" alt="" />
                        <MdOutlineNotificationsActive className="card-icon"/>
                        <h4 className="about-h4">Smart Reminders</h4>
                        <p className="card-p">Get nudges at the right time, without <br /> being annoying</p>
                    </div>

                    <div className="card">
                        <img src="" alt="" />
                        <GoGraph className="card-icon"/>
                        <h4 className="about-h4">Progress Insights</h4>
                        <p className="card-p">Visual charts & streaks to keep you motivated.</p>
                    </div>

                    <div className="card">
                        <img src="" alt="" />
                        <BsSliders className="card-icon"/>
                        <h4 className="about-h4">Customizable</h4>
                        <p className="card-p">Track daily, weekly or monthly habits your way.</p>
                    </div>

                    <div className="card">
                        <img src="" alt="" />
                        <PiConfettiBold className="card-icon"/>
                        <h4 className="about-h4">Celebrate Wins</h4>
                        <p className="card-p">Small rewards and milestones to keep consistency fun.</p>
                    </div>

                    <div className="card">
                        <img src="" alt="" />
                        <IoPeopleOutline className="card-icon"/>
                        <h4 className="about-h4">Stay Accountable</h4>
                        <p className="card-p">Share progress with friends or keep it private.</p>
                    </div>

                </div>

                <div className="about-cta">
                    <p className="cta-p">Ready to Build Your Next Habit?</p>
                    <Link to="/auth">
                        <button className="cta-btn">Sign Up Free Today</button>
                        </Link>
                </div>

            </div>
        </section>
    );
}
export default About;