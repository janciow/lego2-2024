import React, { Component } from 'react';
import axios from 'axios';
import ParsedJsonTable from '../../components/tables/ParsedJsonTable';
import './Parser.css';

class Parser extends Component {
  state = {
    url: '',
    setNumber: '',
    linikList: [],
    json: '',
    linikListDB: [],
  };

  componentDidMount() { }

  handleSubmit = async (event) => {
    event.preventDefault();

    await axios.post('/api/parser/add-link', {
      url: this.state.url,
      setNumber: this.state.setNumber,
      json: this.state.json,
    });
  };

  downloadTxtFile = () => {
    const element = document.createElement("a");
    const file = new Blob([this.state.json], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${this.state.setNumber}.json`;
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  }

  handleSubmitJson = async (event) => {
    event.preventDefault();

    const response = await axios.post('/api/parser/creat-json', {
      url: this.state.url,
      setNumber: this.state.setNumber,
    });

    this.setState({ json: response.data.data })
  };

  createLinksTable = async (event) => {
    await axios.post('/api/parser/create-links-table');
  };

  setRow = async (setNumber, url, json = '') => {
    this.setState({ setNumber, url, json });
  };

  handleClick = (json, setnumber, url) => {
    this.setState({ setnumber, url, json });
  };

  linikList = async (event) => {
    event.preventDefault();
    const values = await axios.get('/api/parser/link/list');
    this.setState({ linikList: values.data });
  };

  renderValues() {
    const entries = [];
    for (let key in this.state.linikList.data) {
      entries.push(
        <tr key={this.state.linikList.data[key].setNumber}>
          <td>For setNumber: {this.state.linikList.data[key].setNumber}</td>
          <td> url: {this.state.linikList.data[key].url}</td>
          <td><button onClick={this.setRow.bind(null, this.state.linikList.data[key].setNumber, this.state.linikList.data[key].url, '')}>set link</button></td>
        </tr>
      );
    }

    return entries;
  }

  renderValuesDB() {
    const entries = [];
    for (let key in this.state.linikListDB) {
      entries.push(
        <tr key={this.state.linikListDB[key].setnumber}>
          <td>{this.state.linikListDB[key].setnumber}</td>
          <td>{this.state.linikListDB[key].url}</td>
          <td>{(this.state.linikListDB[key].json && 'yest') || 'nie ma'}</td>
          <td><button onClick={
            this.setRow.bind(null, this.state.linikListDB[key].setnumber, this.state.linikListDB[key].url, this.state.linikListDB[key].json)
          }>set link</button></td>
        </tr>
      );
    }

    return entries;
  }

  render() {
    return (
      <>
        <h1>Parser</h1>
        <div className='parser__form'>

          <h3>Insert link:</h3>
          <form onSubmit={this.handleSubmit}>
            <label>Enter your url:</label>
            <input
              value={this.state.url}
              onChange={(event) => this.setState({ url: event.target.value })}
            />

            <label>Enter your setNumber:</label>
            <input
              value={this.state.setNumber}
              onChange={(event) => this.setState({ setNumber: event.target.value })}
            />
            <button >Submit</button>
          </form>
        </div>
        <hr />

        <h3>get JSON :</h3>
        <form onSubmit={this.handleSubmitJson}>
          <label>Enter your url:</label>
          <input
            value={this.state.url}
            onChange={(event) => this.setState({ url: event.target.value })}
          />

          <label>Enter your setNumber:</label>
          <input
            value={this.state.setNumber}
            onChange={(event) => this.setState({ setNumber: event.target.value })}
          />
          <button >Submit</button>
        </form>

        <hr />
        <button onClick={this.createLinksTable}>create Links Table dlete old one</button>

        <hr />
        <h3>render Values DB :</h3>
        <ParsedJsonTable rowButtonClick={this.handleClick} />

        <hr />
        <h3>JSON:</h3>
        <div>
          <button onClick={this.handleSubmit}>update json</button>
          <button onClick={this.downloadTxtFile}>Download txt</button>
        </div>
        <div>{this.state.url}</div>
        <div>{this.state.setNumber}</div>
        <pre>
          {this.state.json}
        </pre>

        <hr />
        <h3>static lini kList Values :</h3>
        <button onClick={this.linikList}>linik List</button>
        <table>
          <tbody>
            {this.renderValues()}
          </tbody>
        </table>
      </>
    );
  }
}

export default Parser;

