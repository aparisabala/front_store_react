
import Header from './../../Components/Header';
import Announcement from './../../Components/Announcement';
import Recomended from './../../Components/Recomended';
import RecomendedOther from './../../Components/RecomendedOther';
import DatingZone from './../../Components/DatingZone';
const renderHome = [
  {
    Component: Header,
    query: 'getdata/gettoppic?channel=h001',
    classNames: 'mySwiper'
  },
  {
    Component: Announcement,
    query: 'data/getannounce?channel=h001'
  },
  {
    Component: Recomended,
    query: 'getdata/gettypeproducts?pid=13&page=1&limit=80&channel=h001'
  },
  {
    Component: RecomendedOther,
    query: 'getdata/gettypeproducts?pid=23&page=1&limit=50&channel=h001'
  },
  {
    Component: DatingZone,
    query: 'getdata/gettypeproducts?pid=14&page=1&limit=50&channel=h001'
  }
];

export default renderHome;
