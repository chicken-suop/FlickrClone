import React from 'react';
import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';

export default class BgImage extends React.Component {
  static propTypes = {
    windowHeightChanged: PropTypes.func.isRequired,
    getScrollPos: PropTypes.func.isRequired,
    bgImageHeightChanged: PropTypes.func.isRequired,
    minHeightChanged: PropTypes.func.isRequired,
    lowRes: PropTypes.string.isRequired,
    highRes: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
  }

  constructor(props) {
    super(props);
    this.height = '100vh';
    this.state = {
      minHeight: true,
      coverHeight: this.height,
    };
    const { windowHeightChanged, bgImageHeightChanged, minHeightChanged } = this.props;
    windowHeightChanged(this.height);
    bgImageHeightChanged(this.height);
    minHeightChanged(true);
    this.updateHeight = this.updateHeight.bind(this);
    this.updateCoverHeight = this.updateCoverHeight.bind(this);
  }

  componentDidMount() {
    this.updateHeight();
    window.addEventListener('resize', this.updateHeight);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {
      bgImageHeightChanged,
      minHeightChanged,
      lowRes,
      highRes,
      children,
    } = this.props;
    const { coverHeight, minHeight } = this.state;

    if (coverHeight !== nextState.coverHeight) {
      bgImageHeightChanged(nextState.coverHeight);
    }

    if (minHeight !== nextState.minHeight) {
      minHeightChanged(nextState.minHeight);
    }

    return lowRes !== nextProps.lowRes
      || highRes !== nextProps.highRes
      || children !== nextProps.children
      || coverHeight !== nextState.coverHeight
      || minHeight !== nextState.minHeight;
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateHeight);
  }

  updateHeight() {
    const { windowHeightChanged } = this.props;
    this.height = window.innerHeight;
    windowHeightChanged(this.height);
    this.updateCoverHeight();
  }

  updateCoverHeight() {
    const { getScrollPos } = this.props;
    // Make it smaller based on scroll position
    const coverHeight = this.height - getScrollPos();
    // Stop changing height when you reach minimum size
    if (coverHeight > (this.height * 0.6)) {
      this.setState((prevState) => {
        let diff = Math.abs(coverHeight);

        // Inital height is set to 100vh
        if (typeof prevState.coverHeight === 'number') {
          diff = Math.abs(prevState.coverHeight - coverHeight);
        }

        const retVal = { minHeight: false };

        // Don't update for every small change, only every 5px
        if (diff > 5) {
          retVal.coverHeight = coverHeight;
        }
        return retVal;
      });
    } else {
      this.setState({ minHeight: true });
    }
  }

  render() {
    const { coverHeight, minHeight } = this.state;
    const { lowRes, highRes } = this.props;

    return (
      <Container>
        <Inner heightToCover={coverHeight} minHeight={minHeight}>
          <Main
            lowRes={lowRes}
            highRes={highRes}
            minHeight={minHeight}
          />
        </Inner>
      </Container>
    );
  }
}


const Container = styled.div`
  background: #000;
`;

const Inner = styled.div`
  position: relative;
  height: ${(props => (typeof props.heightToCover === 'number'
    ? `${props.heightToCover}px`
    : props.heightToCover)
  )};
  transition: height 300ms ease-out;
  background: ${props => (props.minHeight ? 'rgba(0,0,0,0)' : 'rgba(0,0,0,1)')};
`;

const backgroundBlur = keyframes`
  90% {
    filter: blur(5px);
  }
  100% {
    filter: blur(0px);
  }
`;

const Main = styled.div`
  background-image: ${props => `url(${props.highRes}),url(${props.lowRes})`};
  background-position: center, center;
  background-size: cover, cover;
  background-repeat: no-repeat, no-repeat;
  animation: ${backgroundBlur} 500ms forwards;
  opacity: ${props => (props.minHeight ? 1 : 0.6)};
  transition: background 300ms ease-out, opacity 300ms ease-out 0.1s;
  position: absolute;
  top: 0;
  left: 0;
  min-width: 100%;
  min-height: 100%;
`;
