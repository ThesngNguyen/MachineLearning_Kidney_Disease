from flask import Flask, request, jsonify
import pickle
import numpy as np
from flask_cors import CORS
# import LR_Model as predict

app = Flask(__name__)   
CORS(app)
model = pickle.load(open('Data/LR_Model.h5', 'rb'))

def preprocess_data(age, bp, sg, al, su, rbc, pc, pcc, ba, bgr, bu, sc, sod, pot, hemo, pcv, wc, rc, htn, dm, cad, appet, pe, ane):
    input_data = {
        'age': age,
        'blood_pressure': {'normal': 0, 'above normal': 1, 'well above normal': 2}[bp],
        'specific_gravity': {'normal': 0, 'abnormal': 1}[sg],
        'albumin': {'normal': 0, 'abnormal': 1}[al],
        'sugar': {'normal': 0, 'abnormal': 1}[su],
        'red_blood_cells': {'normal': 1, 'abnormal': 0}[rbc],
        'pus_cell': {'normal': 1, 'abnormal': 0}[pc],
        'pus_cell_clumps': {'present': 1, 'notpresent': 0}[pcc],
        'bacteria': {'present': 1, 'notpresent': 0}[ba],
        'blood_glucose_random': bgr,
        'blood_urea': bu,
        'serum_creatinine': sc,
        'sodium': sod,
        'potassium': pot,
        'hemoglobin': hemo,
        'packed_cell_volume': pcv,
        'white_blood_cell_count': wc,
        'red_blood_cell_count': rc,
        'hypertension': {'yes': 1, 'no': 0}[htn],
        'diabetes_mellitus': {'yes': 1, 'no': 0, 'unknown': 0}[dm],
        'coronary_artery_disease': {'yes': 1, 'no': 0}[cad],
        'appetite': {'good': 1, 'poor': 0}[appet],
        'pedal_edema': {'yes': 1, 'no': 0}[pe],
        'anemia': {'yes': 1, 'no': 0}[ane]
    }

    new_data = np.array([[input_data['age'], input_data['blood_pressure'], input_data['specific_gravity'],
                         input_data['albumin'], input_data['sugar'], input_data['red_blood_cells'],
                         input_data['pus_cell'], input_data['pus_cell_clumps'], input_data['bacteria'],
                         input_data['blood_glucose_random'], input_data['blood_urea'], input_data['serum_creatinine'],
                         input_data['sodium'], input_data['potassium'], input_data['hemoglobin'],
                         input_data['packed_cell_volume'], input_data['white_blood_cell_count'],
                         input_data['red_blood_cell_count'], input_data['hypertension'], input_data['diabetes_mellitus'],
                         input_data['coronary_artery_disease'], input_data['appetite'], input_data['pedal_edema'],
                         input_data['anemia']]])
    
    return new_data.astype(np.float64)

# Biến để lưu trữ thông tin dự đoán
prediction_info = {}

@app.route('/predict', methods=['POST'])
def make_prediction():
    try:
        # Get JSON data from the request
        data = request.get_json(force=True)
        
        # Preprocess the input data
        input_data = preprocess_data(**data)
        
        # Make prediction using the model
        result = model.predict(input_data)
        
        # Get the prediction probabilities
        probabilities = model.predict_proba(input_data)
        
        # Calculate the percentage of positive and negative predictions
        negative_percentage = round(probabilities[0][0] * 100, 2)
        positive_percentage = round(probabilities[0][1] * 100, 2)
        
        # Store prediction info
        prediction_info['negative_percentage'] = negative_percentage
        prediction_info['positive_percentage'] = positive_percentage

        # Display the percentages (you can log or print this as needed)
        print("Tỉ lệ không mắc bệnh:", negative_percentage, "%")
        print("Tỉ lệ mắc bệnh:", positive_percentage, "%")
        
        # Display the prediction result
        if result == 0:
            print("Khách hàng không bị bệnh thận.")
        else:
            print("Khách hàng bị bệnh thận.")
            
        # Return the prediction result
        return jsonify({
            'result': result.item(),
            'negative_percentage': negative_percentage,
            'positive_percentage': positive_percentage
        })
    except Exception as e:
        return jsonify({'error': str(e)})
    
# # GET method for a simple message
# Hàm để lấy thông tin dự đoán
@app.route('/prediction', methods=['GET'])
def get_prediction_info():
    try:
        # Trả về thông tin dự đoán từ biến prediction_info
        return jsonify(prediction_info)
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(port=5000, debug=True)
