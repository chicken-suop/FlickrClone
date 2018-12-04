import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Modal, { ModalProvider } from 'styled-react-modal';
import moment from 'moment';
import DropdownFilter from './DropdownFilter';
import { getLicenses } from '../helpers/fetch';

const Background = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  background-color: #665c84;
  padding: 3rem;
  overflow-y: scroll;
`;

const StyledModal = Modal.styled`
  margin-top: 6rem;
  width: 100%;
  color: rgba(255, 255, 255, 0.87);
  font-weight: 700;
  font-size: 1.6rem;
`;

const ClearFilters = styled.u`
  font-size: 1.8rem;
  padding-bottom: 1.2rem;
  display: block;
`;

const SubHeader = styled.p`
  color: rgba(255, 255, 255, 0.38);
  margin: 0;
`;

const ColourContainer = styled.div`
  padding: .8rem;
  margin-bottom: 2.2rem;
  display: flex;
  justify-content: space-around;
  width: 75%;
`;

const ColourSwatch = styled.div`
  transform: ${props => (props.active ? 'scale(1.5)' : 'scale(1)')};
  transition: transform 150ms ease-in-out;
  width: 2.8rem;
  height: 2.8rem;
  border: #fff solid 1px;
  border-radius: 50%;
  box-shadow: rgba(0, 0, 0, .2) 0px 2px 4px;
  display: inline-block;
  background: ${props => props.colour};
`;

const FilterItem = styled.span`
  font-size: 1.8rem;
  font-weight: 400;
  color: ${props => (props.active ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.6)')};
  transition: color 150ms ease-in-out;
  padding: .4rem;
`;

const Tag = styled.span`
  border-radius: 8px;
  padding: 1.2rem;
  font-size: 1.6rem;
  font-weight: 400;
  background: ${props => (props.active ? 'rgba(251,238,215,1)' : 'rgba(251,238,215,0.87)')};
  color: ${props => (props.active ? 'rgba(255,118,87,1)' : 'rgba(255,118,87,0.87)')};
  transition: all 150ms ease-in-out;
  margin: .4rem;
`;

export default class FiltersOverlay extends React.Component {
  static propTypes = {
    handleNewFilters: PropTypes.func.isRequired,
    showing: PropTypes.bool.isRequired,
  }

  state = {
    dateFilter: {},
    colourFilter: {},
    licenseFilter: {},
    currentTags: [],
    licenses: [],
  }

  componentDidMount() {
    getLicenses().then((resp) => {
      this.setState({ licenses: resp });
    }).catch(error => console.log(error));
  }

  clearFilters = () => this.setState({
    dateFilter: {},
    colourFilter: {},
    licenseFilter: {},
    currentTags: [],
    licenses: [],
  });

  selectFilter = (filter, item) => {
    const {
      dateFilter,
      colourFilter,
      licenseFilter,
    } = this.state;
    if (filter === 'date' && dateFilter.id !== item.id) {
      this.setState({ dateFilter: item }, this.afterSelectFilter);
    } else if (filter === 'colour' && colourFilter.id !== item.id) {
      this.setState({ colourFilter: item }, this.afterSelectFilter);
    } else if (filter === 'license' && licenseFilter.id !== item.id) {
      this.setState({ licenseFilter: item }, this.afterSelectFilter);
    }
  }

  afterSelectFilter = () => {
    const { handleNewFilters } = this.props;
    const {
      dateFilter,
      colourFilter,
      licenseFilter,
      currentTags,
    } = this.state;
    handleNewFilters({
      date: dateFilter.timestamp,
      colorCodes: [colourFilter.code],
      license: [licenseFilter.id],
      tags: currentTags.map(tag => tag.text).slice(0, 20),
    });
  }

  addTag = () => {
    // TODO: Replace this prompt with propper input
    const tagText = window.prompt('New tag:');
    if (tagText) {
      this.setState((prevState) => {
        let id = 0;
        if (prevState.currentTags.length) {
          id = prevState.currentTags[prevState.currentTags.length - 1].id + 1;
        }
        return {
          currentTags: [...prevState.currentTags, { id, text: tagText }],
        };
      });
    }
  }

  render() {
    const { showing } = this.props;
    const {
      dateFilter,
      colourFilter,
      licenseFilter,
      currentTags,
      licenses,
    } = this.state;
    return (
      <ModalProvider backgroundComponent={Background}>
        <StyledModal isOpen={showing}>
          <ClearFilters onClick={this.clearFilters}>
            Clear filters
          </ClearFilters>
          <div>
            <SubHeader>
              Colour
            </SubHeader>
            <ColourContainer>
              {[
                { id: 0, colour: '#f2f2f2', code: 'White' },
                { id: 1, colour: '#4f4f4f', code: 'Black' },
                { id: 2, colour: '#f3ca3e', code: 'Orange' },
                { id: 3, colour: '#ff5f58', code: 'Red' },
                { id: 4, colour: '#3399ff', code: 'Blue' },
              ].map(item => (
                <ColourSwatch
                  key={item.id}
                  onClick={() => this.selectFilter('colour', item)}
                  colour={item.colour}
                  active={colourFilter.id === item.id}
                >
                  {item.text}
                </ColourSwatch>
              ))}
            </ColourContainer>
          </div>
          <DropdownFilter
            text="DATE"
            withMarginRight
            activeChild={dateFilter && <FilterItem active>{dateFilter.text}</FilterItem>}
          >
            {[
              {
                id: 0,
                text: 'Last 3 days',
                timestamp: moment().subtract(3, 'day').startOf('day').unix(),
              },
              {
                id: 1,
                text: 'Last week',
                timestamp: moment().subtract(1, 'week').startOf('day').unix(),
              },
              {
                id: 2,
                text: 'Last month',
                timestamp: moment().subtract(1, 'month').startOf('day').unix(),
              },
            ].map(item => (
              <FilterItem
                key={item.id}
                onClick={() => this.selectFilter('date', item)}
                active={dateFilter.id === item.id}
              >
                {item.text}
              </FilterItem>
            ))}
          </DropdownFilter>
          <DropdownFilter
            text="LICENSE"
            withMarginRight
            activeChild={licenseFilter && <FilterItem active>{licenseFilter.name}</FilterItem>}
          >
            {licenses.map(item => (
              <FilterItem
                key={item.id}
                onClick={() => this.selectFilter('license', item)}
                active={licenseFilter.id === item.id}
              >
                {item.name}
              </FilterItem>
            ))}
          </DropdownFilter>
          <DropdownFilter
            flowAsRow
            text="TAGS"
            withMarginRight
            activeChild={<FilterItem active>{currentTags.map(tag => tag.text).join(', ')}</FilterItem>}
          >
            {currentTags.map(tag => (
              <Tag key={tag.id} active>
                {tag.text}
              </Tag>
            ))}
            <Tag onClick={this.addTag}>
              New tag
            </Tag>
          </DropdownFilter>
        </StyledModal>
      </ModalProvider>
    );
  }
}
