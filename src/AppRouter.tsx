import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/shared/Layout";
import Dashboard from "./pages/Dashboard";
import Reports from "./pages/Reports";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="reports" element={<Reports />} />
          <Route
            path=":any"
            element={
              <div className="w-full h-full flex justify-center items-center text-xl font-semibold">
                Not found
              </div>
            }
          ></Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
