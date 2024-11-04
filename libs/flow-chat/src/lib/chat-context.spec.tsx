import { render } from '@testing-library/react';

import ChatContext from './chat-context';

describe('ChatContext', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ChatContext />);
    expect(baseElement).toBeTruthy();
  });
});
