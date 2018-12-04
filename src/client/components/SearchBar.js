import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import theme from '../helpers/styledComponentsConfig';

class SearchBar extends React.Component {
  static propTypes = {
    className: PropTypes.string.isRequired,
    onInput: PropTypes.func.isRequired,
  }

  constructor() {
    super();
    this.state = {
      isHidden: false,
    };

    // Document is undefined in SSR
    this.document = typeof window !== 'undefined' ? window : 0;
    this.prevScrollTop = 0;
    this.shouldHide = this.shouldHide.bind(this);
  }

  componentDidMount() {
    // Only check every 250ms, instead of on each scroll event
    this.interval = setInterval(this.shouldHide, 250);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  shouldHide = () => {
    // Must scroll more than 5px
    if (Math.abs(this.prevScrollTop - this.document.scrollY) <= 5) return;

    // Hide searchbar if they scrolled past it, downwards
    const isHidden = this.document.scrollY > this.prevScrollTop && this.document.scrollY > 50;
    this.setState((prevState) => {
      if (prevState.isHidden !== isHidden) {
        return { isHidden };
      }
      return {};
    });

    this.prevScrollTop = this.document.scrollY;
  }

  render() {
    const { isHidden } = this.state;
    const { className, onInput } = this.props;
    return (
      <input
        type="text"
        className={`${className} ${isHidden ? 'hide' : ''}`}
        onChange={e => onInput(e.target.value)}
        placeholder="Search galleries"
      />
    );
  }
}

const StyledSearchBar = styled(SearchBar)`
  box-shadow: ${props => props.theme.boxShadow};
  color: ${props => props.theme.color};
  box-sizing: border-box;
  background-color: #fbeed7;
  border: none;
  border-radius: 8px;
  font-size: 1.6rem;
  padding-left: 1rem;
  margin: 1rem 0;
  height: 5rem;
  transition: top 0.2s ease-in-out;
  z-index: 1;
  position: fixed;
  top: 0;
  left: 1.2rem;
  width: calc(100% - 2.4rem);

  &.hide {
    top: -6rem;
  }

  :focus {
    outline: none;
  }

  ::placeholder {
    color: rgba(0, 0, 0, 0.38);
  }
`;

StyledSearchBar.defaultProps = {
  theme: {
    boxShadow: theme.boxShadow,
    color: theme.color,
  },
};

export default StyledSearchBar;
