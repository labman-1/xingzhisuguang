export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-8 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-4 text-center">
        {/* Decorative line */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-px w-8 bg-emerald-700" />
          <span className="w-6 h-6 bg-emerald-800 text-emerald-300 rounded flex items-center justify-center text-xs font-bold">
            溯
          </span>
          <div className="h-px w-8 bg-emerald-700" />
        </div>

        <p className="text-sm font-medium text-slate-300">行知溯光</p>
        <p className="text-xs mt-1">© 2026 南京大学"行知溯光"社会实践团队</p>
        <p className="text-xs text-slate-600 mt-2">
          南京大学工科试验班 · 线上 / 线下兼报方向
        </p>

        <p className="text-xs text-slate-600 mt-4">
          循行知足迹，溯教育之光 · 数字化成果交互展示
        </p>
      </div>
    </footer>
  );
}
