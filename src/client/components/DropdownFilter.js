import React from 'react';
import styled from 'styled-components';
import { ChevronDown, ChevronUp } from 'react-feather';

const Main = styled.div`
  padding: .8rem;
  margin-bottom: 1.2rem;
  display: ${props => (props.fullWidth ? 'flex' : 'inline-flex')};
  flex-flow: column;
  justify-content: flex-start;
  align-items: flex-start;
  background: #ff7657;
  border-radius: 8px;
  margin-right: ${props => (props.withMarginRight ? '1.2rem' : '0')};
  font-size: 6rem;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 10px 40px;
`;

const HeaderContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const Text = styled.span`
  font-weight: 700;
  color: rgba(255, 255, 255, .87);
  margin-right: 1.2rem;
`;

const ChildrenContainer = styled.div`
  display: flex;
  flex-flow: ${props => (props.flowAsRow ? 'row' : 'column')};
  flex-wrap: wrap;
`;

export default class DropdownFilter extends React.Component {
  state = { isDown: false }

  toggleDropdown = () => {
    this.setState(prevState => ({ isDown: !prevState.isDown }));
  }

  render() {
    const {
      withMarginRight,
      text,
      activeChild,
      children,
      flowAsRow,
    } = this.props;
    const { isDown } = this.state;
    return (
      <Main withMarginRight={withMarginRight} fullWidth={isDown}>
        <HeaderContainer onClick={this.toggleDropdown}>
          <Text>
            {text}
          </Text>
          {isDown ? (
            <ChevronUp size={60} />
          ) : (
            <ChevronDown size={60} />
          )}
        </HeaderContainer>
        <ChildrenContainer flowAsRow={flowAsRow}>
          {!isDown && activeChild}
          {isDown && children}
        </ChildrenContainer>
      </Main>
    );
  }
}
