import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutMe from './components/AboutMe';
import Tools from './components/Tools';
import Projects from './components/Projects';
import Story from './components/Story';
import Contact from './components/Contact';
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
          <Story />
          <Contact />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;
