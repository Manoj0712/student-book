import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/layout/NavBar";
import EditorPage from "./pages/EditorPage";
import ReaderPage from "./pages/ReaderPage";

export default function App() {
  return (
    <BrowserRouter>
      <div className="h-screen flex flex-col overflow-hidden">
        <NavBar />
        <Routes>
          <Route path="/" element={<Navigate to="/editor" replace />} />
          <Route path="/editor" element={<EditorPage />} />
          <Route path="/reader" element={<ReaderPage />} />
          <Route path="*" element={<Navigate to="/editor" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
