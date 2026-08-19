// @vitest-environment jsdom

import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import App from '../src/App';
import './setup';

function renderRoute(route) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <App />
    </MemoryRouter>,
  );
}

describe('application routes', () => {
  it('renders the home page with twelve public sites across two regional tabs', async () => {
    renderRoute('/');

    expect(
      screen.getByRole('heading', { level: 1, name: /追寻陶行知教育思想的当代足迹/ }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('img', { name: '陶行知先生身穿中式长衫、佩戴圆框眼镜的黑白纪念肖像' }),
    ).toBeVisible();
    expect(screen.queryByText(/历史影像待授权后发布/)).not.toBeInTheDocument();
    expect(document.querySelector('section[data-has-hero-image="true"] img')).not.toBeNull();
    expect(screen.getAllByRole('link', { name: /查看详情/ })).toHaveLength(6);
    expect(screen.getByText(/12 个实践点/)).toBeInTheDocument();

    await waitFor(() => {
      expect(document.title).toBe('行知溯光 · 人物志及成果展示');
    });
  });

  it('focuses and scrolls to a hash target through the shared route effect', async () => {
    renderRoute('/#school-list');

    const schoolList = document.getElementById('school-list');
    await waitFor(() => {
      expect(schoolList).toHaveFocus();
      expect(schoolList.scrollIntoView).toHaveBeenCalledWith({ block: 'start' });
    });
  });

  it('renders and focuses a media and interview practice-site detail', async () => {
    renderRoute('/sites/yanziyou');

    const heading = screen.getByRole('heading', { level: 1, name: '燕子矶幼儿园' });
    expect(heading).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: '三力课程体系' })).not.toBeInTheDocument();
    expect(
      screen.queryByRole('heading', { name: /三力课程与小先生制访谈/ }),
    ).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: '开场白' })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: '特色实践' })).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '采访记录' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '草莓大棚里，孩子们把生活变成课堂' })).toBeInTheDocument();
    expect(screen.getByText(/本文隐去私人姓名与可识别个人身份的细节/)).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: '相关资源' })).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '影像纪实' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '实践视频' })).toBeInTheDocument();
    await waitFor(() => expect(heading).toHaveFocus());
  });

  it('switches the home photo wall between Nanjing and national records', () => {
    renderRoute('/');

    const photoWall = document.getElementById('practice-gallery');
    const galleryTabs = within(photoWall).getByRole('tablist', { name: '实践影像区域' });
    expect(within(photoWall).getByText(/精选南京市内六个实践点/)).toBeInTheDocument();
    expect(within(photoWall).queryByText(/重庆育才中学 · 团队与校方合影/)).not.toBeInTheDocument();

    fireEvent.click(within(galleryTabs).getByRole('tab', { name: '万里溯光 · 乡土弘毅' }));

    expect(within(photoWall).getByText(/精选南京市外六个实践点/)).toBeInTheDocument();
    expect(within(photoWall).getByText('重庆育才中学 · 团队与校方合影')).toBeInTheDocument();
  });

  it('publishes the national interview pages with a graceful media fallback', () => {
    renderRoute('/sites/meizhou-dama');

    expect(screen.getByRole('heading', { level: 1, name: '梅州大麻中学' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '山歌、球场与一堂会呼吸的历史课' })).toBeInTheDocument();
    expect(screen.getByText(/教育的起点是生活/)).toBeInTheDocument();
  });

  it('renders a local not-found state for an unknown site id', () => {
    renderRoute('/sites/not-a-real-site');

    expect(
      screen.getByRole('heading', { level: 1, name: '未找到实践点' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '返回实践足迹' })).toHaveAttribute(
      'href',
      '/#school-list',
    );
  });

  it.each([
    ['/heritage', '行知精神与书院传承'],
    ['/resources', '实践成果'],
    ['/about', '行知溯光 · 团队介绍'],
  ])('renders the %s section', (route, heading) => {
    renderRoute(route);

    expect(screen.getByRole('heading', { level: 1, name: heading })).toBeInTheDocument();
  });

  it('presents one achievement article with two publication links', () => {
    renderRoute('/resources');

    expect(
      screen.getAllByRole('heading', {
        name: '“行知溯光”实践团队专访南京六所学校：感悟行知思想育人价值',
      }),
    ).toHaveLength(1);
    expect(screen.getByRole('link', { name: /南京大学行知书院阅读原文/ })).toHaveAttribute(
      'href',
      'https://mp.weixin.qq.com/s/FVp84MdVOXNof18m4NqTGA',
    );
    expect(screen.getByRole('link', { name: /南青实践阅读原文/ })).toHaveAttribute(
      'href',
      'https://mp.weixin.qq.com/s/njxxsisg7SdfS_yGTaCeBw',
    );
  });

  it('renders the previous cohort interviews as a sourced heritage timeline', () => {
    renderRoute('/heritage');

    expect(screen.getByRole('heading', { level: 2, name: '书院传承' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '专访晓庄小学亲历者张成和' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '专访陶行知后人陶侃' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: '晓庄小学亲历者张成和先生的访谈肖像' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: '陶行知后人陶侃先生接受访谈时的现场照片' })).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: /原文/ })).toHaveLength(2);
  });

  it('routes all other paths to the site-level 404 page', () => {
    renderRoute('/unknown-path');

    expect(screen.getByRole('heading', { level: 1, name: '页面未找到' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '返回首页' })).toHaveAttribute('href', '/');
  });
});
