import { render } from '@testing-library/react';

import MermaidFlow from './mermaid-flow';

describe('MermaidFlow', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MermaidFlow />);
    expect(baseElement).toBeTruthy();
  });
});
