import React from 'react';
import { Image } from 'react-bootstrap';

type Prop = {
  valid?: boolean;
};
export default class RakumaIcon extends React.Component<Prop, {}> {
  render() {
    const { valid } = this.props;
    return (
      <Image
        src={valid === undefined || valid ? 'rakuma.png' : 'rakuma_gray.png'}
        height="32"
      />
    );
  }
}
