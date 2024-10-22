import  { useRef } from 'react';
function About() {

    return (
        <>
            <div ref={aboutRef} className="flex bg-yellow-400 rounded-lg h-full p-4 container mt-4 ">
                <div>
                    <h1 className="text-2xl font-bold">About Author</h1>
                    <p className="text-wrap">
                   <span className="text-[2rem] hover:text-white"> King David</span> , am a writer driven by a passion for langauge , constantly seeking the perfect words to capture and convey the essence of my thoughts.
                    With the natural ability to engage in critical thinking , i explore complex ideas and offer fresh perspectives in my writing .
                    As i embrak on my jounery as a <span className="text-[1.5rem] hover:text-white">blogger </span>, my goal is to share amazing stories filled with passion and depth , ensuring that you wull not only read them but enjoy and love every moment
                    </p>
                </div>
            </div>
        </>
    )
}

export default About;