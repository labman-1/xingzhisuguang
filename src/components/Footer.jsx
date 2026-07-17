import { Link } from 'react-router-dom';

const footerLinks = [
  { label: '首页人物志', to: '/' },
  { label: '实践足迹', to: '/#school-list' },
  { label: '行知文脉', to: '/heritage' },
  { label: '成果资源', to: '/resources' },
  { label: '关于我们', to: '/about' },
];

const defaultProject = {
  name: '行知溯光',
  organization: '南京大学“行知溯光”社会实践团队',
  mission: '循行知足迹，溯教育之光。以田野走访、口述访谈与数字影像，记录陶行知教育思想在当代校园的传承与创新。',
};

export default function Footer({ project = defaultProject }) {
  const name = project?.name || defaultProject.name;
  const organization = project?.organization || defaultProject.organization;
  const mission = project?.mission || project?.summary || defaultProject.mission;

  return (
    <footer className="border-t border-emerald-950 bg-emerald-950 text-emerald-100">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.2fr_1fr] md:items-start">
        <div className="max-w-xl">
          <Link to="/" className="inline-flex items-center gap-3 rounded-lg text-white hover:text-amber-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-400 text-sm font-black text-emerald-950" aria-hidden="true">溯</span>
            <span className="text-xl font-black">{name}</span>
          </Link>
          <p className="mt-5 text-sm leading-7 text-emerald-100">
            {mission}
          </p>
          <p className="mt-4 text-sm font-semibold text-emerald-300">{organization}</p>
        </div>

        <nav aria-label="页脚导航" className="md:justify-self-end">
          <h2 className="text-sm font-bold tracking-wider text-white">快速访问</h2>
          <ul className="mt-4 grid grid-cols-2 gap-x-8 gap-y-3 text-sm sm:grid-cols-3 md:grid-cols-2">
            {footerLinks.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="inline-flex min-h-10 items-center rounded text-emerald-100 transition-colors hover:text-amber-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-emerald-900">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-xs text-emerald-200 sm:px-6 md:flex-row md:items-center md:justify-between">
          <small>© 2026 {organization}</small>
          <p>数字化成果交互展示 · 内容持续更新</p>
        </div>
      </div>
    </footer>
  );
}
