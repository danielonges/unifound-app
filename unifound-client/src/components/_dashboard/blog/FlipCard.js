import React, { Component } from 'react';
import Flippy, { FrontSide, BackSide } from 'react-flippy';

const FlippyStyle = {
  width: '200px',
  height: '300px',
  textAlign: 'center',
  color: '#FFF',
  fontFamily: 'sans-serif',
  fontSize: '30px',
  justifyContent: 'center'
};

const FlippyOnHover = ({ flipDirection = 'horizontal' }) => (
  <Flippy flipOnHover={true} flipDirection={flipDirection} style={FlippyStyle}>
    <DefaultCardContents>I flip {flipDirection}ly on hover</DefaultCardContents>
  </Flippy>
);

const FlippyOnClick = ({ flipDirection = 'vertical' }) => (
  <Flippy flipOnClick={true} flipDirection={flipDirection} style={FlippyStyle}>
    <DefaultCardContents>I flip {flipDirection}ly on click</DefaultCardContents>
  </Flippy>
);

const ControlledFlippy = ({ isFlipped }) => (
  <Flippy flipDirection="vertical" isFlipped={isFlipped} style={FlippyStyle}>
    <DefaultCardContents>
      I flip vertically for every 3sec. I am controlling by a upper scope.
    </DefaultCardContents>
  </Flippy>
);
