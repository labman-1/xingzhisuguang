import { matchPath, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import AboutPage from './components/AboutPage';
import Footer from './components/Footer';
import { getSiteById, projectProfile } from './content';
import useRoutePresentation from './hooks/useRoutePresentation';
import HeritagePage from './pages/HeritagePage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import ResourcesPage from './pages/ResourcesPage';
import SiteDetailPage from './pages/SiteDetailPage';

const routeMetadata = {
  home: {
    title: '行知溯光 · 人物志及成果展示',
    description: '追寻陶行知教育思想的当代足迹，呈现六个实践点的调研记录。',
  },
  heritage: {
    title: '行知精神与书院传承 · 行知溯光',
    description: '了解陶行知人物、生活教育理念与经核验的书院传承资料。',
  },
  resources: {
    title: '实践成果资源 · 行知溯光',
    description: '浏览行知溯光社会实践团队经核验发布的图文、视频与访谈成果。',
  },
  about: {
    title: '关于我们 · 行知溯光',
    description: '了解南京大学行知溯光社会实践团队的使命、分工与实践日程。',
  },
  notFound: {
    title: '页面未找到 · 行知溯光',
    description: '请求的页面不存在。',
  },
};

function resolveMetadata(pathname) {
  if (pathname === '/') return routeMetadata.home;
  if (pathname === '/heritage') return routeMetadata.heritage;
  if (pathname === '/resources') return routeMetadata.resources;
  if (pathname === '/about') return routeMetadata.about;

  const siteMatch = matchPath({ path: '/sites/:siteId', end: true }, pathname);
  if (siteMatch) {
    const site = getSiteById(siteMatch.params.siteId);
    return site
      ? {
          title: `${site.name} · 实践足迹 · 行知溯光`,
          description: site.summary,
        }
      : {
          title: '实践点未找到 · 行知溯光',
          description: '请求的实践点不存在或链接已经失效。',
        };
  }

  return routeMetadata.notFound;
}

export default function App() {
  const location = useLocation();
  useRoutePresentation(resolveMetadata(location.pathname));

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main id="main-content" tabIndex={-1} className="flex-grow focus:outline-none">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sites/:siteId" element={<SiteDetailPage />} />
          <Route path="/heritage" element={<HeritagePage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer project={projectProfile} />
    </div>
  );
}
