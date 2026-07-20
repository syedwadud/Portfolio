"use client";

import { useRef } from "react";

type Project = {
  title: string;
  year: string;
  format: string;
  credit: string;
  description: string;
  link: string;
  tone: string;
};

const projects: Project[] = [
  {
    title: "Anjali: A Dalit Girl's Story of Resilience",
    year: "2022",
    format: "Short documentary",
    credit: "BIGD, BRAC University",
    description: "A short film about education, identity and the quiet courage to imagine a different future.",
    link: "https://bigd.bracu.ac.bd/publications/anjali-a-dalit-girls-story-of-resilience/",
    tone: "anjali",
  },
  {
    title: "Stories of In/Subfertility",
    year: "2021",
    format: "Documentary collection",
    credit: "Share-Net International & IPPF",
    description: "Stories that make room for the complexity and private weight of fertility and reproductive health.",
    link: "https://drive.google.com/drive/folders/1Uy_KSse27yWy1GjnFVFm8lbV_9d5PI5J?usp=sharing",
    tone: "stories",
  },
  {
    title: "Free Spirits",
    year: "2019–20",
    format: "Documentary series",
    credit: "NTR / RedOrange",
    description: "Character-led films about people choosing their own way, made for European television.",
    link: "https://www.ntr.nl/Free-Spirits/371/detail/Free-Spirits/VPWON_1304281",
    tone: "spirits",
  },
  {
    title: "DCDD: What We Do",
    year: "2020",
    format: "Explainer film",
    credit: "Dutch Coalition for Disability and Development",
    description: "An accessible film about disability-inclusive development and collective action.",
    link: "https://youtu.be/EgHY3Fy9cuQ",
    tone: "dcdd",
  },
  {
    title: "Korim, the Micro-Merchant",
    year: "2020",
    format: "Digital story",
    credit: "UN Capital Development Fund",
    description: "A small, human story about financial inclusion and the everyday work of a micro-merchant.",
    link: "https://youtu.be/jiMt_LhPgu8",
    tone: "korim",
  },
  {
    title: "Building Social Cohesion",
    year: "2020",
    format: "Campaign film",
    credit: "BRAC & Bangladesh Police",
    description: "A public-interest film about trust, community and the things people can build together.",
    link: "https://youtu.be/_ZcruDhEuOg",
    tone: "cohesion",
  },
  {
    title: "Child Marriage Prevention",
    year: "2019",
    format: "Television commercial",
    credit: "RedOrange",
    description: "A direct and considered message about the need to keep the conversation on child marriage alive.",
    link: "https://youtu.be/EpRwVPGYNxM",
    tone: "prevention",
  },
];

const writing = [
  {
    title: "Breaking the Bloody Taboo",
    publication: "The Daily Star · 2018",
    link: "https://www.thedailystar.net/supplements/menstrual-hygiene-day-2018/breaking-the-bloody-taboo-1584766",
  },
  {
    title: "Focus on Ending Child Marriage Must Not Stop",
    publication: "Dhaka Tribune · 2019",
    link: "https://www.dhakatribune.com/opinion/op-ed/2019/01/24/focus-on-ending-child-marriage-must-not-stop",
  },
];

export default function Home() {
  const rail = useRef<HTMLDivElement>(null);

  const moveRail = (direction: "previous" | "next") => {
    rail.current?.scrollBy({
      left: direction === "next" ? 368 : -368,
      behavior: "smooth",
    });
  };

  return (
    <main id="top" className="site-shell">
      <header className="topbar">
        <a className="identity" href="#top" aria-label="Mohammed Wadudul Islam, home">
          <span>Mohammed Wadudul Islam</span>
          <small>Writer · Producer · Artist</small>
        </a>
        <nav className="primary-nav" aria-label="Primary navigation">
          <a href="#work">Selected work</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="email-link" href="mailto:wadud.exe@gmail.com">Say hello ↗</a>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <p className="eyebrow">A portfolio of selected work</p>
        <div className="hero-grid">
          <h1 id="hero-title">Writer, producer <em>&amp; artist.</em></h1>
          <div className="hero-copy">
            <p>I work with words, images and the small details that make a story worth staying with.</p>
            <p>My professional work is rooted in development communication. The thread that runs through it is simpler: finding a way in.</p>
          </div>
        </div>
        <div className="hero-mark" aria-hidden="true">
          <span className="mark-frame" />
          <span className="mark-disc" />
          <span className="mark-line" />
        </div>
      </section>

      <section id="work" className="work-section" aria-labelledby="work-title">
        <div className="section-intro">
          <div>
            <p className="eyebrow">Selected moving-image work</p>
            <h2 id="work-title">Things I have helped make.</h2>
          </div>
          <p>A small selection of films and visual work. I have written, produced, researched or shaped these in different ways.</p>
        </div>

        <div className="rail-controls" aria-label="Browse selected work">
          <button type="button" onClick={() => moveRail("previous")} aria-label="Previous projects">←</button>
          <button type="button" onClick={() => moveRail("next")} aria-label="Next projects">→</button>
        </div>

        <div ref={rail} className="project-rail" tabIndex={0} aria-label="Selected projects. Scroll horizontally to browse.">
          {projects.map((project) => (
            <article className={`project-card ${project.tone}`} key={project.title}>
              <a href={project.link} target="_blank" rel="noreferrer" aria-label={`Open ${project.title}`}>
                <div className="project-image" aria-hidden="true">
                  <span className="play">▶</span>
                  <span className="project-number">{project.year}</span>
                </div>
                <div className="project-content">
                  <p className="project-meta">{project.format}</p>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <span className="project-credit">{project.credit}</span>
                  <span className="view-link">View work <b>↗</b></span>
                </div>
              </a>
            </article>
          ))}
        </div>
        <p className="scroll-note">Use the arrows or scroll sideways to see more.</p>
      </section>

      <section className="writing-section" aria-labelledby="writing-title">
        <div>
          <p className="eyebrow">Writing</p>
          <h2 id="writing-title">Words behind the images.</h2>
        </div>
        <div className="writing-copy">
          <p>I write for the work too—sometimes as scripts, sometimes as notes, and sometimes as articles. These are two pieces I still return to.</p>
          <div className="writing-links">
            {writing.map((article) => (
              <a key={article.title} href={article.link} target="_blank" rel="noreferrer">
                <span>{article.publication}</span>
                <strong>{article.title}</strong>
                <b>↗</b>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="about-section" aria-labelledby="about-title">
        <p className="eyebrow">A little about me</p>
        <div className="about-grid">
          <h2 id="about-title">I like to look closely, listen properly, and make something clear without making it flat.</h2>
          <div>
            <p>I have spent the past eleven years working across media, research and communication. I come from a background in film and development studies, and I am usually drawn to work that asks for patience, care and a little imagination.</p>
            <p>That has taken me from documentaries and animations to campaigns, knowledge platforms and editorial work—often around gender, public health, climate, water and sanitation.</p>
          </div>
        </div>
      </section>

      <section id="contact" className="contact-section" aria-labelledby="contact-title">
        <div>
          <p className="eyebrow">Keep in touch</p>
          <h2 id="contact-title">If there is a story to talk about, I would be glad to hear from you.</h2>
        </div>
        <div className="contact-actions">
          <a className="solid-button" href="mailto:wadud.exe@gmail.com">wadud.exe@gmail.com <span>↗</span></a>
          <a className="text-button" href="https://www.linkedin.com/in/syed-wadud/" target="_blank" rel="noreferrer">LinkedIn ↗</a>
        </div>
      </section>

      <footer>
        <span>Mohammed Wadudul Islam</span>
        <span>Selected work, 2015–2026</span>
        <a href="#top">Back to top ↑</a>
      </footer>
    </main>
  );
}
