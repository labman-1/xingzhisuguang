import { Link, useParams } from 'react-router-dom';
import SchoolDetail from '../components/SchoolDetail';
import { getSiteById } from '../content';

export default function SiteDetailPage() {
  const { siteId } = useParams();
  const site = getSiteById(siteId);

  if (site) return <SchoolDetail school={site} />;

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-center">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-12">
        <h1 data-page-heading tabIndex={-1} className="text-2xl font-bold text-slate-800 mb-3 focus:outline-none">
          未找到实践点
        </h1>
        <p className="text-sm text-slate-500 mb-6">该实践点不存在，或链接已经失效。</p>
        <Link to="/#school-list" className="inline-flex text-sm font-medium text-white bg-emerald-700 hover:bg-emerald-800 px-6 py-3 rounded-xl">
          返回实践足迹
        </Link>
      </div>
    </div>
  );
}
