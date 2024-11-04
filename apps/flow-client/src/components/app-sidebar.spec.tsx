import { render } from '@testing-library/react';

import AppSidebar from './app-sidebar';

describe('AppSidebar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AppSidebar />);
    expect(baseElement).toBeTruthy();
  });
});
