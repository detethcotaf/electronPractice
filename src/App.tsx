import React from 'react';
import './App.css';
import { FileSelect } from './FileSelect';
import { Report } from './Report';
import { readFileAsText, mapCSVToArray, readFirstSheet } from './helpers';
import { mapArrayToWorkItem } from './WorkItem';

class App extends React.Component {
  state = { screen: 'home', items: [] };

  // FileSelectコンポーネントにてonSubmitとして利用
  handleSubmit = async (file: Blob) => {
    try {
      const csv = await readFileAsText(file); // helpersで定義した関数を利用
      // const excel = await readFirstSheet(file, {type:"file"});
      console.log(csv);
      const arr = mapCSVToArray(csv); // object配列へ変換

      // ***ここを編集すれば良いかも***
      const items = mapArrayToWorkItem(arr); // 事前に定義した形式へ変換

      this.setState({ screen: 'report', items });
    } catch (error) {
      alert(error);
    }
  };

  // 最初はFileSelectコンポーネントを表示させておき、screenがhomeではない場合はReportコンポーネントを表示させる
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">保守優先度把握アプリケーション</h1>
        </header>
        {this.state.screen === 'home' ? (
          <FileSelect onSubmit={this.handleSubmit} />
        ) : (
          <Report items={this.state.items} />
        )}
      </div>
    );
  }
}

export default App;
