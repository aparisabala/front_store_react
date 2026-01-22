
import Header from './../../Components/Header';
import Announcement from './../../Components/Announcement';
import Recomended from './../../Components/Recomended';
import RecomendedOther from './../../Components/RecomendedOther';
import DatingZone from './../../Components/DatingZone';
const renderHome = [
  {
    Component: Header,
    query: 'getdata/getSlider&channel=h001',
    classNames: 'mySwiper'
  },
  {
    Component: Announcement,
    query: 'getdata/getAnnouncement'
  },
  {
    Component: Recomended,
    query: 'getdata/getProducts?pid=13&page=1&limit=80&channel=h001'
  },
  {
    Component: RecomendedOther,
    query: 'getdata/getProducts?pid=23&page=1&limit=50&channel=h001'
  },
  {
    Component: DatingZone,
    query: 'getdata/getProducts?pid=14&page=1&limit=50&channel=h001'
  }
];

export default renderHome;
