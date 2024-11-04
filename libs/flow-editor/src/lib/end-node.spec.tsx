import { render } from '@testing-library/react';

import EndNode from './end-node';

describe('EndNode', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<EndNode />);
    expect(baseElement).toBeTruthy();
  });
});
