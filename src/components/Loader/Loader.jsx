import { Component } from 'react';
import { TailSpin } from 'react-loader-spinner';

export class Loader extends Component {
  render() {
    return (
      <div>
        <TailSpin />
      </div>
    );
  }
}
