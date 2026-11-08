export interface Project {
  slug: string;
  name: string;
  url: string;
  host: string;
  /** Theme hue for this project's accents (see glow-ui --glow-h). */
  hue: number;
  genre: string;
  players: string;
  description: string;
  alt: string;
}

export const projects: Project[] = [
  {
    slug: 'frontlines',
    name: 'Frontlines',
    url: 'https://frontlines.mkjems.dk/',
    host: 'frontlines.mkjems.dk',
    hue: 12,
    genre: 'Strategy',
    players: 'Campaign or vs. a friend',
    description:
      'Two kingdoms, one river. You never command a soldier: you draw the roads they march on, and the armies sort out the rest.',
    alt: 'Frontlines map: blue towns on the left, red towns on the right, a river with two bridges between them.',
  },
  {
    slug: 'gunfight',
    name: 'Gunfight',
    url: 'https://gunfight.mkjems.dk/',
    host: 'gunfight.mkjems.dk',
    hue: 58,
    genre: 'Arcade duel',
    players: '2 players',
    description:
      'A two-player shootout in the spirit of 1975 arcade cabinets. Pixel cowboys, six bullets each and a high-score table, played with the keyboard.',
    alt: 'Gunfight title screen: two yellow pixel cowboys facing each other with the keyboard controls between them.',
  },
  {
    slug: 'multiplayer',
    name: 'Multiplayer',
    url: 'https://multiplayer.mkjems.dk/',
    host: 'multiplayer.mkjems.dk',
    hue: 205,
    genre: 'Real-time arena',
    players: 'Up to 8',
    description:
      'A live lobby for small real-time games. Pick a name, join Dot Arena or Speed Race and move, aim and shoot with everyone else in the room.',
    alt: 'Multiplayer arena: a blue player dot among grey angular rocks and green walls, with ammo and kills in the corner.',
  },
  {
    slug: 'mastermind',
    name: 'Mastermind',
    url: 'https://mastermind.mkjems.dk/',
    host: 'mastermind.mkjems.dk',
    hue: 305,
    genre: 'Logic puzzle',
    players: '1 player',
    description:
      'The code-breaking board game. Crack the hidden colours in ten guesses, or set the code yourself and watch an algorithm solve it.',
    alt: 'Mastermind board with six rows of coloured pegs and red and white feedback pins.',
  },
];
