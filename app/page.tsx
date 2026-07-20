"use client";

import { useMemo, useState } from "react";

type Project = {
  title: string;
  year: string;
  organization: string;
  format: string;
  theme: string;
  description: string;
  link: string;
  tags: string[];
};

const filters = [
  "All field notes",
  "Gender & inclusion",
  "Development practice",
  "Climate & resilience",
  "Culture & identity",
  "Public health",
];

const projects: Project[] = [
  {
    title: "Anjali: A Dalit Girl's Story of Resilience",
    year: "2022",
    organization: "BIGD, BRAC University",
    format: "Documentary film",
    theme: "Gender & inclusion",
    description:
      "An eight-minute portrait of education, determination and resistance to child marriage in a marginalized Dalit community.",
    link: "https://bigd.bracu.ac.bd/publications/anjali-a-dalit-girls-story-of-resilience/",
    tags: ["Story development", "Production", "Social change"],
  },
  {
    title: "ADVANTAGE communication strategy",
    year: "2025-26",
    organization: "GIZ / RedOrange",
    format: "Research & strategy",
    theme: "Development practice",
    description:
      "An evidence-led national communication framework on skills, employment and dignity for women, people with disabilities and gender-diverse communities.",
    link: "https://www.linkedin.com/in/syed-wadud/",
    tags: ["Strategy", "Formative research", "Facilitation"],
  },
  {
    title: "Free Spirits",
    year: "2019-20",
    organization: "NTR / RedOrange",
    format: "Documentary series",
    theme: "Culture & identity",
    description:
      "Character-led films about people choosing unconventional paths, produced for European television and recognized by PRIX Europa.",
    link: "https://www.ntr.nl/Free-Spirits/371/detail/Free-Spirits/VPWON_1304281",
    tags: ["Production", "Interview", "International broadcast"],
  },
  {
    title: "11th South Asia Economic Policy Network Conference",
    year: "2023",
    organization: "BIGD & World Bank",
    format: "International convening",
    theme: "Development practice",
    description:
      "Communications and event leadership for a regional dialogue on social progress, opportunity and mobility in South Asia.",
    link: "https://bigd.bracu.ac.bd/event/the-11th-south-asia-economic-policy-network-conference-on-social-progress-in-south-asia/",
    tags: ["Conference", "Press", "Stakeholders"],
  },
  {
    title: "12th South Asia Economic Policy Network Conference",
    year: "2023",
    organization: "BIGD & World Bank",
    format: "International convening",
    theme: "Climate & resilience",
    description:
      "Communications and event management for a major regional conference on green growth, climate risk and inclusive policy.",
    link: "https://bigd.bracu.ac.bd/event/the-12th-south-asia-economic-policy-network-conference-on-green-growth-in-south-asia/",
    tags: ["Green growth", "Media relations", "Production"],
  },
  {
    title: "Opinion: Bangabandhu's 100th and National Children's Day",
    year: "2022",
    organization: "BIGD",
    format: "Opinion article",
    theme: "Gender & inclusion",
    description:
      "A public-interest reflection connecting children's rights, education and the unfinished work of ending child marriage.",
    link: "https://bigd.bracu.ac.bd/?p=11004",
    tags: ["Writing", "Advocacy", "Child rights"],
  },
  {
    title: "Stories of In/Subfertility",
    year: "2021",
    organization: "Share-Net International & IPPF",
    format: "Documentary collection",
    theme: "Public health",
    description:
      "Human-centred audiovisual stories bringing nuance and dignity to conversations about fertility and reproductive health.",
    link: "https://drive.google.com/drive/folders/1Uy_KSse27yWy1GjnFVFm8lbV_9d5PI5J?usp=sharing",
    tags: ["SRHR", "Producer", "Documentary"],
  },
  {
    title: "DCDD: What We Do",
    year: "2020",
    organization: "Dutch Coalition for Disability and Development",
    format: "Explainer film",
    theme: "Gender & inclusion",
    description:
      "An accessible audiovisual introduction to disability-inclusive development and collective action.",
    link: "https://youtu.be/EgHY3Fy9cuQ",
    tags: ["Script", "Accessibility", "Video"],
  },
  {
    title: "Korim, the Micro-Merchant",
    year: "2020",
    organization: "UN Capital Development Fund",
    format: "Digital story",
    theme: "Development practice",
    description:
      "A concise human story translating financial inclusion into the everyday experience of a micro-merchant.",
    link: "https://youtu.be/jiMt_LhPgu8",
    tags: ["Financial inclusion", "Narrative", "Video"],
  },
  {
    title: "Building Social Cohesion",
    year: "2020",
    organization: "BRAC & Bangladesh Police",
    format: "Campaign film",
    theme: "Development practice",
    description:
      "A collaborative public-interest media piece about trust, community and social cohesion.",
    link: "https://youtu.be/_ZcruDhEuOg",
    tags: ["Campaign", "Partnership", "Public communication"],
  },
  {
    title: "Focus on Ending Child Marriage Must Not Stop",
    year: "2019",
    organization: "Dhaka Tribune",
    format: "Opinion article",
    theme: "Gender & inclusion",
    description:
      "An argument for sustained public attention and action against child marriage in Bangladesh.",
    link: "https://www.dhakatribune.com/opinion/op-ed/2019/01/24/focus-on-ending-child-marriage-must-not-stop",
    tags: ["Advocacy", "Writing", "Gender justice"],
  },
  {
    title: "Breaking the Bloody Taboo",
    year: "2018",
    organization: "The Daily Star",
    format: "Feature article",
    theme: "Public health",
    description:
      "A feature confronting menstrual stigma and making reproductive health information more visible and humane.",
    link: "https://www.thedailystar.net/supplements/menstrual-hygiene-day-2018/breaking-the-bloody-taboo-1584766",
    tags: ["Menstrual health", "Feature", "SBCC"],
  },
  {
    title: "Twinning Up North",
    year: "2018",
    organization: "KNOV / Midwives4Mothers",
    format: "Editorial feature",
    theme: "Public health",
    description:
      "A cross-cultural story about midwifery, partnership and knowledge exchange.",
    link: "https://midwives4mothers.nl/twinning-up-north/",
    tags: ["Midwifery", "Editorial", "Global health"],
  },
  {
    title: "Hello I Am: Change Maker Photo Story",
    year: "2018",
    organization: "Rutgers",
    format: "Photo story",
    theme: "Gender & inclusion",
    description:
      "A visual narrative amplifying the voice of a young change maker working for gender equality.",
    link: "https://helloiamchangemakers.org/ina-a-girl-raising-her-voice/",
    tags: ["Photography", "Youth voice", "Storytelling"],
  },
  {
    title: "Initiatives on Child Marriage in Bangladesh",
    year: "2017",
    organization: "Share-Net Bangladesh",
    format: "Knowledge article",
    theme: "Gender & inclusion",
    description:
      "A research-led overview of initiatives addressing child marriage across Bangladesh.",
    link: "https://www.share-netbangladesh.org/highlights-on-initiatives-on-child-marriage-in-bangladesh/",
    tags: ["Research", "Knowledge platform", "SRHR"],
  },
];

const journey = [
  ["2015-16", "Finding the lens", "Media studies, anthropology, BIED and early independent work."],
  ["2016-17", "Writing for change", "Daily knowledge content and research with Share-Net Bangladesh."],
  ["2018-21", "Campaign craft", "Scripts, films and 100+ knowledge products at RedOrange."],
  ["2022-25", "Evidence to impact", "Leading institutional communications and multimedia at BIGD."],
  ["2025-26", "Strategy at scale", "Research and communications leadership for GIZ ADVANTAGE."],
];

export default function Home() {
  const [activeFilter, setActiveFilter] = useState(filters[0]);

  const visibleProjects = useMemo(
    () =>
      activeFilter === filters[0]
        ? projects
        : projects.filter((project) => project.theme === activeFilter),
    [activeFilter],
  );

  return (
    <main id="top" className="site-shell">
      <header className="topbar">
        <a className="identity" href="#top" aria-label="Mohammed Wadudul Islam, home">
          <span className="monogram">MWI</span>
          <span>
            <strong>Mohammed Wadudul Islam</strong>
            <small>Communications · Media · Strategy</small>
          </span>
        </a>
        <nav className="primary-nav" aria-label="Primary navigation">
          <a href="#work">Work</a>
          <a href="#journey">Journey</a>
          <a href="#expertise">Expertise</a>
          <a href="#about">About</a>
        </nav>
        <div className="header-action">
          <span className="availability">Dhaka · Open to collaborate</span>
          <a className="outline-button" href="mailto:wadud.exe@gmail.com">Start a conversation ↗</a>
        </div>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">Field notes from an 11-year practice</p>
          <h1 id="hero-title">Stories that move <span>people &amp; systems.</span></h1>
          <div className="hero-intro" id="about">
            <p className="location-label">Based in<br />Bangladesh</p>
            <p>I translate research, strategy and lived experience into communication that can be understood, felt and acted on—from documentary films to public-interest campaigns.</p>
          </div>
        </div>

        <aside className="project-slate" aria-label="Highlighted project">
          <article>
            <div className="slate-meta"><span>DOCUMENTARY / BIGD</span><span>2022</span></div>
            <h2>Anjali: A Dalit Girl&apos;s Story of Resilience</h2>
            <p>An intimate portrait of education, identity and the quiet courage to imagine a different future.</p>
            <div className="slate-footer">
              <a href="https://bigd.bracu.ac.bd/publications/anjali-a-dalit-girls-story-of-resilience/" target="_blank" rel="noreferrer"><span>▶</span> Watch the film</a>
              <strong>08:00 MIN</strong>
            </div>
          </article>
          <div className="marginalia" aria-label="Project details">
            <p><strong>Format</strong><span>Short documentary</span></p>
            <p><strong>Credit</strong><span>Author · Story · Communications</span></p>
            <p><strong>Focus</strong><span>Equity &amp; social change</span></p>
          </div>
        </aside>
      </section>

      <section className="filter-section" aria-labelledby="filter-title">
        <p id="filter-title">Browse the archive by theme</p>
        <div className="filter-list">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              className={filter === activeFilter ? "active" : ""}
              aria-pressed={filter === activeFilter}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
      </section>

      <section className="featured-section" id="work" aria-labelledby="featured-title">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Selected evidence</p>
            <h2 id="featured-title">Featured work</h2>
          </div>
          <a href="#archive">Open complete archive ↓</a>
        </div>
        <div className="featured-grid">
          {projects.slice(0, 3).map((project, index) => (
            <a className={`featured-card ${index === 0 ? "lead" : ""}`} href={project.link} target="_blank" rel="noreferrer" key={project.title}>
              <span className="card-meta">0{index + 1} · {project.format} · {project.organization}</span>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <span className="tag-row">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</span>
              <span className="external" aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
      </section>

      <section className="practice-grid">
        <div className="expertise" id="expertise">
          <p className="section-kicker">Working toolkit</p>
          <h2>Across disciplines,<br />always story-led.</h2>
          <div className="expertise-list">
            {[
              "Communication strategy", "Documentary production", "Research translation",
              "Campaign development", "Media relations", "Editorial direction",
              "Event leadership", "SBCC & IEC", "Quality assurance", "Stakeholder engagement",
            ].map((item) => <span key={item}>{item}</span>)}
          </div>
        </div>

        <div className="journey" id="journey">
          <div className="journey-heading">
            <div><p className="section-kicker">A practice in motion</p><h2>Eleven years, five chapters</h2></div>
            <strong>11Y</strong>
          </div>
          <div className="timeline">
            {journey.map(([year, title, detail], index) => (
              <article className={index === journey.length - 1 ? "current" : ""} key={year}>
                <time>{year}</time>
                <h3>{title}</h3>
                <p>{detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="archive" id="archive" aria-labelledby="archive-title">
        <div className="section-heading archive-heading">
          <div>
            <p className="section-kicker">Work across formats</p>
            <h2 id="archive-title">The complete archive</h2>
          </div>
          <p>{visibleProjects.length} field note{visibleProjects.length === 1 ? "" : "s"} · {activeFilter}</p>
        </div>
        <div className="archive-grid">
          {visibleProjects.map((project, index) => (
            <a className="archive-card" href={project.link} target="_blank" rel="noreferrer" key={project.title}>
              <div className="archive-meta"><span>{String(index + 1).padStart(2, "0")}</span><span>{project.year}</span></div>
              <p className="format">{project.format} / {project.organization}</p>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="archive-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              <span className="archive-link">View work ↗</span>
            </a>
          ))}
        </div>
      </section>

      <section className="about-contact" aria-labelledby="about-title">
        <div>
          <p className="section-kicker">The lens behind the work</p>
          <h2 id="about-title">Strategy and empathy,<br />held in the same frame.</h2>
        </div>
        <div className="about-copy">
          <p>With an anthropological lens, I notice the details buried in conventional texts and reports, then bring forward what is human, urgent and useful. My work spans gender rights, public health, climate resilience, disability inclusion and development policy.</p>
          <p>I have led institutional communications, translated research for public audiences, produced work for international television, and managed complex collaborations with development partners, media and government stakeholders.</p>
          <div className="contact-links">
            <a href="mailto:wadud.exe@gmail.com">Email me ↗</a>
            <a href="https://www.linkedin.com/in/syed-wadud/" target="_blank" rel="noreferrer">LinkedIn ↗</a>
          </div>
        </div>
      </section>

      <footer>
        <a className="identity" href="#top">
          <span className="monogram">MWI</span>
          <span><strong>Mohammed Wadudul Islam</strong><small>Stories / Systems / Social impact</small></span>
        </a>
        <p>Selected work · 2015-2026</p>
        <a href="#top">Back to top ↑</a>
      </footer>
    </main>
  );
}
