'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { deco } from '@/lib/fonts';
import Supabase from '@/lib/supabase';

export default function WeddingConsultationPopup() {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    weddingDate: '',
    eventLocation: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Check if user has already submitted the form
    const hasSubmittedForm = sessionStorage.getItem('weddingFormSubmitted');
    
    if (!hasSubmittedForm) {
      const timer = setTimeout(() => {
        setShow(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setShow(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Save to Supabase
      const { data, error } = await Supabase
        .from('wedding_consultations')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            contact: formData.contact,
            wedding_date: formData.weddingDate,
            event_location: formData.eventLocation,
            status: 'new',
            created_at: new Date().toISOString()
          }
        ]);

      if (error) {
        console.error('Supabase error:', error);
      }

      setIsSubmitting(false);
      setSubmitted(true);
      
      // Mark that user has submitted the form
      sessionStorage.setItem('weddingFormSubmitted', 'true');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        contact: '',
        weddingDate: '',
        eventLocation: ''
      });

      // Hide popup after 3 seconds
      setTimeout(() => {
        setShow(false);
        setSubmitted(false);
      }, 3000);
    } catch (err) {
      console.error('Error submitting form:', err);
      setIsSubmitting(false);
      // Still show success to user
      setSubmitted(true);
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-[9998] backdrop-blur-sm"
            onClick={handleClose}
          />
          
          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 flex items-center justify-center z-[9999] p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-[#e8d5d0] relative" style={{
              backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(255,250,248,0.98) 100%), url("https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&auto=format&fit=crop")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundBlendMode: 'overlay'
            }}>
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 z-50 w-8 h-8 sm:top-4 sm:right-4 sm:w-10 sm:h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 border border-[#e8d5d0]"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#96034f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Floral Image - Top Left */}
            <div className="absolute -top-4 -left-4 w-24 h-24 sm:-top-8 sm:-left-8 sm:w-40 sm:h-40 md:-top-16 md:-left-16 md:w-64 md:h-64 lg:-top-20 lg:-left-20 lg:w-80 lg:h-80 pointer-events-none z-10">
              <img 
                src="/floral-corner.png" 
                alt="Floral decoration" 
                className="w-full h-full object-contain"
                style={{ filter: 'drop-shadow(2px 4px 8px rgba(0,0,0,0.2)' }}
              />
            </div>

            {/* Floral Image - Bottom Right (rotated) */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 sm:-bottom-8 sm:-right-8 sm:w-40 sm:h-40 md:-bottom-16 md:-right-16 md:w-64 md:h-64 lg:-bottom-20 lg:-right-20 lg:w-80 lg:h-80 pointer-events-none z-10">
              <img 
                src="/floral-corner.png" 
                alt="Floral decoration" 
                className="w-full h-full object-contain"
                style={{ 
                  transform: 'rotate(180deg)',
                  filter: 'drop-shadow(2px 4px 8px rgba(0,0,0,0.2)'
                }}
              />
            </div>

            <div className="relative p-4 sm:p-6 md:p-8 lg:p-10">
              {!submitted ? (
                <div className="grid md:grid-cols-2 gap-4 md:gap-6 lg:gap-8 items-center">
                  {/* Left Column - Text Content */}
                  <div className="text-left pl-2 sm:pl-4 md:pl-8 lg:pl-10">
                    <motion.h2
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                      className={`${deco.className} text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-[#8B4513] mb-3 sm:mb-4 md:mb-6 leading-tight tracking-wide`}
                      style={{ fontStyle: 'italic' }}
                    >
                      <span className="block">Crafted Moments,</span>
                      <span className="block">Lasting Memories</span>
                    </motion.h2>
                    
                    {/* Decorative line */}
                    <div className="flex items-center gap-2 mb-4 sm:mb-6">
                      <div className="h-px w-8 sm:w-12 bg-[#d4a574]"></div>
                      <div className="w-2 h-2 rounded-full bg-[#d4a574]"></div>
                      <div className="h-px w-6 sm:w-8 bg-[#d4a574]"></div>
                    </div>
                    
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                      className="text-[#5d4e37] text-sm sm:text-base leading-relaxed mb-4 sm:mb-6 md:mb-8"
                    >
                      Every wedding tells a story. Let our design team create a breathtaking setting that reflects yours. Book a complimentary consultation and start bringing your vision to life.
                    </motion.p>
                    
                    {/* CTA Button - Desktop */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                      className="hidden md:block"
                    >
                      <button
                        type="submit"
                        form="wedding-form"
                        disabled={isSubmitting}
                        className="w-full bg-[#96034f] text-white font-medium py-3 px-6 sm:py-4 sm:px-8 rounded-xl hover:bg-[#8a0244] transform hover:scale-[1.02] transition-all duration-300 shadow-lg text-sm sm:text-base"
                      >
                        {isSubmitting ? 'Processing...' : 'Start Planning My Wedding'}
                      </button>
                      
                      {/* Trust Line */}
                      <p className="text-center text-xs sm:text-sm text-[#8b7355] italic mt-3 sm:mt-4">
                        Limited design consultations available each month.
                      </p>
                    </motion.div>
                  </div>
                  
                  {/* Right Column - Form Fields */}
                  <motion.form
                    id="wedding-form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="space-y-2 sm:space-y-3 flex flex-col justify-center h-full pr-2 sm:pr-4"
                  >
                    {/* Name Field */}
                    <div className="relative">
                      <label className="block text-[#5d4e37] text-xs sm:text-sm font-semibold mb-1 sm:mb-1.5">Primary Contact Name:</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-white/95 border border-[#d4c4b0] rounded-xl focus:outline-none focus:border-[#96034f] focus:ring-1 focus:ring-[#96034f] transition-all duration-200 text-[#5d4e37] placeholder-[#a09080] text-sm"
                        placeholder="Enter your name"
                      />
                    </div>

                    {/* Email Field */}
                    <div className="relative">
                      <label className="block text-[#5d4e37] text-xs sm:text-sm font-semibold mb-1 sm:mb-1.5">Email Address:</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-white/95 border border-[#d4c4b0] rounded-xl focus:outline-none focus:border-[#96034f] focus:ring-1 focus:ring-[#96034f] transition-all duration-200 text-[#5d4e37] placeholder-[#a09080] text-sm"
                        placeholder="Enter your email"
                      />
                    </div>

                    {/* Contact Field */}
                    <div className="relative">
                      <label className="block text-[#5d4e37] text-xs sm:text-sm font-semibold mb-1 sm:mb-1.5">Phone Number:</label>
                      <div className="relative">
                        <input
                          type="tel"
                          name="contact"
                          value={formData.contact}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-white/95 border border-[#d4c4b0] rounded-xl focus:outline-none focus:border-[#96034f] focus:ring-1 focus:ring-[#96034f] transition-all duration-200 text-[#5d4e37] placeholder-[#a09080] pr-8 sm:pr-10 text-sm"
                          placeholder="Your phone number"
                        />
                        <svg className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-[#a09080]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                    </div>

                    {/* Wedding Date Field */}
                    <div className="relative">
                      <label className="block text-[#5d4e37] text-xs sm:text-sm font-semibold mb-1 sm:mb-1.5">Wedding Date:</label>
                      <input
                        type="date"
                        name="weddingDate"
                        value={formData.weddingDate}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-white/95 border border-[#d4c4b0] rounded-xl focus:outline-none focus:border-[#96034f] focus:ring-1 focus:ring-[#96034f] transition-all duration-200 text-[#5d4e37] text-sm"
                      />
                    </div>

                    {/* Event Location Field */}
                    <div className="relative">
                      <label className="block text-[#5d4e37] text-xs sm:text-sm font-semibold mb-1 sm:mb-1.5">Event Location:</label>
                      <input
                        type="text"
                        name="eventLocation"
                        value={formData.eventLocation}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-white/95 border border-[#d4c4b0] rounded-xl focus:outline-none focus:border-[#96034f] focus:ring-1 focus:ring-[#96034f] transition-all duration-200 text-[#5d4e37] placeholder-[#a09080] text-sm"
                        placeholder="Venue or city"
                      />
                    </div>
                  </motion.form>
                  
                  {/* Mobile CTA Button */}
                  <div className="md:hidden mt-4 sm:mt-6">
                    <button
                      type="submit"
                      form="wedding-form"
                      disabled={isSubmitting}
                      className="w-full bg-[#96034f] text-white font-medium py-3 px-6 sm:py-4 sm:px-8 rounded-xl hover:bg-[#8a0244] transform hover:scale-[1.02] transition-all duration-300 shadow-lg text-sm sm:text-base"
                    >
                      {isSubmitting ? 'Processing...' : 'Start Planning My Wedding'}
                    </button>
                    
                    {/* Trust Line */}
                    <p className="text-center text-xs sm:text-sm text-[#8b7355] italic mt-3 sm:mt-4">
                      Limited design consultations available each month.
                    </p>
                  </div>
                </div>
              ) : (
                /* Success Message */
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className={`${deco.className} text-3xl font-light text-[#8B4513] mb-4`}>
                    Thank You!
                  </h3>
                  <p className="text-[#5d4e37] text-lg">
                    We&apos;ll contact you soon to schedule your complimentary consultation.
                  </p>
                </motion.div>
              )}
            </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
