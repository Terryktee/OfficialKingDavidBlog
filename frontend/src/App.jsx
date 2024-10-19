import './App.css'
import './index.css'
import Navbar from "./components/navbar";
import SideContent from "./components/sidebar"
import Sidepost from "./components/sidepost"
import Latest_articles from "./components/latest_articles"
import About from "./components/about"
import Articles from "./components/articles"
import Footer from "./components/footer";
import { Analytics } from "@vercel/analytics/react"

function App() {

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
        <meta property="og:image" content="" />
        <meta property="og:url" content="https://officialkingdavid.vercel.app/articles" />
        <meta name="robots" content="index, follow" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <meta charSet="UTF-8" />
        <link rel="icon" href="" />
      </Helmet>
    <Navbar/>
    <div className="lg:flex lg:justify-between lg:space-x-4 lg:space-y-4 ">
        <SideContent/>
        <Sidepost/>
    </div>
    
    <Latest_articles/>
    <About />
    
    <Articles/>
    
    <Footer />
</>
    
  )
}

export default App



