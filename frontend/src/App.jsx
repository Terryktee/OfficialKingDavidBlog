import './App.css';
import './index.css';
import Navbar from "./components/navbar";
import SideContent from "./components/sidebar";
import Sidepost from "./components/sidepost";
import Latest_articles from "./components/latest_articles";
import About from "./components/about";
import Articles from "./components/articles";
import Footer from "./components/footer";
import { Analytics } from "@vercel/analytics/react";
import { Helmet } from 'react-helmet-async';
import React, { useRef } from 'react';

const imageUrl = 'https://upload.wikimedia.org/wikipedia/commons/3/31/Blogger.svg';
const blogUrl = 'https://officialkingdavid.vercel.app'; // Update this with your actual blog URL

function App() {
  const aboutRef = useRef(null); // Ref for smooth scrolling to About section

  const scrollToAbout = () => {
    if (aboutRef.current) {
      aboutRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Analytics />
      <Helmet>
        <title>Articles - Official King David Blog</title>
        <meta name="description" content="Explore a collection of insightful articles on various topics at the Official King David Blog." />
        <meta name="keywords" content="articles, insights, King David, blog, topics" />
        <meta name="author" content="Official King David" />
        <meta property="og:title" content="Articles - Official King David Blog" />
        <meta property="og:description" content="Discover insightful articles and stories on the Official King David Blog." />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:url" content={blogUrl} />
        <meta name="robots" content="index, follow" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <meta charSet="UTF-8" />
        <link rel="icon" href="" />
      </Helmet>
      <Navbar onScrollToAbout={scrollToAbout} />
      <div className="lg:flex lg:justify-between lg:space-x-4 lg:space-y-4">
        <SideContent />
        <Sidepost />
      </div>
      <Latest_articles />
      <div ref={aboutRef}>
        <About />
      </div>
      <Articles />
      <Footer />
    </>
  );
}

export default App;
