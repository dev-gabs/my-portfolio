import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutMe from './components/AboutMe';
import Tools from './components/Tools';
import Projects from './components/Projects';
import Footer from './components/Footer';

import { LanguageProvider } from './context/LanguageContext';

function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen">
        <Navbar />
        <main>
          <Hero />
          <AboutMe />
          <Tools />
          <Projects />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;
