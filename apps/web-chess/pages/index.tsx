import styled from 'styled-components';

const StyledPage = styled.div`
  .page {
  }
`;

export function Index() {
  return (
    <StyledPage>
      <div>
        <div>
          <h1>
            <span> Hello there, </span>
            Welcome web-chess 👋
          </h1>
        </div>
      </div>
    </StyledPage>
  );
}

export default Index;
