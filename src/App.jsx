import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Lawyer from "./pages/Lawyer";
import MainLayout from "./layout/MainLayout";
import Nutrition from "./pages/Nutrition";
import NotFoundPage from "./pages/NotFoundPage";
import Home from "./pages/Home";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/lawyer" element={<Lawyer />} />
          <Route path="/nutrition" element={<Nutrition />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
