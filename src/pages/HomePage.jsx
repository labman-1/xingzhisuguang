import Hero from '../components/Hero';
import SchoolList from '../components/SchoolList';
import {
  getVisibleEducationalIdeas,
  getVisibleProfiles,
  getVisiblePracticeSites,
  projectProfile,
} from '../content';

export default function HomePage() {
  const profile = getVisibleProfiles()[0];
  const publishedIdeas = getVisibleEducationalIdeas();
  const sites = getVisiblePracticeSites();
  const practiceYear = sites[0]?.visit?.date?.slice(0, 4);

  return (
    <>
      <Hero
        profile={profile}
        ideas={publishedIdeas}
        project={projectProfile}
        siteCount={sites.length}
        practiceYear={practiceYear}
      />
      <SchoolList schools={sites} />
    </>
  );
}
