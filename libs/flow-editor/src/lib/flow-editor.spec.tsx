import { render } from '@testing-library/react';

import FlowEditor from './flow-editor';

describe('FlowEditor', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FlowEditor />);
    expect(baseElement).toBeTruthy();
  });
});
