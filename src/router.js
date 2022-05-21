import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DashBoard from './pages/dashBoard';
import NotFound from './pages/notFound';
import Spend from './pages/spend';
import Category from './pages/category';
import TimeReport from './pages/timeReport';
import Test from './pages/test';

const MainRouter = () => {
  return (
    <div className=" w-screen h-screen m-0 p-0">
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path="/" element={<DashBoard />}></Route>
          <Route path="/dashBoard" element={<DashBoard />}></Route>
          <Route path="/spend" element={<Spend />}></Route>
          <Route path="/category" element={<Category />}></Route>
          <Route path="/report/weekly" element={<TimeReport />}></Route>
          <Route path="/report/monthly" element={<TimeReport />}></Route>
          <Route path="/test" element={<Test />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default MainRouter;
