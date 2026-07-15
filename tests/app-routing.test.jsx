// @vitest-environment jsdom

import { render, screen, waitFor } from '@testing-library/react';
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
  it('renders the home page and its six public practice sites', async () => {
    renderRoute('/');

    expect(
      screen.getByRole('heading', { level: 1, name: /追寻陶行知教育思想的当代足迹/ }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: /查看详情/ })).toHaveLength(6);

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

  it('renders and focuses a valid site detail without exposing draft child entries', async () => {
    renderRoute('/sites/yanziyou');

    const heading = screen.getByRole('heading', { level: 1, name: '燕子矶幼儿园' });
    expect(heading).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: '三力课程体系' })).not.toBeInTheDocument();
    expect(
      screen.queryByRole('heading', { name: /三力课程与小先生制访谈/ }),
    ).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: '开场白' })).not.toBeInTheDocument();
    expect(screen.queryByText(/^（访谈内容待补充）/)).not.toBeInTheDocument();
    await waitFor(() => expect(heading).toHaveFocus());
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
    ['/resources', '实践成果资源'],
    ['/about', '行知溯光 · 团队介绍'],
  ])('renders the %s section', (route, heading) => {
    renderRoute(route);

    expect(screen.getByRole('heading', { level: 1, name: heading })).toBeInTheDocument();
  });

  it('routes all other paths to the site-level 404 page', () => {
    renderRoute('/unknown-path');

    expect(screen.getByRole('heading', { level: 1, name: '页面未找到' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '返回首页' })).toHaveAttribute('href', '/');
  });
});
