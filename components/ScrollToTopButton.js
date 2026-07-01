'use client';

import { useEffect, useRef } from 'react';

export default function ScrollToTopButton() {
  const buttonRef = useRef(null);
  const textRef = useRef(null);
  const iconRef = useRef(null);
  const lastScrollTop = useRef(0);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
          const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
          const percentage = scrollHeight > 0 ? (currentScroll / scrollHeight) * 100 : 0;

          const isVisible = currentScroll > 100;

          if (buttonRef.current) {
            if (isVisible) {
              buttonRef.current.classList.add('show');
              // Optional: fade out slightly when idle, full opacity when scrolling
              const scrollDiff = Math.abs(currentScroll - lastScrollTop.current);
              buttonRef.current.style.opacity = scrollDiff > 20 ? '1' : '0.5';
            } else {
              buttonRef.current.classList.remove('show');
              buttonRef.current.style.opacity = '0';
            }
          }

          if (textRef.current && iconRef.current) {
            if (percentage >= 95) {
              textRef.current.style.display = 'none';
              iconRef.current.style.display = 'inline-block';
            } else {
              textRef.current.style.display = 'inline-block';
              textRef.current.textContent = `${Math.round(percentage)}%`;
              iconRef.current.style.display = 'none';
            }
          }

          lastScrollTop.current = currentScroll <= 0 ? 0 : currentScroll;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // set initial state
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
          transition: transform 0.3s ease, opacity 0.5s ease;
          text-align: center;
          font-weight: bold;
          font-family: Arial, sans-serif;
          z-index: 9999;
          width: 55px;
          height: 55px;
          display: flex;
          justify-content: center;
          align-items: center;
          pointer-events: none;
        }

        .scroll-to-top.show {
          pointer-events: auto;
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
        ref={buttonRef}
        type="button"
        className="scroll-to-top"
        onClick={handleClick}
        aria-label="Scroll to top"
      >
        <span style={{ color: 'white', fontSize: '14px', fontWeight: 'bold' }}>
          <span ref={textRef}></span>
          <img 
            ref={iconRef}
            src="https://mrpaanwala.com/wp-content/uploads/2025/02/arrow3-1.png" 
            alt="Scroll to Top" 
            style={{ width: '24px', height: '24px', verticalAlign: 'middle', display: 'none' }} 
          />
        </span>
      </button>
    </>
  );
}
