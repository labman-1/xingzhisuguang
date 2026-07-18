import Hero from '../components/Hero';
import PhotoWall from '../components/PhotoWall';
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
  const galleryHighlights = sites.flatMap((site) => {
    const gallery = Array.isArray(site.gallery) ? site.gallery : [];
    const landscapePhotos = gallery.filter((photo) => !photo.width || !photo.height || photo.width >= photo.height);
    const selected = landscapePhotos.slice(0, 2);

    return selected.map((photo) => ({
      ...photo,
      id: `home-${site.id}-${photo.id}`,
      caption: `${site.name} · ${photo.caption || '实践影像'}`,
    }));
  });

  return (
    <>
      <Hero
        profile={profile}
        ideas={publishedIdeas}
        project={projectProfile}
        siteCount={sites.length}
        practiceYear={practiceYear}
      />
      <PhotoWall
        id="practice-gallery"
        className="mx-auto w-full max-w-7xl scroll-mt-24 px-4 py-16 sm:px-6 md:py-24"
        photos={galleryHighlights}
        schoolName="六个实践点"
        eyebrow="田野影像"
        title="实践影像长卷"
        description="精选六个实践点的校园与走访记录；画面会自动向左流动，也可手动切换。"
        autoPlay
        showCredit={false}
      />
      <SchoolList schools={sites} />
    </>
  );
}
