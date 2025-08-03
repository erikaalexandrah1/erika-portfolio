function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 px-8 py-3 flex justify-between items-center text-white backdrop-blur-md bg-white/5 border-b border-white/10">
      <h1 className="text-lg font-semibold tracking-widest text-white/90">ERIKA</h1>
      <nav className="flex space-x-8 text-sm tracking-wide uppercase text-white/80">
        <a href="#work" className="hover:text-white transition-colors duration-300">Our Work</a>
        <a href="#about" className="hover:text-white transition-colors duration-300">About</a>
        <a href="#contact" className="hover:text-white transition-colors duration-300">Contact</a>
      </nav>
    </header>
  )
}

export default Navbar
