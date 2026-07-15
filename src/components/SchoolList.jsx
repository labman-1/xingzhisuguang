import { schools } from '../data/schools';
import SchoolCard from './SchoolCard';

export default function SchoolList({ onSchoolClick }) {
  return (
    <section id="school-list" className="max-w-6xl mx-auto px-4 py-16">
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="h-px w-6 bg-emerald-300" />
          <span className="text-emerald-600 text-sm font-semibold uppercase tracking-wider">
            实践足迹
          </span>
          <div className="h-px w-6 bg-emerald-300" />
        </div>
        <h2 className="section-heading">六所学校的行知回响</h2>
        <p className="section-subtitle max-w-2xl mx-auto">
          2026 年 6 月底至 7 月初，团队先后走访南京六所学校，从幼儿园到九年一贯制，
          从城市中心到晓庄故地，追寻陶行知教育思想在当代教育一线的生动实践。
        </p>
      </div>

      {/* Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {schools.map((school) => (
          <SchoolCard
            key={school.id}
            school={school}
            onClick={() => onSchoolClick(school.id)}
          />
        ))}
      </div>
    </section>
  );
}
