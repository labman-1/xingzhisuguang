// @vitest-environment jsdom

import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import InterviewAccordion from '../src/components/InterviewAccordion';
import Navbar from '../src/components/Navbar';
import PhotoWall from '../src/components/PhotoWall';
import SchoolCard from '../src/components/SchoolCard';
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

    fireEvent.click(link);
    expect(onClick).toHaveBeenCalledWith('sample-school', expect.any(Object));
  });
});

describe('media presentation', () => {
  it('renders structured photo metadata and a useful empty state', () => {
    const { rerender } = render(
      <PhotoWall
        schoolName="示例学校"
        photos={[
          {
            src: '/photo.webp',
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
    expect(screen.getByText('校园劳动课程现场')).toBeInTheDocument();
    expect(screen.getByText('摄影：实践团队')).toBeInTheDocument();

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
