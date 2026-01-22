
import Recomended from './../../Components/Recomended';
import RecomendedOther from './../../Components/RecomendedOther';
const renderPageFive = [
  {
    Component: Recomended,
    query: 'getdata/getProducts?pid=28&page=1&limit=50&channel=h001',
  },
  {
    Component: RecomendedOther,
    query: 'getdata/getProducts?pid=29&page=1&limit=50&channel=h001',
  }
];
export default renderPageFive;
