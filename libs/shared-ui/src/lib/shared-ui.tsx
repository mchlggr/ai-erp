import styled from 'tailwind';

const StyledSharedUi = styled.div`
  color: pink;
`;

export function SharedUi() {
  return (
    <StyledSharedUi>
      <h1>Welcome to SharedUi!</h1>
    </StyledSharedUi>
  );
}

export default SharedUi;
