import { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import routersConfig from './routersConfig';
import '../index.css';

const AppRoutes = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {Object.values(routersConfig).map(
            ({ path, component: Component }) => (
              <Route key={path} path={path} element={<Component />} />
            )
          )}
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRoutes;
