import { Layout, Schedule } from "features";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/schedule" />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="*" element={<Navigate to="/schedule" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
