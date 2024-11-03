import { render } from '@testing-library/react';

import FlowChat from './flow-chat';

describe('FlowChat', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FlowChat />);
    expect(baseElement).toBeTruthy();
  });
});
