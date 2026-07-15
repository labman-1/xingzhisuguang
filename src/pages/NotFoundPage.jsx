import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-20 text-center">
      <p className="text-sm font-semibold text-emerald-600 mb-3">404</p>
      <h1 data-page-heading tabIndex={-1} className="text-3xl font-bold text-slate-900 mb-4 focus:outline-none">
        页面未找到
      </h1>
      <p className="text-slate-500 mb-8">请检查链接，或返回首页继续浏览。</p>
      <Link to="/" className="inline-flex text-sm font-medium text-white bg-emerald-700 hover:bg-emerald-800 px-6 py-3 rounded-xl">
        返回首页
      </Link>
    </div>
  );
}
