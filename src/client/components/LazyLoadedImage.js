import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import calcRatio from '../helpers/calc';

const AnimatedImageLoad = styled.div`
  padding-bottom: ${props => `${props.imageRatio}%`};
  position: relative;
  display: block;
  height: 0;
  width: 100%;
  overflow: hidden;
`;

const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
`;

const LazyLoadedImage = (props) => {
  const {
    urlT,
    tHeight,
    tWidth,
    urlN,
    nHeight,
    nWidth,
    urlZ,
    zHeight,
    zWidth,
    alt,
  } = props;

  return (
    <>
      <AnimatedImageLoad imageRatio={calcRatio(tHeight, tWidth)}>
        <Image
          alt={alt}
          data-sizes="auto"
          data-lowsrc={urlT} // Default
          data-srcset={`
            ${urlN} ${nWidth}w ${nHeight}h,
            ${urlZ} ${zWidth}w ${zHeight}h,
          `}
          className="lazyload lazyloadimage"
        />
        <noscript>
          <Image alt={alt} src={urlT} />
        </noscript>
      </AnimatedImageLoad>
    </>
  );
};

LazyLoadedImage.propTypes = {
  urlT: PropTypes.string.isRequired,
  tHeight: PropTypes.number.isRequired,
  tWidth: PropTypes.number.isRequired,
  urlN: PropTypes.string.isRequired,
  nHeight: PropTypes.number.isRequired,
  nWidth: PropTypes.number.isRequired,
  urlZ: PropTypes.string.isRequired,
  zHeight: PropTypes.number.isRequired,
  zWidth: PropTypes.number.isRequired,
  alt: PropTypes.string.isRequired,
};

export default LazyLoadedImage;
