import { useState } from 'react';
import GalleryRegionToggle from '../components/GalleryRegionToggle';
import Hero from '../components/Hero';
import PhotoWall from '../components/PhotoWall';
import SchoolList from '../components/SchoolList';
import {
  getVisibleEducationalIdeas,
  getVisibleProfiles,
  getVisiblePracticeSites,
  projectProfile,
  REGION,
} from '../content';

const GALLERY_META = {
  [REGION.NANJING]: {
    eyebrow: '金陵影像',
    schoolName: '南京市内六个实践点',
    description: '精选南京市内六个实践点的校园与走访记录；画面会自动向左流动，也可手动切换。',
  },
  [REGION.NATIONAL]: {
    eyebrow: '乡土影像',
    schoolName: '南京市外六个实践点',
    description: '精选南京市外六个实践点的校园与走访记录；画面会自动向左流动，也可手动切换。',
  },
};

function getGalleryPhotos(sites, region) {
  return sites
    .filter((site) => site.region === region)
    .flatMap((site) => {
      const gallery = Array.isArray(site.gallery) ? site.gallery : [];
      return gallery
        .filter((photo) => !photo.width || !photo.height || photo.width >= photo.height)
        .slice(0, 2)
        .map((photo) => ({
          ...photo,
          id: `home-${site.id}-${photo.id}`,
          caption: `${site.name} · ${photo.caption || '实践影像'}`,
        }));
    });
}

export default function HomePage() {
  const [activeGalleryRegion, setActiveGalleryRegion] = useState(REGION.NANJING);
  const profile = getVisibleProfiles()[0];
  const publishedIdeas = getVisibleEducationalIdeas();
  const sites = getVisiblePracticeSites();
  const practiceYear = sites[0]?.visit?.date?.slice(0, 4);
  const galleryPhotos = getGalleryPhotos(sites, activeGalleryRegion);
  const galleryMeta = GALLERY_META[activeGalleryRegion];

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
        photos={galleryPhotos}
        schoolName={galleryMeta.schoolName}
        eyebrow={galleryMeta.eyebrow}
        title="实践影像长卷"
        description={galleryMeta.description}
        autoPlay
        showCredit={false}
        collectionKey={activeGalleryRegion}
        groupSelector={(
          <GalleryRegionToggle
            activeRegion={activeGalleryRegion}
            onChange={setActiveGalleryRegion}
          />
        )}
      />
      <SchoolList />
    </>
  );
}
