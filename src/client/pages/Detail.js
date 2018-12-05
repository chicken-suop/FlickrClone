/* eslint no-underscore-dangle: 0 */

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import * as qs from 'query-string';
import theme from '../helpers/styledComponentsConfig';
import Feed from './Feed';
import { getDetail } from '../helpers/fetch';
import BgImage from '../components/BgImage';
import unixTimestampParse from '../helpers/unixTimestampParse';

export default class Detail extends React.Component {
  static propTypes = {
    preloadedData: PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.shape({}),
      PropTypes.arrayOf(PropTypes.shape({})),
    ])).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string,
        clearPreloadedData: PropTypes.bool,
      }),
    }).isRequired,
    location: PropTypes.PropTypes.shape({
      search: PropTypes.string,
    }).isRequired,
  }

  constructor(props) {
    super(props);
    let data = props.preloadedData;
    this.query = qs.parse(props.location.search);
    if (this.query.clearPreloadedData === 'true') {
      data = [{}, {}];
    }
    const [info, sizes] = data;
    this.state = {
      info,
      sizes,
    };
    this.updateComponent = this.updateComponent.bind(this);
    this.bgImage = React.createRef();
    this.feedRef = React.createRef();
    this.checkHeight = this.checkHeight.bind(this);
  }

  componentDidMount() {
    const { match } = this.props;
    this.updateComponent(match.params.id);

    // Set background color
    document.body.style.background = '#fbeed7';
  }

  componentDidUpdate(prevProps) {
    const { match } = this.props;

    // Scroll listener won't be added if compoenent is loading, add now
    if (!this.scrollListener && this.bgImage.current) {
      // Only check every 250ms, instead of on each scroll event
      this.interval = setInterval(this.checkHeight, 100);
    }

    if (prevProps.match.params.id !== match.params.id) {
      this.updateComponent(match.params.id);
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getElem = (arr, key) => {
    if (Array.isArray(arr)) {
      return arr.find((elem, index) => (
        elem.label === key // Find key
        || index === arr.length - 2 // Or get the second last one
      ));
    }
    return {};
  }

  checkHeight() {
    this.scrollListener = true;
    if (this.bgImage.current) {
      this.bgImage.current.updateHeight();
    }
  }

  updateComponent(id) {
    getDetail(id).then((resp) => {
      const [info, sizes] = resp;
      this.setState({ info, sizes });

      this.feedRef.current.filterFeed({
        text: info.title._content,
        userId: info.owner.nsid,
        filter: photo => photo.id !== id,
        isBad: (result, text) => result.length === 0 && text !== '',
      });
    }).catch(error => console.log(error));
  }

  render() {
    const {
      bgImageHeight,
      minHeight,
      sizes,
      info,
    } = this.state;

    // Don't ask me how this works... I have no idea ಥ_ಥ
    const percent = (this.height - bgImageHeight) / this.height;
    const topPos = minHeight
      ? bgImageHeight
      : (bgImageHeight - (this.height * (-percent + 0.4)));

    const isLoading = Object.keys(info).length === 0 || Object.keys(sizes).length === 0;
    return (isLoading ? (
      <p>Loading...</p>
    ) : (
      <DetailContainer>
        <BgImage
          ref={this.bgImage}
          windowHeightChanged={(newVal) => { this.height = newVal; }}
          bgImageHeightChanged={newVal => this.setState({ bgImageHeight: newVal })}
          minHeightChanged={newVal => this.setState({ minHeight: newVal })}
          lowRes={this.getElem(sizes, 'Thumbnail').source}
          highRes={this.getElem(sizes, 'Large').source}
        >
          <DragHandle />
        </BgImage>
        <DetailMain topPos={topPos} minHeight={minHeight}>
          <HeaderOne>
            {info.owner.realname || info.owner.username}
          </HeaderOne>
          <HeaderTwo>
            {info.title._content}
          </HeaderTwo>
          <HeaderThree>
            {unixTimestampParse(info.dates.posted)}
          </HeaderThree>
          <BelowTheLine minHeight={minHeight}>
            <Paragraph>
              {info.description._content}
            </Paragraph>
            <HeaderTwo>
              {'Related photos'}
            </HeaderTwo>
            <Feed
              ref={this.feedRef}
              showSearch={false}
              infiniteScroll={false}
              shouldClearPreloadedData={this.query.clearPreloadedData === 'true'}
              topPadding="1.2rem"
              padding="0"
              feedItemBackground="#ff7657"
            />
          </BelowTheLine>
        </DetailMain>
      </DetailContainer>
    ));
  }
}


const DetailContainer = styled.div`
  background-color: #fbeed7;
`;

const DetailMain = styled.div`
  position: absolute;
  top: ${props => props.topPos}px;
  color: ${props => (props.minHeight ? props.theme.darkColor : props.theme.lightColor)};
  transition: color 300ms ease-out;
  padding: 3rem;
  left: 0;
  right: 0;
  min-height: 100rem;
`;

DetailMain.defaultProps = {
  theme: {
    darkColor: theme.color,
    lightColor: 'rgba(255, 255, 255, 1)',
  },
};

const DragHandle = styled.div`
  background-color: #fbeed7;
  position: absolute;
  bottom: 20px;
  left: 50%;
  width: 40px;
  height: 3px;
  border-radius: 4px;

  &:after {
    background-color: #fbeed7;
    position: absolute;
    bottom: 20px;
    width: 40px;
    height: 3px;
    border-radius: 4px;
    bottom: -10px;
    display: block;
    content: "";
  }
`;

const HeaderOne = styled.h1`
  margin-top: 0;
  margin-bottom: 0.8rem;
  font-size: 6rem;
`;

const HeaderTwo = styled.h2`
  font-size: 1.8rem;
  font-weight: normal;
  display: inline;
`;

const HeaderThree = styled.h3`
  font-size: 1.2rem;
  font-weight: normal;
  float: right;
  margin: 0;
`;

const BelowTheLine = styled.div`
  opacity: ${props => (props.minHeight ? 1 : 0)};
  transition: opacity 200ms ease-out;
  color: ${theme.color}
`;

const Paragraph = styled.p`
  margin-top: 1.2rem;
  font-size: 1.4rem;
  font-weight: normal;
`;
