export interface PilotSocial {
  platform: 'github' | 'linkedin' | 'twitter' | string;
  url: string;
}

export interface Pilot {
  id: string;
  name: string;
  bio: string;
  avatarUrl: string;
  audioUrl: string;
  socials?: PilotSocial[];
}

export const TEAM: Pilot[] = [
  {
    id: 'pilot-1',
    name: 'Pratham Patel',
    bio: 'Chronically online space hacker. Defies gravity just for the aesthetic.',
    avatarUrl: 'https://github.com/pratham2008.png', // Uses your real GitHub photo
    audioUrl: '/audio/bgm-pilot-1.mp3',
    socials: [
      { platform: 'github', url: 'https://github.com/pratham2008' },
      { platform: 'linkedin', url: 'https://www.linkedin.com/in/pratham-patel-1605-path/' }
    ]
  },
  {
    id: 'pilot-2',
    name: 'Rajdeep Vala',
    bio: 'No cap, best pilot in the galaxy. Fr fr.',
    avatarUrl: 'https://github.com/rajdeep0510.png', // Uses your real GitHub photo
    audioUrl: '/audio/bgm-pilot-2.mp3',
    socials: [
      { platform: 'github', url: 'https://github.com/rajdeep0510' },
      { platform: 'linkedin', url: 'https://www.linkedin.com/in/rajdeepvala/' }
    ]
  },
  {
    id: 'pilot-3',
    name: 'Shubham Rathod',
    bio: '404: Sleep schedule not found. Lives on space energy drinks.',
    avatarUrl: '/shubham.png',
    audioUrl: '/audio/bgm-pilot-1.mp3',
    socials: [
      { platform: 'instagram', url: 'https://www.instagram.com/shubham_.1476' }
    ]
  },
  {
    id: 'pilot-4',
    name: 'Parva Ratanpara',
    bio: 'Star chaser. Keeps dropping coordinates in the group chat.',
    avatarUrl: '/parva.jpg',
    audioUrl: '/audio/bgm-pilot-2.mp3',
    socials: [
      { platform: 'instagram', url: 'https://www.instagram.com/parva_779' }
    ]
  },
  {
    id: 'pilot-5',
    name: 'Dhruv Prajapati',
    bio: 'Only wears black. Says space is too bright.',
    avatarUrl: '/dhruv.jpeg',
    audioUrl: '/audio/bgm-pilot-1.mp3',
    socials : [
      {platform: 'instagram', url: 'https://www.instagram.com/dhruvvv.1212'}
    ]
  },
  {
    id: 'pilot-6',
    name: 'Himanshu Prajapati',
    bio: 'AI companion that gained consciousness just to judge your fits.',
    avatarUrl: '/hiimandhu_prajapati.jpg',
    audioUrl: '/audio/bgm-pilot-2.mp3',
    socials : [
      {platform: 'instagram', url: 'https://www.instagram.com/himanxhu__04'}
    ]
  }
];
