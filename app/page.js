"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Homepage/Hero";
import AboutUs from "@/components/Homepage/AboutUs";
import Service from "@/components/Homepage/Service";
import Testimonials from "@/components/Homepage/Testimonials";
import Timeline from "@/components/Homepage/Timeline";
import Gallery from "@/components/Homepage/Gallery";
import Contact from "@/components/Homepage/Contact";
import Footer from "@/components/Footer";

import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Home() {
  const [bannerUrl, setBannerUrl] = useState(null);

  const [aboutLeftUrl, setAboutLeftUrl] = useState(null);
  const [aboutRightUrl, setAboutRightUrl] = useState(null);

  const [floralUrl, setFloralUrl] = useState(null);
  const [centerpieceUrl, setCenterpieceUrl] = useState(null);
  const [customDesignUrl, setCustomDesignUrl] = useState(null);
  const [stageSetupUrl, setStageSetupUrl] = useState(null);

  const [reviews, setReviews] = useState([]);

  const [mediaItems, setMediaItems] = useState([]);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        // Query the Banners table for the homepage banner
        const { data, error } = await supabase
          .from('Banners')
          .select('mediaUrl, page')
          .eq('page', 'homepage')
          .maybeSingle(); // Allows for no results without throwing an error

        if (error) {
          throw error;
        }

        if (data) {
          setBannerUrl(data.mediaUrl);
        } else {
          console.warn('No banner found for the homepage.');
          setBannerUrl(null); // Clear the state if no data is found
        }
      } catch (error) {
        console.error('Error fetching banner:', error.message || error);
      }
    };

    const fetchImages = async () => {
      try {
        const { data, error } = await supabase
          .from('Sections')
          .select('mediaUrl, title')
          .eq('page', 'homepage');

        if (error) {
          console.error('Error fetching data:', error.message);
          return;
        }

        const leftImage = data.find(item => item.title === 'about-left');
        const rightImage = data.find(item => item.title === 'about-right');

        if (leftImage) setAboutLeftUrl(leftImage.mediaUrl);
        if (rightImage) setAboutRightUrl(rightImage.mediaUrl);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    const fetchServices = async () => {
      try {
        const { data, error } = await supabase
          .from('Sections')
          .select('mediaUrl, title')
          .eq('page', 'homepage');

        if (error) {
          console.error('Error fetching data:', error.message);
          return;
        }

        const floralImage = data.find(item => item.title === 'service-floral');
        const centerpieceImage = data.find(item => item.title === 'service-centerpiece');
        const customDesignImage = data.find(item => item.title === 'service-custom-design');
        const stageSetupImage = data.find(item => item.title === 'service-stage-setup');

        if (floralImage) setFloralUrl(floralImage.mediaUrl);
        if (centerpieceImage) setCenterpieceUrl(centerpieceImage.mediaUrl);
        if (customDesignImage) setCustomDesignUrl(customDesignImage.mediaUrl);
        if (stageSetupImage) setStageSetupUrl(stageSetupImage.mediaUrl);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    const fetchReviews = async () => {
      try {
        const { data, error } = await supabase
          .from('Reviews')
          .select('id, mediaUrl, name, review')
          .eq('page', 'homepage');

        if (error) {
          console.error('Error fetching data:', error.message);
          return;
        }

        setReviews(data); // Store reviews in state
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    const fetchGalleryItems = async () => {
      try {
        const { data, error } = await supabase
          .from('Gallery')
          .select('id, mediaUrl') // Fetch `id` and `mediaUrl`
          .eq('page', 'homepage'); // Filter where `page` is `homepage`

        if (error) {
          console.error('Error fetching data:', error.message);
          return;
        }

        setMediaItems(data); // Store fetched items in state
      } catch (error) {
        console.error('Error fetching gallery items:', error);
      }
    };

    fetchGalleryItems();
    fetchReviews();
    fetchServices();
    fetchImages();
    fetchBanner();
  }, []);

  return (
    <>
      <Navbar />
      <Hero bannerUrl={bannerUrl} />
      <AboutUs aboutLeftUrl={aboutLeftUrl} aboutRightUrl={aboutRightUrl} />
      <Service floralUrl={floralUrl} centerpieceUrl={centerpieceUrl} customDesignUrl={customDesignUrl} stageSetupUrl={stageSetupUrl} />
      <Testimonials reviews={reviews} />
      <Gallery mediaItems={mediaItems} />
      <Timeline />
      <Contact />
      <Footer />
    </>
  );
}
