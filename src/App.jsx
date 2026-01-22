import './App.css'
import { Routes, Route } from 'react-router-dom';
import HomePage from './app/Pages/HomePage';
import FooterMenu from './app/Components/FooterMenu';
import renderHome from './app/Lib/render/renderHome';
import renderPageTwo from './app/Lib/render/renderPageTwo';
import renderPageThree from './app/Lib/render/renderPageThree';
import renderPageFour from './app/Lib/render/renderPageFour';
import renderPageFive from './app/Lib/render/renderPageFive';
import PageDetails from './app/Pages/PageDetails';
function App() {
  return (
    <>
    <Routes>
        <Route path="/" element={<HomePage components={renderHome} />} title=""/>
        <Route path="/videos" element={<HomePage components={renderPageTwo} title="看片利器"/>} />
        <Route path="/brothel" element={<HomePage components={renderPageThree} title="青楼"/>} />
        <Route path="/live" element={<HomePage components={renderPageFour}  title="色情直播"/>} />
        <Route path="/make-money" element={<HomePage components={renderPageFive}  title="赚钱"/>}/>
        <Route path="/app-details/:id" element={<PageDetails/>} />
    </Routes>
    <FooterMenu />
    </>
  )
}

export default App
