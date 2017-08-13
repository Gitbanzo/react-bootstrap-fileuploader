import React, { PropTypes, Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

const Style = {
  fileBox: {
    maxWidth: '100%',
    height: '100%',
    minHeight: '100px',
    position: 'relative',
    border: '5px dotted #ccc',
    borderRadius: '5px',
    overflowY: 'auto',
  },
  receiveFileOuter: {
    width: '100%',
    height: '100%',
    minHeight: '100px',
    display: 'table',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
    background: '#fff',
  },
  receiveFile: {
    width: '100%',
    height: '100%',
    display: 'table-cell',
    verticalAlign: 'middle',
    textAlign: 'center',
  },
  receiveFileInput: {},
};

export default class App extends Component {
  static handleDragOver(evt) {
    evt.preventDefault();
  }

  constructor(props) {
    super(props);
    this._onChange = this._onChange.bind(this);
    this._onDrop = this._onDrop.bind(this);
    this._getLabel = this._getLabel.bind(this);
  }

  componentDidMount() {
    const { isDrop } = this.props;
    if (isDrop) {
      document.addEventListener('dragover', App.handleDragOver, false);
      document.addEventListener('drop', this._onDrop, false);
    }
  }

  componentWillUnmount() {
    const { isDrop } = this.props;
    if (isDrop) {
      document.removeEventListener('dragover', App.handleDragOver);
      document.removeEventListener('drop', this._onDrop);
    }
  }

  _getLabel() {
    const { isDrop, label } = this.props;
    if (label) {
      return (
        <div>
          {label}
        </div>
      );
    }
    return isDrop
      ? <p>ここにファイルをドロップ</p>
      : <span className="glyphicon glyphicon-folder-open" />;
  }

  _onDrop(evt) {
    evt.preventDefault();
    this.props.onChange(evt.dataTransfer.files);
  }

  _onChange(evt) {
    this.props.onChange(evt.target.files);
  }

  _renderFile(file) {
    if (!file) {
      return this._getLabel();
    }
    return (
      <div>
        <span
          className="glyphicon glyphicon-open-file"
          style={{ fontSize: '32px' }}
        />
        <p>
          {file.name}
        </p>
      </div>
    );
  }

  render() {
    const { file, name, htmlFor, isDrop, label, accept } = this.props;
    if (isDrop) {
      return (
        <div style={Style.fileBox}>
          <div style={Style.receiveFileOuter}>
            <div style={Style.receiveFile}>
              {this._renderFile(file)}
            </div>
          </div>
          <input
            type="file"
            style={{
              width: '100%',
              height: '100px',
              opacity: 0,
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: 2,
            }}
            onChange={this._onChange}
            accept={accept.join()}
          />
        </div>
      );
    }
    return (
      <div>
        <div className="input-group col-xs-4">
          <label className="input-group-btn" htmlFor={htmlFor}>
            <span className="btn btn-primary">
              {this._getLabel()}
              <input
                id={htmlFor}
                type="file"
                style={{ display: 'none' }}
                onChange={this._onChange}
                accept={accept.join()}
              />
            </span>
          </label>
          <input
            type="text"
            name={name}
            className="form-control"
            value={file ? file.name : ''}
            readOnly
          />
        </div>
      </div>
    );
  }
}

App.propTypes = {
  file: PropTypes.object,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  htmlFor: PropTypes.string.isRequired,
  accept: PropTypes.array,
  isDrop: PropTypes.bool,
  label: PropTypes.node,
};

App.defaultProps = {
  file: {},
  accept: [],
  isDrop: false,
  label: '',
};
