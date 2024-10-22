function Navbar(){

    const scrollToAbout = () => {
        if (aboutRef.current) {
          aboutRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      };
    return(
        <nav>
            <ul className="md:flex md:justify-between ">
                <li className="text-center hover:text-center font-bold hover:text-yellow-300  text-2xl text-yellow-400">King David Blog</li>
                <div className="flex justify-end gap-4">
                {
                    [
                        {id:1,name:'About',link:'/About'},
                        
                    ].map(item =>
                    (
                    <ul>
                        <li key={item.id} className="hover:text-center font-bold hover:text-yellow-300  hover:rounded-lg  ">
                        <a onClick={scrollToAbout}>{item.name} </a>
                    </li>
                    </ul>
                    )
                    )
                }
                </div>
            </ul>
        </nav>
             
        
    )
}

export default Navbar;