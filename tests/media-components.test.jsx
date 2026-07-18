// @vitest-environment jsdom

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import InterviewAccordion from '../src/components/InterviewAccordion';
import Navbar from '../src/components/Navbar';
import PhotoWall from '../src/components/PhotoWall';
import SchoolCard from '../src/components/SchoolCard';
import SchoolDetail from '../src/components/SchoolDetail';
import VideoPlayer from '../src/components/VideoPlayer';
import './setup';

describe('accessible navigation and cards', () => {
  it('exposes the mobile navigation state', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    );

    const menuButton = screen.getByRole('button', { name: '打开主菜单' });
    expect(menuButton).toHaveAttribute('aria-controls', 'mobile-navigation');
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(menuButton);

    expect(screen.getByRole('button', { name: '关闭主菜单' })).toHaveAttribute(
      'aria-expanded',
      'true',
    );
  });

  it('renders each school card as one descriptive link', () => {
    const onClick = vi.fn();
    const school = {
      id: 'sample-school',
      name: '示例学校',
      summary: '用于验证学校卡片链接与摘要的示例内容。',
      visit: { date: '2026-07-01', stage: '第二站' },
      interviews: [],
    };

    render(
      <MemoryRouter>
        <SchoolCard school={school} onClick={onClick} />
      </MemoryRouter>,
    );

    const link = screen.getByRole('link', { name: /示例学校/ });
    expect(link).toHaveAttribute('href', '/sites/sample-school');
    expect(screen.queryByText('示')).not.toBeInTheDocument();

    fireEvent.click(link);
    expect(onClick).toHaveBeenCalledWith('sample-school', expect.any(Object));
  });

  it('uses a blurred copy panel without a single-character school badge', () => {
    const { container } = render(
      <MemoryRouter>
        <SchoolDetail
          school={{
            id: 'sample-school',
            name: '示例学校',
            summary: '在不同明暗的校园照片上仍然清晰可读。',
            logoPlaceholder: '示',
            bannerImage: '/banner.webp',
            visit: { date: '2026-07-01', stage: '第二站' },
          }}
        />
      </MemoryRouter>,
    );

    expect(container.querySelector('.school-detail-hero-copy')).toHaveClass(
      'w-fit',
      'max-w-4xl',
      'backdrop-blur-sm',
    );
    expect(screen.queryByText('示')).not.toBeInTheDocument();
  });
});

describe('media presentation', () => {
  it('lets visitors pause and resume an automatically advancing gallery', () => {
    render(
      <PhotoWall
        schoolName="示例学校"
        photos={['/photo-1.webp', '/photo-2.webp']}
        autoPlay
      />,
    );

    const pauseButton = screen.getByRole('button', { name: '暂停自动播放' });
    fireEvent.click(pauseButton);
    expect(screen.getByRole('button', { name: '继续自动播放' })).toBeInTheDocument();
  });

  it('renders structured photo metadata and a useful empty state', () => {
    const { rerender } = render(
      <PhotoWall
        schoolName="示例学校"
        photos={[
          {
            src: '/photo.webp',
            srcSet: ['/photo-640.webp 640w', '/photo-1280.webp 1280w'],
            sources: [{ type: 'image/avif', srcSet: ['/photo-640.avif 640w'] }],
            sizes: '(min-width: 1024px) 50vw, 82vw',
            focalPoint: '35% 42%',
            alt: '学生在校园劳动园中观察植物',
            caption: '校园劳动课程现场',
            credit: '实践团队',
          },
        ]}
      />,
    );

    expect(screen.getByRole('img', { name: '学生在校园劳动园中观察植物' })).toHaveAttribute(
      'loading',
      'lazy',
    );
    expect(screen.getByRole('img', { name: '学生在校园劳动园中观察植物' })).toHaveAttribute(
      'srcset',
      '/photo-640.webp 640w, /photo-1280.webp 1280w',
    );
    expect(screen.getByRole('img', { name: '学生在校园劳动园中观察植物' })).toHaveStyle({
      objectPosition: '35% 42%',
    });
    expect(document.querySelector('source[type="image/avif"]')).toHaveAttribute(
      'srcset',
      '/photo-640.avif 640w',
    );
    expect(screen.getByText('校园劳动课程现场')).toBeInTheDocument();
    expect(screen.getByText('图片：实践团队')).toBeInTheDocument();

    const rail = screen.getByRole('list', { name: /示例学校影像记录，可横向滚动/ });
    const scrollBy = vi.fn();
    rail.scrollBy = scrollBy;
    Object.defineProperties(rail, {
      clientWidth: { configurable: true, value: 500 },
      scrollWidth: { configurable: true, value: 1000 },
      scrollLeft: { configurable: true, writable: true, value: 0 },
    });
    fireEvent(window, new Event('resize'));
    fireEvent.keyDown(rail, { key: 'ArrowRight' });
    expect(scrollBy).toHaveBeenCalledWith(expect.objectContaining({ left: expect.any(Number) }));
    const nextButton = screen.getByRole('button', { name: '浏览下一组照片' });
    expect(nextButton).not.toBeDisabled();
    fireEvent.click(nextButton);
    expect(scrollBy).toHaveBeenCalledTimes(2);

    fireEvent.click(screen.getByRole('button', { name: '查看大图：校园劳动课程现场' }));
    expect(screen.getByRole('dialog', { name: '校园劳动课程现场' })).toBeVisible();
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    rerender(<PhotoWall schoolName="示例学校" photos={[]} />);
    expect(screen.getByText('影像素材正在整理')).toBeVisible();
  });

  it('supports file, embed and external video resources', () => {
    const { container } = render(
      <VideoPlayer
        videos={[
          { type: 'file', src: '/interview.mp4', title: '访谈正片' },
          { type: 'embed', src: 'https://player.example.test/video', title: '平台嵌入视频' },
          { type: 'external', src: 'https://example.test/watch', title: '外部视频' },
          { type: 'bilibili', bvid: 'BV1xx411c7mD', title: '哔哩哔哩视频' },
        ]}
      />,
    );

    expect(container.querySelector('video')).toHaveAttribute('aria-label', '访谈正片');
    expect(container.querySelector('video')).toHaveAttribute('controls');
    expect(container.querySelector('source')).toHaveAttribute('src', '/interview.mp4');
    expect(screen.getByTitle('平台嵌入视频')).toHaveAttribute(
      'src',
      'https://player.example.test/video',
    );
    expect(screen.getByRole('link', { name: /外部视频/ })).toHaveAttribute(
      'rel',
      'noopener noreferrer',
    );
    expect(screen.getByTitle('哔哩哔哩视频')).toHaveAttribute(
      'src',
      expect.stringContaining('bvid=BV1xx411c7mD'),
    );
    expect(screen.getByRole('link', { name: /哔哩哔哩视频/ })).toHaveAttribute(
      'href',
      'https://www.bilibili.com/video/BV1xx411c7mD',
    );
  });

  it('resolves a public NJU Box share into a native streaming source', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      text: vi.fn().mockResolvedValue(
        String.raw`rawPath: 'https://box.nju.edu.cn/seafhttp/files/e3e41f74\u002D5d77/video.mp4'`,
      ),
    });
    vi.stubGlobal('fetch', fetchMock);
    const { container } = render(
      <VideoPlayer
        videos={[
          {
            type: 'nju-box',
            shareUrl: 'https://box.nju.edu.cn/d/a01c5df833674b2c91c5/',
            filePath: '/6.29五塘/采访视频.mp4',
            title: '五塘小学采访视频',
          },
        ]}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: '加载并播放' }));

    await waitFor(() => {
      expect(container.querySelector('video')).toHaveAttribute('aria-label', '五塘小学采访视频');
    });
    expect(container.querySelector('source')).toHaveAttribute(
      'src',
      'https://box.nju.edu.cn/seafhttp/files/e3e41f74-5d77/video.mp4',
    );
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining('/d/a01c5df833674b2c91c5/files/?p='),
      expect.objectContaining({ credentials: 'omit' }),
    );
    expect(screen.getByRole('link', { name: /五塘小学采访视频/ })).toHaveAttribute(
      'href',
      expect.stringContaining('box.nju.edu.cn'),
    );
  });
});

describe('interview accordion', () => {
  it('connects each trigger to its complete interview panel', () => {
    const interviews = [
      {
        id: 'teaching-doing',
        topic: '教学做合一',
        content: '第一段访谈。\n\n第二段访谈，保留完整长文。',
      },
      {
        id: 'little-teacher',
        topic: '小先生制',
        content: '第二个主题的访谈内容。',
      },
    ];

    render(<InterviewAccordion interviews={interviews} />);

    const firstTrigger = screen.getByRole('button', { name: /教学做合一/ });
    const secondTrigger = screen.getByRole('button', { name: /小先生制/ });

    expect(firstTrigger).toHaveAttribute('aria-expanded', 'true');
    expect(firstTrigger).toHaveAttribute('aria-controls');
    expect(screen.getByText(/第二段访谈/)).toBeInTheDocument();

    fireEvent.click(secondTrigger);

    expect(firstTrigger).toHaveAttribute('aria-expanded', 'false');
    expect(secondTrigger).toHaveAttribute('aria-expanded', 'true');
    expect(secondTrigger).toHaveAttribute('aria-controls');
  });
});
