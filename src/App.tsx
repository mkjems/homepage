import type { CSSProperties } from "react";
import {
  Button,
  Col,
  Container,
  Eyebrow,
  Grid,
  GridOverlay,
  Heading,
  Inline,
  List,
  ListItem,
  RevealImage,
  RevealText,
  Rule,
  Stack,
  Text,
  useGridToggle,
} from "glow-ui";
import { projects, type Project } from "./projects";

const pad = (n: number) => String(n).padStart(2, "0");
const hue = (h: number) => ({ "--glow-h": h }) as CSSProperties;

/** Swiss masthead: four equal columns of small facts, like the head of a poster. */
function Masthead() {
  return (
    <header className="masthead">
      <Grid gapY={2} reveal="fade" stagger={80}>
        <Col span={{ base: 2, md: 6, lg: 9 }}>
          <a href="/" className="wordmark">
            M. Kjems
          </a>
        </Col>
        <Col span={{ base: 2, md: 2, lg: 3 }}>
          <Inline
            as="nav"
            aria-label="Sections"
            className="masthead-nav"
            justify="flex-end"
            gap={3}
            style={{ fontSize: "var(--glow-fs-text-sm)" }}
          >
            <a className="glow-link" href="#work">
              Work
            </a>
            <a className="glow-link" href="#stack">
              Stack
            </a>
            <a className="glow-link" href="#about">
              About
            </a>
          </Inline>
        </Col>
      </Grid>
      <Rule tone="line" />
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <Grid gapY="clamp(40px, 8vw, 112px)">
        <Col>
          <Heading level={1} size="display" id="hero-title">
            <RevealText lines={["Games for", "the browser."]} />
          </Heading>
        </Col>

        <Col span={{ md: 4, lg: 4 }} start={{ lg: 4 }}>
          <Text size="md" tone="muted" reveal={{ effect: "rise", delay: 500 }}>
            Four small games, designed, built and hosted by me. Each one is a
            place to try a new piece of the web platform.
          </Text>
        </Col>

        <Col span={{ md: 4, lg: 5 }} start={{ lg: 8 }}>
          <nav aria-label="Games">
            <List numbered stagger={90}>
              {projects.map((p) => (
                <ListItem
                  key={p.slug}
                  className="glow-hue"
                  style={hue(p.hue)}
                  title={p.name}
                  meta={p.genre}
                  href={`#${p.slug}`}
                />
              ))}
            </List>
          </nav>
        </Col>
      </Grid>
    </section>
  );
}

function ProjectRow({ project: p, n }: { project: Project; n: number }) {
  return (
    <article
      id={p.slug}
      className="project glow-hue"
      style={hue(p.hue)}
      aria-labelledby={`${p.slug}-title`}
    >
      <Rule tone="neon" />
      <Grid gapY={3} className="project-grid">
        <Col span={{ lg: 2 }}>
          <Eyebrow index={pad(n)} reveal="fade">
            {p.genre}
          </Eyebrow>
        </Col>

        <Col span={{ md: 5, lg: 6 }}>
          <RevealImage
            href={p.url}
            linkProps={{ "aria-label": `Play ${p.name}` }}
            src={`/screens/${p.slug}.jpg`}
            alt={p.alt}
            ratio="16/10"
            loading="lazy"
            width={1200}
            height={750}
          />
        </Col>

        <Col span={{ md: 3, lg: 3 }} start={{ lg: 10 }}>
          <Stack gap={3} className="project-copy">
            <Heading level={2} size="l" id={`${p.slug}-title`} reveal="rise">
              {p.name}
            </Heading>
            <Text tone="muted" reveal={{ effect: "rise", delay: 120 }}>
              {p.description}
            </Text>
            <dl className="facts">
              <div>
                <dt>Players</dt>
                <dd>{p.players}</dd>
              </div>
              <div>
                <dt>Address</dt>
                <dd>{p.host}</dd>
              </div>
            </dl>
            <Button variant="outline" href={p.url} className="play">
              Play {p.name} <span aria-hidden>→</span>
            </Button>
          </Stack>
        </Col>
      </Grid>
    </article>
  );
}

const pipeline = [
  {
    title: "Push",
    text: "A push to main starts a GitHub Actions workflow that installs, typechecks and builds the app.",
  },
  {
    title: "Package",
    text: "The build goes into a Docker image, pushed to GitHub Container Registry as latest and as the commit SHA.",
  },
  {
    title: "Deploy",
    text: "Actions connects to the VPS over SSH, pulls the new image and restarts the service with Docker Compose.",
  },
  {
    title: "Serve",
    text: "Caddy terminates HTTPS and routes each subdomain to its container. A final check requests the live URL.",
  },
];

const stack = [
  ["Server", "Hetzner VPS"],
  ["Edge", "Caddy, automatic HTTPS"],
  ["Runtime", "Docker Compose"],
  ["Static", "Nginx, unprivileged"],
  ["Registry", "GitHub Container Registry"],
  ["CI/CD", "GitHub Actions"],
  ["Analytics", "GoatCounter, self-hosted"],
];

function Infrastructure({ n }: { n: number }) {
  return (
    <section id="stack" className="stack" aria-labelledby="stack-title">
      <Rule tone="line" />
      <Grid gapY={5}>
        <Col span={{ lg: 2 }}>
          <Eyebrow index={pad(n)} reveal="fade">
            Infrastructure
          </Eyebrow>
        </Col>
        <Col span={{ lg: 10 }}>
          <Heading level={2} size="xl" id="stack-title">
            <RevealText
              parts={[
                "One small server.",
                { text: "Shipped on every push.", tone: "muted" },
              ]}
            />
          </Heading>
        </Col>

        <Col span={{ md: 4, lg: 4 }} start={{ lg: 3 }}>
          <Text size="lg" tone="muted" reveal="rise">
            The games and this page run as Docker containers on a single Hetzner
            VPS. Each app follows the same recipe, from commit to HTTPS, with no
            manual steps.
          </Text>
        </Col>
        <Col span={{ md: 4, lg: 4 }} start={{ lg: 9 }}>
          <dl className="facts facts--about">
            {stack.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </Col>

        <Col span={{ lg: 10 }} start={{ lg: 3 }}>
          <Grid
            as="ol"
            className="pipeline"
            aria-label="Deploy pipeline"
            columns={{ base: 1, md: 2, lg: 4 }}
            gapY={4}
            reveal="rise"
            stagger={120}
          >
            {pipeline.map((step, i) => (
              <li key={step.title} className="pipeline-step">
                <Rule weight={2} delay={i * 220} />
                <span className="pipeline-no">{pad(i + 1)}</span>
                <Heading level={3} size="m">
                  {step.title}
                </Heading>
                <Text size="sm" tone="muted">
                  {step.text}
                </Text>
              </li>
            ))}
          </Grid>
        </Col>
      </Grid>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="about" aria-labelledby="about-title">
      <Rule tone="line" />
      <Grid gapY={5}>
        <Col span={{ lg: 2 }}>
          <Eyebrow index={pad(projects.length + 2)} reveal="fade">
            About
          </Eyebrow>
        </Col>
        <Col span={{ lg: 10 }}>
          <Heading level={2} size="xl" id="about-title">
            <RevealText
              parts={[
                "Developer and designer",
                { text: "living in Copenhagen.", tone: "muted" },
              ]}
            />
          </Heading>
        </Col>
        <Col span={{ md: 4, lg: 4 }} start={{ lg: 3 }}>
          <Text size="lg" reveal="rise">
            I’m M. Kjems. I like to explore new web technologies, and games are
            my favourite way to do it: they need real-time networking, rendering
            and tight interaction all at once.
          </Text>
        </Col>
        <Col span={{ md: 4, lg: 4 }} start={{ lg: 9 }}>
          <dl className="facts facts--about">
            <div>
              <dt>Based in</dt>
              <dd>Copenhagen, Denmark</dd>
            </div>
            <div>
              <dt>Work</dt>
              <dd>Development and design</dd>
            </div>
            <div>
              <dt>Interests</dt>
              <dd>New web technologies, browser games</dd>
            </div>
            <div>
              <dt>This page</dt>
              <dd>React, Vite and Glow UI on a 12-column grid</dd>
            </div>
          </dl>
        </Col>
      </Grid>
    </section>
  );
}

function Footer({ onGrid }: { onGrid: () => void }) {
  return (
    <footer className="footer">
      <Rule tone="hairline" />
      <Grid gapY={1}>
        <Col span={{ md: 2, lg: 3 }}>
          <Text size="xs" tone="faint">
            © {new Date().getFullYear()} M. Kjems
          </Text>
        </Col>
        <Col span={{ md: 2, lg: 3 }}>
          <Text size="xs" tone="faint">
            mkjems.dk
          </Text>
        </Col>
        <Col span={{ md: 4, lg: 6 }}>
          <Text size="xs" tone="faint">
            <button type="button" className="glow-link" onClick={onGrid}>
              Press G to show the grid
            </button>
          </Text>
        </Col>
      </Grid>
    </footer>
  );
}

export function App() {
  const [gridVisible, setGridVisible] = useGridToggle("g");

  return (
    <>
      <Container>
        <Masthead />
        <main>
          <Hero />
          <section id="work" aria-label="Games" className="work">
            {projects.map((p, i) => (
              <ProjectRow key={p.slug} project={p} n={i + 1} />
            ))}
          </section>
          <Infrastructure n={projects.length + 1} />
          <About />
        </main>
        <Footer onGrid={() => setGridVisible((v) => !v)} />
      </Container>
      <GridOverlay visible={gridVisible} />
    </>
  );
}
