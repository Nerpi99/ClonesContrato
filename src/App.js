import * as React from "react";
import './App.css';
// Router-dom
import Layout from "./layout/Layout"
import { Routes, Route } from 'react-router-dom';
// Pages
import Home from './pages/Public/Home';
import Admin from './pages/Private/Admin/Admin';
import RequireAdminAuth from './pages/Private/Admin/RequireAdminAuth';
import UserTokens from "./pages/Public/UserTokens";
import RequireTokenAuth from "./pages/Private/TokenAdministrator/RequireTokenAuth";
import TokenAdministrator from "./pages/Private/TokenAdministrator/TokenAdministrator";
import Landing from './pages/Public/Landing';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        
        <Route element={<RequireAdminAuth />}>
          <Route path="admin" element={<Admin />} />
        </Route>
        <Route path="my-tokens" element={<UserTokens />} />
        <Route element={<RequireTokenAuth />}>
          <Route path="token/:tokenId" element={<TokenAdministrator />} />
        </Route>
        <Route path="landing" element={<Landing />} />
        <Route path="*" element={<><h1>404</h1><h3>Not found</h3></>} />
      </Route>
    </Routes>

  );
}

export default App;
