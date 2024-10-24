import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import markdownit from 'markdown-it';
import Navbar from '../components/navbar';
import '../style.css';
import Footer from "../components/footer"
import { Helmet } from 'react-helmet-async';
import GoogleAds from '../components/google-ads'
import {
  FacebookIcon,
  FacebookMessengerIcon, 
  LinkedinIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon,
  FacebookShareButton, 
  TwitterShareButton, 
  LinkedinShareButton,
  FacebookMessengerShareButton, 
  TelegramShareButton,
  WhatsappShareButton,

} from "react-share";
const md = new markdownit();

const articleDetail = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetcharticle = async () => {
      try {
        const response = await axios.get(`https://terryktee.pythonanywhere.com/api/posts/${slug}/`);
        setArticle(response.data);
      } catch (err) {
        setError('article not found');
      }
    };
    fetcharticle();
  }, [slug]);

  if (error) return <div className="flex flex-col items-center justify-center h-screen bg-black text-white p-4 rounded-lg shadow-md">
    <h1 className="text-3xl font-bold mb-2">404 Error</h1>
    <p className="mb-4">Page Not Found</p>
    <p>Please refresh the page; it might be a server issue.</p>
  </div>;

  if (!article) return <div className="flex items-center justify-center h-screen"><div className="animate-pulse">
    Loading...
  </div>
  </div>;

   //Url Image fallback
   const imageUrl = article.image || 'https://upload.wikimedia.org/wikipedia/commons/3/31/Blogger.svg';
   const shareUrl = `https://officialkingdavid.vercel.app/articles/${slug}`;
  // Convert Markdown to HTML
  const htmlContent = md.render(article.body);

  return (
    <>
      <Helmet>
        <title>{`${article.title} - Official King David Blog`}</title>
        <meta name="description" content={article.description} />
        <meta name="keywords" content={article.keywords} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.description} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:url" content={`https://officialkingdavid.vercel.app/articles/${slug}`} />
        <meta name="robots" content="index, follow" />
      </Helmet>
      <Navbar />
      <div className="relative w-full max-w-7xl px-4 sm:px-8 lg:px-12 mx-auto py-10 md:py-10 max-w-screen-md">
        <article>
          <header className="mb-8 flex flex-col">
            <div className="flex flex-row items-center mr-2 h-fit mb-6">
              <img src="https://www.profile.myself" alt="profile" height="50" width="50" loading="lazy" className="rounded-full mr-2 h-10 w-10 md:h-12 md:w-12"></img>
              <a href="#" className="text-sm md:text-base block leading-none">
                By
                <span className="hover:underline cursor-pointer font-medium"> {article.author}</span> <br />
                <span className="text-xs md:text-sm"> Blogger , Writer</span>
              </a>
            </div>
            <div className="flex justify-between flex-col md:flex-row">
              <div className="flex items-center gap-2">
                <div className="bg-zinc-200 w-fit p-1 mb-2 text-xs md:text-sm">
                  Music
                </div>
                <div className="bg-zinc-200 w-fit p-1 mb-2 text-xs md:text-sm">Media</div>
              </div>
              <div className="flex items-center gap-2 text-sm md:text-base font-medium">
                <time dateTime="2024-08-09 14:19:54" className="flex items-center text-zinc-600">
                  <span>{article.publish}</span>
                  <span className="h-4 w-0.5 rounded-full bg-zinc-300"></span>
                </time>
                <span className="h-4 w-0.5 rounded-full bg-zinc-300"></span>
                <span className="text-zinc-600"> 1 min</span>
              </div>
              <div className="flex flex-col mt-6 md:mt-0">
                <span className="text-xs text-zinc-600 hidden md:block">Share On:</span>
                <div className="flex justify-between md:gap-6 items-center max-w-[250px]">
                <WhatsappShareButton url={shareUrl}>
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
          <FacebookShareButton url={shareUrl} quote={article.description}>
            <FacebookIcon size={32} round />
          </FacebookShareButton>
          <TwitterShareButton url={shareUrl} title={article.title}>
            <TwitterIcon size={32} round />
          </TwitterShareButton>
          <LinkedinShareButton url={shareUrl} title={article.title} summary={article.description}>
            <LinkedinIcon size={32} round />
          </LinkedinShareButton>
          <FacebookMessengerShareButton url={shareUrl}>
            <FacebookMessengerIcon size={32} round />
          </FacebookMessengerShareButton>
          <TelegramShareButton url={shareUrl} title={article.title}>
            <TelegramIcon size={32} round />
          </TelegramShareButton>
                </div>
              </div>
            </div>
          </header>
        </article>
        <div className="markdown" dangerouslySetInnerHTML={{ __html: htmlContent }} />
        <GoogleAds/>
      </div>
      <Footer />
    </>
  );
};

export default articleDetail;






