import * as React from "react";
import { Route, Routes, Link } from "react-router-dom";
import { Footer } from "@kodebi/libkodebi-ui";
import { AnimatePresence } from "framer-motion";

import { Loading, Navbar, ScrollToTop } from "./components";
import { footerLinks, footerIcons } from "./utils/linksDB";

// React.lazy imports
const Discover = React.lazy(() => import("./pages/Discover"));
const UserProfile = React.lazy(() => import("./pages/UserProfile"));
const MyDashboard = React.lazy(() => import("./pages/MyDashboard"));
const Messages = React.lazy(() => import("./pages/Messages"));
const BookDetails = React.lazy(() => import("./pages/BookDetails"));
const UploadBook = React.lazy(() => import("./pages/UploadBook"));
const DataPrivacy = React.lazy(() => import("./pages/DataPrivacy"));
const Imprint = React.lazy(() => import("./pages/Imprint"));
const Error = React.lazy(() => import("./pages/Error"));

const AuthApp: React.FC = (): JSX.Element => {
  return (
    <React.Suspense fallback={<Loading />}>
      <Navbar />
      <ScrollToTop />
      <AnimatePresence initial={false} exitBeforeEnter>
        <Routes>
          <Route path="/" element={<Discover />} />
          <Route path="/dashboard" element={<MyDashboard />} />
          <Route path="/profile/:id" element={<UserProfile />} />
          <Route path="/uploadbook" element={<UploadBook />} />
          <Route path="/book/:id" element={<BookDetails />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/imprint" element={<Imprint />} />
          <Route path="/dataprivacy" element={<DataPrivacy />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </AnimatePresence>
      <Footer element={Link} links={footerLinks} icons={footerIcons} />
    </React.Suspense>
  );
};

export default AuthApp;
