'use client';

import { useEffect, useState, useRef } from 'react';

export default function ScrollToTopButton() {
  const [show, setShow] = useState(false);
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const lastScrollTop = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const percentage = scrollHeight > 0 ? (currentScroll / scrollHeight) * 100 : 0;

      setScrollPercentage(percentage);

      // Show the button when scrolling down or up
      if (currentScroll > 100) {
        setShow(true);
      } else {
        setShow(false);
      }

      lastScrollTop.current = currentScroll <= 0 ? 0 : currentScroll;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // set initial state
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Calculate opacity based on scroll speed
  const getOpacity = () => {
    if (!show) return 0;
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    const scrollDiff = Math.abs(currentScroll - lastScrollTop.current);
    return scrollDiff > 20 ? 1 : 0.3;
  };

  return (
    <>
      <style jsx>{`
        .scroll-to-top {
          position: fixed;
          bottom: 77px;
          right: 10px;
          background: #96034f;
          color: white;
          border: none;
          border-radius: 50%;
          padding: 15px;
          font-size: 16px;
          cursor: pointer;
          opacity: 0;
          transition: opacity 0.5s ease, transform 0.3s ease;
          text-align: center;
          font-weight: bold;
          font-family: Arial, sans-serif;
          z-index: 9999;
          width: 55px;
          height: 55px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .scroll-to-top.show {
          opacity: ${getOpacity()};
        }

        .scroll-to-top:hover {
          opacity: 1 !important;
          transform: scale(1.1);
        }

        @media (max-width: 768px) {
          .scroll-to-top {
            bottom: 70px;
            right: 10px;
            width: 50px;
            height: 50px;
            padding: 10px;
          }
        }

        @media (max-width: 480px) {
          .scroll-to-top {
            bottom: 70px;
            right: 16px;
            width: 44px;
            height: 44px;
            padding: 8px;
          }
        }
      `}</style>
      <button
        type="button"
        className={`scroll-to-top ${show ? 'show' : ''}`}
        onClick={handleClick}
        aria-label="Scroll to top"
        style={{ opacity: show ? getOpacity() : 0 }}
      >
        <span style={{ color: 'white', fontSize: '14px', fontWeight: 'bold' }}>
          {scrollPercentage >= 95 ? (
            <img 
              src="https://mrpaanwala.com/wp-content/uploads/2025/02/arrow3-1.png" 
              alt="Scroll to Top" 
              style={{ width: '24px', height: '24px', verticalAlign: 'middle' }} 
            />
          ) : (
            `${Math.round(scrollPercentage)}%`
          )}
        </span>
      </button>
    </>
  );
}
