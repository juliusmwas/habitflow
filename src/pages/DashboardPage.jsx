// src/pages/DashboardPage.jsx
import React from "react";
import "./DashboardPage.css";
import { RiDashboardHorizontalLine } from "react-icons/ri";

export default function DashboardPage() 
{
let progressValue = document.querySelector(".progress-value");
  let circularProgress = document.querySelector(".circular-progress");

  let startValue = 0;
  let endValue = 75; // target percentage
  let speed = 20; // lower = faster

  let progress = setInterval(() => {
    startValue++;

    progressValue.textContent = `${startValue}%`;

    circularProgress.style.background = `conic-gradient(
      #2563eb ${startValue * 3.6}deg,
      #e5e7eb ${startValue * 3.6}deg
    )`;

    if (startValue >= endValue) {
      clearInterval(progress);
    }
  }, speed);

  const segments = document.querySelectorAll(".segment");
const contents = document.querySelectorAll(".content");

segments.forEach(segment => {
  segment.addEventListener("click", () => {
    // remove active from buttons
    segments.forEach(btn => btn.classList.remove("active"));
    // add active to clicked
    segment.classList.add("active");

    // hide all content
    contents.forEach(c => c.classList.remove("active"));
    // show target content
    const target = document.getElementById(segment.dataset.target);
    target.classList.add("active");
  });
});


  return (
    <div class="parent">
      <div class="div1">
        <div className="hero-text">
          <h1 className="hero-h1">How to Build <br />a New Habit</h1>
          <p className="hero-p">This is essential for making progress <br />in your health, happines and your life.</p>
          <button className="d-btn">+ Add New Habit</button>
        </div>
        <div className="hero-image">
        <img src="./Colony.png" alt="" />
        </div>
      </div>

      <div class="div2">
        <div className="stats">
          <h1 className="stats-h1">Statistics</h1>
          <RiDashboardHorizontalLine className="dash-icon" />
        </div>
        <div class="circular-progress">
          <div class="progress-content">
            <span class="progress-value">75%</span>
            <p class="progress-text">Average Progress</p>
          </div>
        </div>

        <div className="stats-content">
          <div className="content">
            <h2 className="stats-h2">7 Days</h2>
            <p className="stats-p">Best Streaks</p>
          </div>
          <div className="content">
            <h2 className="stats-h2">8</h2>
            <p className="stats-p">Perfect Days</p>
          </div>
          <div className="content">
            <h2 className="stats-h2">24</h2>
            <p className="stats-p">Total Habits </p>
          </div>
        </div>

      </div>
      
      <div class="div3">
        <div class="segmented-control">
          <button class="segment active" data-target="daily">Daily</button>
          <button class="segment" data-target="weekly">Weekly</button>
          <button class="segment" data-target="monthly">Monthly</button>
        </div>

        <div class="segment-content">
          <div id="daily" class="content active">
            <h2>Daily Stats</h2>
            <table>
              <tr>
                <th>Habit</th>
                <th>progress</th>
                <th>Streak</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>

              <tr>
                <th></th>
              </tr>


            </table>
          </div>
          <div id="weekly" class="content">
            <h2>Weekly Stats</h2>
            <p>This week’s progress and trends 📊</p>
          </div>
          <div id="monthly" class="content">
            <h2>Monthly Stats</h2>
            <p>Overview of your monthly progress 📈</p>
          </div>
        </div>

      </div>
    </div>
  );
}
