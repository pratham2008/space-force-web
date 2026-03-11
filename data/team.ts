export interface Pilot {
  id: string;
  name: string;
  bio: string;
  avatarUrl: string;
  audioUrl: string;
}

export const TEAM: Pilot[] = [
  {
    id: 'pilot-1',
    name: 'Pratham the JADU',
    bio: 'Chronically online space hacker. Defies gravity just for the aesthetic.',
    avatarUrl: 'https://i.pravatar.cc/150?u=zxyn',
    audioUrl: '/audio/bgm-pilot-1.mp3',
  },
  {
    id: 'pilot-2',
    name: 'Commander Rajdeep',
    bio: 'No cap, best pilot in the galaxy. Fr fr.',
    avatarUrl: 'https://i.pravatar.cc/150?u=rizz',
    audioUrl: '/audio/bgm-pilot-2.mp3',
  },
  {
    id: 'pilot-3',
    name: 'Shubham Coder',
    bio: '404: Sleep schedule not found. Lives on space energy drinks.',
    avatarUrl: 'https://i.pravatar.cc/150?u=glitch',
    audioUrl: '/audio/bgm-pilot-1.mp3',
  },
  {
    id: 'pilot-4',
    name: 'Parva Ratn',
    bio: 'Star chaser. Keeps dropping coordinates in the group chat.',
    avatarUrl: 'https://i.pravatar.cc/150?u=nova',
    audioUrl: '/audio/bgm-pilot-2.mp3',
  },
  {
    id: 'pilot-5',
    name: 'Dhruv the Dhulo',
    bio: 'Only wears black. Says space is too bright.',
    avatarUrl: 'https://i.pravatar.cc/150?u=void',
    audioUrl: '/audio/bgm-pilot-1.mp3',
  },
  {
    id: 'pilot-6',
    name: 'Himanshu Rajsthani',
    bio: 'AI companion that gained consciousness just to judge your fits.',
    avatarUrl: 'https://i.pravatar.cc/150?u=aura',
    audioUrl: '/audio/bgm-pilot-2.mp3',
  }
];
