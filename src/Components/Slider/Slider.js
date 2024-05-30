import React, { useState, useRef } from 'react';
import "./Slider.css";
import Recommendation from '../Recommendation/Recommendation';
import Radar from '../Radar/Radar';
import BarChart from '../Chart/BarChart';
import News from '../News/News';

const Utils = {
  // Mocked utility functions for generating random data and colors
  numbers: ({ count, min, max }) => Array.from({ length: count }, () => Math.floor(Math.random() * (max - min + 1)) + min),
  months: ({ count }) => ['January', 'February', 'March', 'April', 'May', 'June', 'July'].slice(0, count),
  CHART_COLORS: {
    red: 'rgba(255, 99, 132, 0.5)',
    blue: 'rgba(54, 162, 235, 0.5)',
    green: 'rgba(75, 192, 192, 0.5)',
  },
};

const Slider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionsRefs = useRef([]);

  const handleClick = (index) => {
    setActiveIndex(index);
    scrollToSection(index);
  };

  const scrollToSection = (index) => {
    const sectionRef = sectionsRefs.current[index];
    if (sectionRef) {
      sectionRef.scrollIntoView({ behavior: "smooth" });
    }
  };

  const DATA_COUNT = 7;
  const NUMBER_CFG = { count: DATA_COUNT, min: -100, max: 100 };

  const labels = Utils.months({ count: 7 });
  const data = [
    {
      label: 'Dataset 1',
      data: Utils.numbers(NUMBER_CFG),
      backgroundColor: Utils.CHART_COLORS.red,
      stack: 'Stack 0',
    },
    {
      label: 'Dataset 2',
      data: Utils.numbers(NUMBER_CFG),
      backgroundColor: Utils.CHART_COLORS.blue,
      stack: 'Stack 0',
    },
    {
      label: 'Dataset 3',
      data: Utils.numbers(NUMBER_CFG),
      backgroundColor: Utils.CHART_COLORS.green,
      stack: 'Stack 1',
    },
  ];

  return (
    <div className='slider'>
      <ul>
        <li className={`list-item ${activeIndex === 0 ? 'active' : ''}`} onClick={() => handleClick(0)}>Recommendations</li>
        <li className={`list-item ${activeIndex === 1 ? 'active' : ''}`} onClick={() => handleClick(1)}>Stocks under Radar</li>
        <li className={`list-item ${activeIndex === 2 ? 'active' : ''}`} onClick={() => handleClick(2)}>Market Trend</li>
      </ul>
      <hr />
      <div className="sections">
        <div ref={(ref) => { sectionsRefs.current[0] = ref; }}><Recommendation /></div>
        <div ref={(ref) => { sectionsRefs.current[1] = ref; }}><Radar /></div>
        <div ref={(ref) => { sectionsRefs.current[2] = ref; }}><BarChart data={data} labels={labels} /></div>
        <div ref={(ref) => { sectionsRefs.current[3] = ref; }}><News/></div>
      </div>
    </div>
  );
};

export default Slider;
