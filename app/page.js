"use client";

import Navbar from "@/components/Navbar";
import { deco } from "./layout";
import Hero from "@/components/Homepage/Hero";
import AboutUs from "@/components/Homepage/AboutUs";
import Service from "@/components/Homepage/Service";
import Testimonials from "@/components/Homepage/Testimonials";
import Faq from "@/components/Homepage/Faq";
import Gallery from "@/components/Homepage/Gallery";
import Contact from "@/components/Homepage/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <AboutUs />
      <Service />
      <Testimonials />
      <Gallery />
      <Faq />
      <Contact />
      <Footer />
    </>
  );
}
