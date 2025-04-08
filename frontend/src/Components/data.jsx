import { FaYoutube,FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';

export const links = [
  {
    id: 1,
    url: '/',
    text: 'home',
  },
  {
    id: 2,
    url: '/about',
    text: 'about',
  },
  {
    id: 3,
    url: '/contact',
    text: 'contact',
  },
];
export const social = [
  {
    id: 1,
    url: 'https://in.linkedin.com/in/achuth-kumar-r-716992181',
    icon: <FaLinkedin />,
  },
  {
    id: 2,
    url: 'https://www.youtube.com/@achuthkumar9959',
    icon: <FaYoutube />,
    
  },
  {
    id: 3,
    url: 'https://x.com/AchuthKumar11',
    icon: <FaTwitter />,
  },
  {
    id: 4,
    url: 'https://www.instagram.com/achuthkr/',
    icon: <FaInstagram />,
  },
];