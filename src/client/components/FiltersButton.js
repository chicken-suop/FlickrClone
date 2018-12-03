import React from 'react';
import styled from 'styled-components';

const OnClickContainer = styled.div`
  width: 5rem;
  height: 5rem;
  padding: .4rem;
  position: fixed;
  right: ${props => props.right};
  top: 50vh;
  z-index: 2;
`;

const Main = styled.div`
  width: 3.4rem;
  height: 3.4rem;
  border: 0.6rem solid ${props => props.colour};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Inner = styled.div`
  width: 2.8rem;
  height: 2.8rem;
  background: ${props => props.colour};
  border-radius: 50%;
`;

export default ({ handleClick, move }) => (
  <OnClickContainer right={move ? 'calc(100% - 2.9rem)' : '-2.9rem'} onClick={handleClick}>
    <Main colour={move ? '#ff7657' : '#665c84'}>
      <Inner colour={move ? '#ff7657' : '#665c84'} />
    </Main>
  </OnClickContainer>
);
