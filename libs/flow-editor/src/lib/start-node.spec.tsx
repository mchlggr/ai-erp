import { render } from '@testing-library/react';

import StartNode from './start-node';

describe('StartNode', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<StartNode />);
    expect(baseElement).toBeTruthy();
  });
});
