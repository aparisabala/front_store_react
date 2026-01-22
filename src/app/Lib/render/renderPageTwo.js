
import Recomended from './../../Components/Recomended';
import RecomendedOther from './../../Components/RecomendedOther';
const renderPageTwo = [
  {
    Component: Recomended,
    query: 'getdata/getProducts?pid=24&page=1&limit=80&channel=h001',
  },
   {
    Component: RecomendedOther,
    query: 'getdata/getProducts?pid=25&page=1&limit=50&channel=h001',
  }
];

export default renderPageTwo;
