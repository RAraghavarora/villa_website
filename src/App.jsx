import { useState, useEffect } from 'react'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav style={{
      background: scrolled ? 'rgba(15, 23, 42, 0.9)' : 'transparent',
      borderBottom: scrolled ? '1px solid var(--glass-border)' : 'none',
    }}>
      <div className="logo">Austin Villa <span style={{ color: 'var(--text-secondary)', fontSize: '0.8em' }}>@Home</span></div>
      <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#media">Media</a></li>
        <li><a href="#publications">Publications</a></li>
        <li><a href="#software">Software</a></li>
        <li><a href="#links">Links</a></li>
      </ul>
    </nav>
  );
};

const Hero = () => {
  return (
    <div id="home" style={{
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0 2rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: 'url(/team_hero.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        zIndex: -1,
        filter: 'brightness(0.3)'
      }} />
      <div className="container" style={{ textAlign: 'center', zIndex: 1 }}>
        <h1 style={{ fontSize: '4em', marginBottom: '0.5rem' }}>Austin Villa @ Home</h1>
        <p style={{ fontSize: '1.5em', color: 'var(--text-primary)', maxWidth: '800px', margin: '0 auto 2rem', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
          Developing intelligent service robots for the real world.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <a href="#about"><button>Learn More</button></a>
          <a href="http://www.cs.utexas.edu/~AustinVilla/athome/UT_Austin_Villa_Home_2025_Team_Description_Paper.pdf" target="_blank"><button style={{ background: 'var(--accent-primary)', color: 'var(--bg-primary)' }}>2025 Team Description Paper</button></a>
        </div>
      </div>
    </div>
  );
};

const SoftwareCard = ({ title, description, link }) => (
  <div className="glass-card">
    <h3 style={{ marginTop: 0, color: 'var(--accent-primary)' }}>{title}</h3>
    <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>{description}</p>
    <a href={link} target="_blank" rel="noopener noreferrer">
      <button style={{ padding: '0.5em 1em', fontSize: '0.9em' }}>View Repository &rarr;</button>
    </a>
  </div>
);

const PublicationCard = ({ title, authors, venue, link }) => (
  <div className="glass-card" style={{ padding: '1.5rem' }}>
    <h3 style={{ marginTop: 0, fontSize: '1.2em', marginBottom: '0.5rem' }}>
      <a href={link} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-primary)' }}>{title}</a>
    </h3>
    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9em', marginBottom: '0.5rem', fontStyle: 'italic' }}>{authors}</p>
    <p style={{ color: 'var(--accent-secondary)', fontSize: '0.85em', margin: 0 }}>{venue}</p>
  </div>
);

const Section = ({ id, title, children }) => (
  <section id={id} className="section container">
    <h2>{title}</h2>
    {children}
  </section>
);

function App() {
  return (
    <div>
      <Navbar />
      <Hero />

      <Section id="about" title="About Us">
        <div className="glass-card">
          <p style={{ fontSize: '1.1em', lineHeight: '1.8' }}>
            We are the <strong>Austin Villa @ Home</strong> team from the University of Texas at Austin.
            Our research focuses on <strong>fully integrated architectures for service robots</strong> that operate in the real world.
            Built on top of the Robot Operating System (ROS), our software powers robots that navigate, reason, and interact with humans in dynamic environments.
          </p>
          <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <img src="/hsr_logo.jpg" alt="HSR Robot" style={{ height: '100px', borderRadius: '8px', border: '1px solid var(--glass-border)' }} />
            <div>
              <h3 style={{ margin: '0 0 0.5rem 0' }}>RoboCup@Home</h3>
              <p style={{ margin: 0, color: 'var(--text-secondary)' }}>
                We compete in the RoboCup@Home Domestic Standard Platform League using the Toyota Human Support Robot (HSR).
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section id="media" title="Team Media">
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          <div className="glass-card" style={{ padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <iframe
              width="100%"
              height="315"
              src="https://www.youtube.com/embed/E4XUL4VtmkA"
              title="2025 Team Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ borderRadius: '8px' }}
            ></iframe>
          </div>
          <div className="glass-card" style={{ padding: '1rem' }}>
            <img src="/team_last_day.jpg" alt="Team Last Day" style={{ width: '100%', height: '315px', objectFit: 'cover', borderRadius: '8px' }} />
            <p style={{ textAlign: 'center', marginTop: '1rem', color: 'var(--text-secondary)' }}>Austin Villa @ Home Team</p>
          </div>
        </div>
      </Section>

      <Section id="publications" title="Relevant Publications">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <PublicationCard
            title="Solving Service Robot Tasks: UT Austin Villa@Home 2019 Team Report"
            authors="Rishi Shah, Yuqian Jiang, Haresh Karnan, Gilberto Briscoe-Martinez, Dominick Mulder, Ryan Gupta, Rachel Schlossman, Marika Murphy, Justin Hart, Luis Sentis, and Peter Stone"
            venue="AAAI Fall Symposium on Artificial Intelligence and Human-Robot Interaction (AI-HRI 2019)"
            link="http://www.cs.utexas.edu/~pstone/Papers/bib2html-links/AIHRI19-shah.pdf"
          />
          <PublicationCard
            title="Open-World Reasoning for Service Robots"
            authors="Yuqian Jiang, Nick Walker, Justin Hart, and Peter Stone"
            venue="Proceedings of the 29th International Conference on Automated Planning and Scheduling (ICAPS 2019)"
            link="http://www.cs.utexas.edu/~pstone/Papers/bib2html-links/ICAPS19-Jiang.pdf"
          />
          <PublicationCard
            title="PRISM: Pose registration for integrated semantic mapping"
            authors="Justin Hart, Rishi Shah, Sean Kirmani, Nick Walker, Kathryn Baldauf, Nathan John, and Peter Stone"
            venue="IROS 2018"
            link="http://www.cs.utexas.edu/users/ai-lab/?IROS18-hart"
          />
          <PublicationCard
            title="Interaction and Autonomy in RoboCup@Home and Building-Wide Intelligence"
            authors="Justin Hart, Harel Yedidsion, Yuqian Jiang, Nick Walker, Rishi Shah, Jesse Thomason, Aishwarya Padmakumar, Rolando Fernandez, Jivko Sinapov, Raymond Mooney, and Peter Stone"
            venue="AAAI Fall Symposium on Interactive Learning in AI for HRI, 2018"
            link="https://arxiv.org/abs/1810.02919"
          />
          <PublicationCard
            title="LAAIR: A layered architecture for autonomous interactive robots"
            authors="Yuqian Jiang, Nick Walker, Minkyu Kim, Nicolas Brissonneau, Daniel S. Brown, Justin Hart, Scott Niekum, Luis Sentis, and Peter Stone"
            venue="AAAI Fall Symposium on Reasoning and Learning in Real-World Systems, 2018"
            link="https://arxiv.org/abs/1811.03563"
          />
        </div>
        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
          <a href="http://www.cs.utexas.edu/~AustinVilla/?p=papers" target="_blank" style={{ color: 'var(--accent-primary)', fontSize: '0.9em' }}>View full list of RoboCup-related papers &rarr;</a>
        </div>
      </Section>

      <Section id="software" title="Software & Resources">
        <div className="grid">
          <SoftwareCard
            title="BWI Code Repository"
            description="Our primary open-source suite of ROS packages, fully integrated for service robots. Recommended for the highest-quality versions of our system."
            link="https://github.com/utexas-bwi/"
          />
          <SoftwareCard
            title="bwi_common"
            description="Robot-independent software containing the core robot architecture used in both RoboCup@Home and BWI projects."
            link="https://github.com/utexas-bwi/bwi_common/"
          />
          <SoftwareCard
            title="Knowledge Representation"
            description="Software packages for knowledge representation and reasoning, essential for intelligent service robot decision making."
            link="https://github.com/utexas-bwi/knowledge_representation/"
          />
          <SoftwareCard
            title="Object Cloud"
            description="Software for query-able point cloud of objects, enabling robots to recognize and manipulate objects in their environment."
            link="https://github.com/utexas-bwi/object_cloud/"
          />
          <SoftwareCard
            title="Open-World Reasoning"
            description="Software release for our ICAPS19 paper on Open-World Reasoning for Service Robots."
            link="http://doi.org/10.5281/zenodo.2629308"
          />
        </div>
      </Section>

      <Section id="links" title="Team & Competitions">
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
          {[
            { name: "UT Austin Villa Home", url: "https://www.cs.utexas.edu/~AustinVilla/?p=home" },
            { name: "Nao League", url: "https://www.cs.utexas.edu/~AustinVilla/?p=nao" },
            { name: "3D Sim League", url: "https://www.cs.utexas.edu/~AustinVilla/sim/3dsimulation/" },
            { name: "Research", url: "https://www.cs.utexas.edu/~AustinVilla/?p=research" },
            { name: "Papers", url: "https://www.cs.utexas.edu/~AustinVilla/?p=papers" },
            { name: "Members", url: "https://www.cs.utexas.edu/~AustinVilla/?p=members" },
            { name: "Competitions", url: "https://www.cs.utexas.edu/~AustinVilla/?p=competitions" },
            { name: "Downloads", url: "https://www.cs.utexas.edu/~AustinVilla/?p=downloads" },
          ].map(link => (
            <a key={link.name} href={link.url} target="_blank" className="glass-card" style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}>
              <span style={{ color: 'var(--text-primary)', fontWeight: '600' }}>{link.name}</span>
            </a>
          ))}
        </div>
      </Section>

      <footer style={{
        marginTop: '4rem',
        padding: '2rem',
        textAlign: 'center',
        background: 'var(--bg-secondary)',
        borderTop: '1px solid var(--glass-border)'
      }}>
        <p style={{ color: 'var(--text-secondary)' }}>
          © 2026 Austin Villa. University of Texas at Austin.
        </p>
      </footer>
    </div>
  )
}

export default App
