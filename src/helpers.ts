import * as XLSX from 'xlsx';

const { read, utils: { sheet_to_json } } = XLSX;

// エクセルファイル読み込み
function readFirstSheet(data: any, options: XLSX.ParsingOptions): any[][] {
  const wb: XLSX.WorkBook = read(data, options);
  const ws: XLSX.WorkSheet = wb.Sheets[wb.SheetNames[0]];
  return sheet_to_json(ws, { header: 5, raw: true });
}

// FileReaderは非同期処理なので処理をラップしてPromiseを返す
function readFileAsText(file: Blob): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(reader.error);
    reader.onload = () => resolve((reader.result as string) || '');
    reader.readAsText(file);
  });
}

// csv形式のデータをparseしオブジェクト配列へ変換する
function mapCSVToArray(csv: string): string[][] {
  return csv.split('\n').map((row) => row.split(','));
}

export { readFirstSheet, readFileAsText, mapCSVToArray };
