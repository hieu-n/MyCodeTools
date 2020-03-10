import React from 'react';
import Head from 'next/head';
import { quickTypeGen } from '../lib/quickTypeLib';


export default (): React.ReactElement => {
  const [jsonString, setJsonString] = React.useState('');
  const [csCode, setCsCode] = React.useState('// Waiting ...');
  const [prefix, setPrefix] = React.useState('CsCode');

  React.useEffect(() => {
    (async (): Promise<void> => {
      setCsCode(await quickTypeGen({ prefix, jsonString }));
    })();
  }, [prefix, jsonString]);
  return (
    <>
      <Head>
        <title>MyCodeTools</title>

        <meta charSet="utf-8"/>
        <meta name="viewport"
              content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
      </Head>
      <div className="container-fluid vh-100">
        <div className="row">
          <div className="col-12">
            <p>Generate C Classes from JSON. Support the new JSON library: <a href="https://docs.microsoft.com/en-us/dotnet/api/system.text.json?view=netcore-3.1">System.Text.Json</a>.</p>
          </div>
        </div>
        <div className="row vh-100">
          <div className="col-6 vh-100">
            <div className="form-group vh-100 d-flex flex-column">
              <form className="form-inline">
                <label htmlFor="prefix">Class name</label>
                <input type="text" className="form-control" id="prefix" value={prefix} onChange={async (event): Promise<void> => {
                  setPrefix(event.currentTarget.value);
                }}/>
              </form>
              <label htmlFor="exampleFormControlTextarea1">Input Json here:</label>
              <textarea className="form-control flex-grow-1" id="exampleFormControlTextarea1"
                        onChange={async (event): Promise<void> => {
                          setJsonString(event.currentTarget.value);
                          setCsCode(await quickTypeGen({ prefix, jsonString: event.currentTarget.value }));
                        }}></textarea>
            </div>
          </div>
          <div className="col-6 vh-100">
            <div className="form-group vh-100 d-flex flex-column">
              <label htmlFor="csClass">C# Class:</label>
              <textarea className="form-control flex-grow-1" id="csClass" value={csCode} readOnly></textarea>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
