import './App.css';
import React, { useState,  useEffect } from 'react';
import { Range, getTrackBackground } from 'react-range';

const App = () => {
  const [inputData, setInputData] = useState({
    age: 25,
    bp: 'normal',
    sg: 'normal',
    al: 'normal',
    su: 'normal',
    rbc: 'normal',
    pc: 'normal',
    pcc: 'notpresent',
    ba: 'notpresent',
    bgr: 100,
    bu: 50,
    sc: 1.2,
    sod: 100,
    pot: 4.0,
    hemo: 15.0,
    pcv: 40,
    wc: 9800,
    rc: 5.0,
    htn: 'no',
    dm: 'no',
    cad: 'no',
    appet: 'good',
    pe: 'no',
    ane: 'no',
  });

  //Logistic Regression
  const [predictionResultLR, setPredictionResultLR] = useState(null);
  const [positivePercentageLR, setPositivePercentageLR] = useState(0);
  const [negativePercentageLR, setNegativePercentageLR] = useState(0);

  //Bernoulli Naive Bayes
  const [predictionResultBNB, setPredictionResultBNB] = useState(null);
  const [positivePercentageBNB, setPositivePercentageBNB] = useState(0);
  const [negativePercentageBNB, setNegativePercentageBNB] = useState(0);

  //Support Vector Machine
  const [predictionResultSVM, setPredictionResultSVM] = useState(null);
  const [positivePercentageSVM, setPositivePercentageSVM] = useState(0);
  const [negativePercentageSVM, setNegativePercentageSVM] = useState(0);

  //Decision Tree
  const [predictionResultDT, setPredictionResultDT] = useState(null);
  const [positivePercentageDT, setPositivePercentageDT] = useState(0);
  const [negativePercentageDT, setNegativePercentageDT] = useState(0);


  const handleInputChange = (fieldName, value) => {
    setInputData({ ...inputData, [fieldName]: value });
  };

  //Get LR
  const getPredictionInfo = async () => {
    try {
      // Gửi yêu cầu GET để lấy thông tin chi tiết về dự đoán
      const response = await fetch('http://localhost:5000/prediction');
      const data = await response.json();
  
      // Kiểm tra xem có giá trị percentage hay không
      if ('negative_percentage_LR' in data && 'positive_percentage_LR' in data) {
        // Cập nhật state
        setNegativePercentageLR(data.negative_percentage_LR);
        setPositivePercentageLR(data.positive_percentage_LR);
      } else {
        console.error('Không có giá trị percentage trong phản hồi.');
      }
    } catch (error) {
      console.error('Lỗi khi lấy thông tin dự đoán:', error);
    }
  };

  //Get BNB
  const getPredictionInfoBNB = async () => {
    try {
      // Gửi yêu cầu GET để lấy thông tin chi tiết về dự đoán
      const responseBNB = await fetch('http://localhost:5000/predict/bnb');
      const dataBNB = await responseBNB.json();
      // Kiểm tra xem có giá trị percentage hay không
      if ('negative_percentage_BNB' in dataBNB && 'positive_percentage_BNB' in dataBNB) {
        // Cập nhật state
        setNegativePercentageBNB(dataBNB.negative_percentage_BNB);
        setPositivePercentageBNB(dataBNB.positive_percentage_BNB);
        console.log(setNegativePercentageBNB, setPositivePercentageBNB)
      } else {
        console.error('Không có giá trị percentage trong phản hồi.');
      }
    } catch (error) {
      console.error('Lỗi khi lấy thông tin dự đoán:', error);
    }
  };

  //Get SVM
  const getPredictionInfoSVM = async () => {
    try {
      // Gửi yêu cầu GET để lấy thông tin chi tiết về dự đoán
      const responseSVM = await fetch('http://localhost:5000/predict/svm');
      const dataSVM = await responseSVM.json();
      // Kiểm tra xem có giá trị percentage hay không
      if ('negative_percentage_SVM' in dataSVM && 'positive_percentage_SVM' in dataSVM) {
        // Cập nhật state
        setNegativePercentageSVM(dataSVM.negative_percentage_SVM);
        setPositivePercentageSVM(dataSVM.positive_percentage_SVM);
        console.log(setNegativePercentageSVM, setPositivePercentageSVM)
      } else {
        console.error('Không có giá trị percentage trong phản hồi.');
      }
    } catch (error) {
      console.error('Lỗi khi lấy thông tin dự đoán:', error);
    }
  };

  //Get KNN
  const getPredictionInfoDT = async () => {
    try {
      // Gửi yêu cầu GET để lấy thông tin chi tiết về dự đoán
      const responseDT = await fetch('http://localhost:5000/predict/dt');
      const dataDT = await responseDT.json();
      // Kiểm tra xem có giá trị percentage hay không
      if ('negative_percentage_DT' in dataDT && 'positive_percentage_DT' in dataDT) {
        // Cập nhật state
        setNegativePercentageDT(dataDT.negative_percentage_DT);
        setPositivePercentageDT(dataDT.positive_percentage_DT);
        console.log(setNegativePercentageDT, setPositivePercentageDT)
      } else {
        console.error('Không có giá trị percentage trong phản hồi.');
      }
    } catch (error) {
      console.error('Lỗi khi lấy thông tin dự đoán:', error);
    }
  };

  const handleSubmit = async () => {
    try {

      setIsProcessing(true);

      // Gửi yêu cầu POST đến /predict
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputData),
      });

      // Gửi yêu cầu POST đến /predict bnb
      const responseBNB = await fetch('http://localhost:5000/prediction/bnb', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputData),
      });

      // Gửi yêu cầu POST đến /predict SVM
      const responseSVM = await fetch('http://localhost:5000/prediction/svm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputData),
      });

      // Gửi yêu cầu POST đến /predict DT
      const responseDT = await fetch('http://localhost:5000/prediction/dt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputData),
      })
  
      // Xử lý phản hồi từ máy chủ
      const data = await response.json();
      const dataBNB = await responseBNB.json();
      const dataSVM = await responseSVM.json();
      const dataDT = await responseDT.json();

      // Hiển thị kết quả dự đoán BNB
      if ('result' in dataBNB) {
        setPredictionResultBNB(dataBNB.result); 

        if (dataBNB.result === 0) {
          console.log('Khách hàng không bị bệnh thận.');
        } else {
          console.log('Khách hàng bị bệnh thận.');
        }
      } else if ('error' in dataBNB) {
        console.error('Lỗi khi dự đoán:', dataBNB.error);
        console.log(inputData)
      }

      // Hiển thị kết quả dự đoán KNN
      if ('result' in dataSVM) {
        setPredictionResultSVM(dataSVM.result); 

        if (dataSVM.result === 0) {
          console.log('Khách hàng không bị bệnh thận.');
        } else {
          console.log('Khách hàng bị bệnh thận.');
        }
      } else if ('error' in dataSVM) {
        console.error('Lỗi khi dự đoán:', dataSVM.error);
        console.log(inputData)
      }
  
      // Hiển thị kết quả dự đoán
      if ('result' in data) {
        setPredictionResultLR(data.result);  

        if (data.result === 0) {
          console.log('Khách hàng không bị bệnh thận.');
        } else {
          console.log('Khách hàng bị bệnh thận.');
        }
      } else if ('error' in data) {
        console.error('Lỗi khi dự đoán:', data.error);
        console.log(inputData)
      }

      // Hiển thị kết quả dự đoán DT
      if ('result' in dataDT) {
        setPredictionResultDT(dataDT.result);  

        if (data.result === 0) {
          console.log('Khách hàng không bị bệnh thận.');
        } else {
          console.log('Khách hàng bị bệnh thận.');
        }
      } else if ('error' in dataDT) {
        console.error('Lỗi khi dự đoán:', data.error);
        console.log(inputData)
      }

      await getPredictionInfo();
      await getPredictionInfoBNB();
      await getPredictionInfoSVM();
      await getPredictionInfoDT();

    } catch (error) {
      console.error('Lỗi khi gửi yêu cầu:', error);
      console.log(inputData)
    } finally {
      //End
      setTimeout(() => {
        setIsProcessing(false);
      }, 2000);  
    }
  };

  useEffect(() => {
    console.log("Positive Percentage: ", positivePercentageBNB);
    console.log("Negative Percentage: ", negativePercentageBNB);
    console.log("Positive Percentage: ", positivePercentageLR);
    console.log("Negative Percentage: ", negativePercentageLR);
    console.log("Positive Percentage: ", positivePercentageSVM);
    console.log("Negative Percentage: ", negativePercentageSVM);
    console.log("Positive Percentage: ", positivePercentageDT);
    console.log("Negative Percentage: ", negativePercentageDT);
  }, [positivePercentageBNB, negativePercentageBNB, positivePercentageLR, negativePercentageLR, positivePercentageSVM , negativePercentageSVM, positivePercentageDT, negativePercentageDT]);

  //Loading Prediction
  const [isProcessing, setIsProcessing] = useState(false);

  return (
    <div>    
      {isProcessing && (
        <div className="overlay">
          <div className='prediction-popup'>
            <img className="scaled-gif" src="https://media2.giphy.com/media/uNFCFKlTmovbgzHkeT/giphy.gif?cid=ecf05e4769r15uwvt95r46az4ealvl79zwdzcil6ra0wno5t&ep=v1_gifs_search&rid=giphy.gif&ct=g" alt="Loading..." />
          </div>
        </div>
      )} 
      <div className='Box-Container' >    
        <div className='Info-Container'>
        <h2>Kidney Disease Diagnosis</h2>
        <button onClick={handleSubmit}>Predict</button>

          <div className='LR-Model'>
            <h1>Logistic Regression</h1>
            <p>Kết quả dự đoán: {predictionResultLR !== null && (           
              <span style={{ color: predictionResultLR === 0 ? 'green' : 'red' }}>
                {predictionResultLR === 0 ? 'Khả năng thấp bị bệnh thận' : 'Khả năng cao bị bệnh thận'}
              </span>
            )}</p>         
            <p>Tỉ lệ không mắc bệnh: <span style={{color: 'green', fontWeight: 'normal'}}>{negativePercentageLR} %</span></p>
            <p>Tỉ lệ mắc bệnh: <span style={{color: 'red', fontWeight: 'normal'}}>{positivePercentageLR} %</span></p>
          </div>

          <div className='BNB-Model'>
            <h1>Bernoulli Naives Bayes</h1>
            <p>Kết quả dự đoán: {predictionResultBNB !== null && (           
              <span style={{ color: predictionResultBNB === 0 ? 'green' : 'red' }}>
                {predictionResultBNB === 0 ? 'Khả năng thấp bị bệnh thận' : 'Khả năng cao bị bệnh thận'}
              </span>
            )}</p>         
            <p>Tỉ lệ không mắc bệnh: <span style={{color: 'green', fontWeight: 'normal'}}>{negativePercentageBNB} %</span></p>
            <p>Tỉ lệ mắc bệnh: <span style={{color: 'red', fontWeight: 'normal'}}>{positivePercentageBNB} %</span></p>
          </div>

          <div className='SVM-Model'>
            <h1>Support Vector Machine</h1>
            <p>Kết quả dự đoán: {predictionResultSVM !== null && (           
              <span style={{ color: predictionResultSVM === 0 ? 'green' : 'red' }}>
                {predictionResultSVM === 0 ? 'Khả năng thấp bị bệnh thận' : 'Khả năng cao bị bệnh thận'}
              </span>
            )}</p>         
            <p>Tỉ lệ không mắc bệnh: <span style={{color: 'green', fontWeight: 'normal'}}>{negativePercentageSVM} %</span></p>
            <p>Tỉ lệ mắc bệnh: <span style={{color: 'red', fontWeight: 'normal'}}>{positivePercentageSVM} %</span></p>
          </div>

          <div className='SVM-Model'>
            <h1>Decision Tree</h1>
            <p>Kết quả dự đoán: {predictionResultDT !== null && (           
              <span style={{ color: predictionResultDT === 0 ? 'green' : 'red' }}>
                {predictionResultDT === 0 ? 'Khả năng thấp bị bệnh thận' : 'Khả năng cao bị bệnh thận'}
              </span>
            )}</p>         
            <p>Tỉ lệ không mắc bệnh: <span style={{color: 'green', fontWeight: 'normal'}}>{negativePercentageDT} %</span></p>
            <p>Tỉ lệ mắc bệnh: <span style={{color: 'red', fontWeight: 'normal'}}>{positivePercentageDT} %</span></p>
          </div>

        </div>
        <div className='Data-Container'>
          <label>
            <div>
              Age: {inputData.age}
            </div>
            <Range
              step={1}
              min={1}
              max={100}
              values={[inputData.age]}
              onChange={(values) => handleInputChange('age', values[0])}
              renderTrack={({ props, children }) => (
                <div {...props} style={{
                  ...props.style,
                  background: getTrackBackground({
                    values: [inputData.age],
                    colors: ["#007bff", "#ccc"],
                    min: 1,
                    max: 100,
                  }),
                }} className="track">
                  {children}
                </div>
              )}
              renderThumb={({ props }) => (
                <div {...props} 
                 className="thumb" />
              )}
            />
            <div className="range-info">
              <span>Min: 1</span>
              <span>Max: 100</span>
            </div>
          </label>

          <label>
            Huyết Áp:
            <select value={inputData.bp} onChange={(e) => handleInputChange('bp', e.target.value)}>
              <option value="normal">Normal</option>
              <option value="above normal">Above Normal</option>
              <option value="well above normal">Well Above Normal</option>
            </select>
          </label>

          <label>
            Trọng lượng riêng:
            <select value={inputData.sg} onChange={(e) => handleInputChange('sg', e.target.value)}>
              <option value="normal">Normal</option>
              <option value="abnormal">Abnormal</option>
            </select>
          </label>

          <label>
            Chọn albumin của bạn:
            <select value={inputData.al} onChange={(e) => handleInputChange('al', e.target.value)}>
              <option value="normal">Normal</option>
              <option value="abnormal">Abnormal</option>
            </select>
          </label>

          <label>
            Chọn đường huyết của bạn:
            <select value={inputData.su} onChange={(e) => handleInputChange('su', e.target.value)}>
              <option value="normal">Normal</option>
              <option value="abnormal">Abnormal</option>
            </select>
          </label>

          <label>
            Chọn số lượng tế bào máu đỏ của bạn:
            <select value={inputData.rbc} onChange={(e) => handleInputChange('rbc', e.target.value)}>
              <option value="normal">Normal</option>
              <option value="abnormal">Abnormal</option>
            </select>
          </label>

          <label>
            Chọn số lượng tế bào ủ bằng của bạn:
            <select value={inputData.pc} onChange={(e) => handleInputChange('pc', e.target.value)}>
              <option value="normal">Normal</option>
              <option value="abnormal">Abnormal</option>
            </select>
          </label>

          <label>
            Chọn các cục máu trắng trong nước tiểu của bạn:
            <select value={inputData.pcc} onChange={(e) => handleInputChange('pcc', e.target.value)}>
              <option value="present">Present</option>
              <option value="notpresent">Not Present</option>
            </select>
          </label>

          <label>
            Chọn vi khuẩn trong nước tiểu của bạn:
            <select value={inputData.ba} onChange={(e) => handleInputChange('ba', e.target.value)}>
              <option value="present">Present</option>
              <option value="notpresent">Not Present</option>
            </select>
          </label>

          <label>
            Chọn đường huyết ngẫu nhiên của bạn: {inputData.bgr}
            <Range
              step={1}
              min={1}
              max={500}
              values={[inputData.bgr]}
              onChange={(values) => handleInputChange('bgr', values[0])}
              renderTrack={({ props, children }) => (
                <div {...props} style={{
                  ...props.style,
                  background: getTrackBackground({
                    values: [inputData.bgr],
                    colors: ["#007bff", "#ccc"],
                    min: 1,
                    max: 500,
                  }),
                }} className="track">{children}</div>
              )}
              renderThumb={({ props }) => (
                <div {...props} className="thumb" />
              )}
            />
          </label>

          <label>
            Chọn ure trong máu của bạn: {inputData.bu}
            <Range
              step={1}
              min={1}
              max={200}
              values={[inputData.bu]}
              onChange={(values) => handleInputChange('bu', values[0])}
              renderTrack={({ props, children }) => (
                <div {...props} style={{
                  ...props.style,
                  background: getTrackBackground({
                    values: [inputData.bu],
                    colors: ["#007bff", "#ccc"],
                    min: 1,
                    max: 200,
                  }),
                }} className="track">{children}</div>
              )}
              renderThumb={({ props }) => (
                <div {...props} className="thumb" />
              )}
            />
          </label>

          <label>
            Chọn creatinin trong huyết tương của bạn: {inputData.sc}
            <Range
              step={0.1}
              min={1.0}
              max={15.0}
              values={[inputData.sc]}
              onChange={(values) => handleInputChange('sc', values[0])}
              renderTrack={({ props, children }) => (
                <div {...props} style={{
                  ...props.style,
                  background: getTrackBackground({
                    values: [inputData.sc],
                    colors: ["#007bff", "#ccc"],
                    min: 1,
                    max: 15,
                  }),
                }} className="track">{children}</div>
              )}
              renderThumb={({ props }) => (
                <div {...props} className="thumb" />
              )}
            />
          </label>

          <label>
            Chọn nồng độ natri của bạn (sod): {inputData.sod}
            <Range
              step={1}
              min={1}
              max={200}
              values={[inputData.sod]}
              onChange={(values) => handleInputChange('sod', values[0])}
              renderTrack={({ props, children }) => (
                <div {...props} style={{
                  ...props.style,
                  background: getTrackBackground({
                    values: [inputData.sod],
                    colors: ["#007bff", "#ccc"],
                    min: 1,
                    max: 200,
                  }),
                }} className="track">{children}</div>
              )}
              renderThumb={({ props }) => (
                <div {...props} className="thumb" />
              )}
            />
          </label>

          <label>
            Chọn nồng độ kali của bạn (pot): {inputData.pot}
            <Range
              step={0.1}
              min={1.0}
              max={10.0}
              values={[inputData.pot]}
              onChange={(values) => handleInputChange('pot', values[0])}
              renderTrack={({ props, children }) => (
                <div {...props} style={{
                  ...props.style,
                  background: getTrackBackground({
                    values: [inputData.pot],
                    colors: ["#007bff", "#ccc"],
                    min: 1,
                    max: 10,
                  }),
                }} className="track">{children}</div>
              )}
              renderThumb={({ props }) => (
                <div {...props} className="thumb" />
              )}
            />
          </label>

          <label>
            Chọn hàm lượng hemoglobin của bạn (hemo): {inputData.hemo}
            <Range
              step={0.1}
              min={1.0}
              max={20.0}
              values={[inputData.hemo]}
              onChange={(values) => handleInputChange('hemo', values[0])}
              renderTrack={({ props, children }) => (
                <div {...props} style={{
                  ...props.style,
                  background: getTrackBackground({
                    values: [inputData.hemo],
                    colors: ["#007bff", "#ccc"],
                    min: 1,
                    max: 20,
                  }),
                }} className="track">{children}</div>
              )}
              renderThumb={({ props }) => (
                <div {...props} className="thumb" />
              )}
            />
          </label>

          <label>
            Chọn tỷ lệ tế bào đỏ của bạn (pcv): {inputData.pcv}
            <Range
              step={1}
              min={1}
              max={54}
              values={[inputData.pcv]}
              onChange={(values) => handleInputChange('pcv', values[0])}
              renderTrack={({ props, children }) => (
                <div {...props} style={{
                  ...props.style,
                  background: getTrackBackground({
                    values: [inputData.pcv],
                    colors: ["#007bff", "#ccc"],
                    min: 1,
                    max: 54,
                  }),
                }} className="track">{children}</div>
              )}
              renderThumb={({ props }) => (
                <div {...props} className="thumb" />
              )}
            />
          </label>

          <label>
            Chọn đếm tế bào trắng của bạn (wc): {inputData.wc}
            <Range
              step={1}
              min={1}
              max={26400}
              values={[inputData.wc]}
              onChange={(values) => handleInputChange('wc', values[0])}
              renderTrack={({ props, children }) => (
                <div {...props} style={{
                  ...props.style,
                  background: getTrackBackground({
                    values: [inputData.wc],
                    colors: ["#007bff", "#ccc"],
                    min: 1,
                    max: 26400,
                  }),
                }} className="track">{children}</div>
              )}
              renderThumb={({ props }) => (
                <div {...props} className="thumb" />
              )}
            />
          </label>

          <label>
            Chọn số lượng tế bào đỏ của bạn (rc): {inputData.rc}
            <Range
              step={0.1}
              min={1.0}
              max={18.0}
              values={[inputData.rc]}
              onChange={(values) => handleInputChange('rc', values[0])}
              renderTrack={({ props, children }) => (
                <div {...props} style={{
                  ...props.style,
                  background: getTrackBackground({
                    values: [inputData.rc],
                    colors: ["#007bff", "#ccc"],
                    min: 1,
                    max: 18,
                  }),
                }} className="track">{children}</div>
              )}
              renderThumb={({ props }) => (
                <div {...props} className="thumb" />
              )}
            />
          </label>

          <label>
            Chọn tình trạng tăng huyết áp của bạn (htn):
            <select value={inputData.htn} 
            onChange={(e) => handleInputChange('htn', e.target.value)}>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </label>

          <label>
            Chọn tình trạng tiểu đường của bạn (dm):
            <select value={inputData.dm} onChange={(e) => handleInputChange('dm', e.target.value)}>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </label>

          <label>
            Chọn bệnh động mạch vành của bạn (cad):
            <select value={inputData.cad} onChange={(e) => handleInputChange('cad', e.target.value)}>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </label>

          <label>
            Chọn tình trạng ăn uống của bạn (appet):
            <select value={inputData.appet} onChange={(e) => handleInputChange('appet', e.target.value)}>
              <option value="good">Good</option>
              <option value="poor">Poor</option>
            </select>
          </label>

          <label>
            Chọn tình trạng ứ nước của bạn (pe):
            <select value={inputData.pe} onChange={(e) => handleInputChange('pe', e.target.value)}>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </label>

          <label>
            Chọn tình trạng thiếu máu của bạn (ane):
            <select value={inputData.ane} onChange={(e) => handleInputChange('ane', e.target.value)}>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </label>
        </div>
      </div>
    </div>
  );
};

export default App;
