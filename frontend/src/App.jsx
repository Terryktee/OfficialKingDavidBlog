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



