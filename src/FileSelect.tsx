import * as React from 'react';

interface Props {
  onSubmit: (file: Blob) => void;
}

/**
 * ファイルを選択するためのコンポーネント
 * @type {React.Component}
 */
export class FileSelect extends React.Component<Props> {
  private file!: HTMLInputElement; // !をつけることで初期化チェックを回避できる

  // 取り込みボタンを押した時の挙動
  // propsを使って親コンポーネントのonSubmitを呼び出し、ファイルを渡している
  handleShowReport = async () => {
    if (!this.file.files || !this.file.files[0]) {
      return;
    }
    this.props.onSubmit(this.file.files[0]);
  };

  render() {
    return (
      <div>
        <p className="App-intro">マスタ取り込み</p>
        <input
          type="file"
          className="file"
          ref={(file: HTMLInputElement) => (this.file = file)}
          accept="text/csv"
        />
        <button onClick={this.handleShowReport}>取り込み</button>
        <br />
        <p className="App-intro">帳票取り込み</p>
        <input
          type="file"
          className="file"
          ref={(file: HTMLInputElement) => (this.file = file)}
          accept=".xlsx"
        />
        <button onClick={this.handleShowReport}>取り込み</button>
      </div>
    );
  }
}
