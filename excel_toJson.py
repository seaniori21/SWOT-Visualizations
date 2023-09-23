import pandas as pd

from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


#@app.route('/api/data', methods=['GET'])
def get_data():
    strength = pd.read_excel('ExcelData\Strength AnalysisData.xlsx', engine='openpyxl')
    strength_json_data = strength.to_json(orient='records')
    with open('JsonData/strength.json', 'w') as file:
        file.write(strength_json_data)

    opportunity = pd.read_excel('ExcelData\Opportunity Analysis Data.xlsx', engine='openpyxl')
    opportunity_json_data = opportunity.to_json(orient='records')
    with open('JsonData/opportunity.json', 'w') as file:
        file.write(opportunity_json_data)

    threat = pd.read_excel('ExcelData\Threat Analysis Data.xlsx', engine='openpyxl')
    threat_json_data = threat.to_json(orient='records')
    with open('JsonData/threat.json', 'w') as file:
        file.write(threat_json_data)

    weakness = pd.read_excel('ExcelData\Weakness Analysis Data.xlsx', engine='openpyxl')
    weakness_json_data = weakness.to_json(orient='records')
    with open('JsonData/weakness.json', 'w') as file:
        file.write(weakness_json_data)

    fourFactors = pd.read_excel('ExcelData\All Four Factors.xlsx', engine='openpyxl')
    fourFactors_json_data = fourFactors.to_json(orient='records')
    with open('fourFactors.json', 'w') as file:
        file.write(fourFactors_json_data)
    
    message = "Json files have been updated with the Excel Data"
    return jsonify(message)

app.add_url_rule('/api/data', 'get_data', get_data)
if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080)

# strength = pd.read_excel('ExcelData\Strength AnalysisData.xlsx', engine='openpyxl')
# strength_json_data = strength.to_json(orient='records')
# with open('strength.json', 'w') as file:
#     file.write(strength_json_data)

# opportunity = pd.read_excel('ExcelData\Opportunity Analysis Data.xlsx', engine='openpyxl')
# opportunity_json_data = opportunity.to_json(orient='records')
# with open('opportunity.json', 'w') as file:
#     file.write(opportunity_json_data)

# threat = pd.read_excel('ExcelData\Threat Analysis Data.xlsx', engine='openpyxl')
# threat_json_data = threat.to_json(orient='records')
# with open('threat.json', 'w') as file:
#     file.write(threat_json_data)

# weakness = pd.read_excel('ExcelData\Weakness Analysis Data.xlsx', engine='openpyxl')
# weakness_json_data = weakness.to_json(orient='records')
# with open('weakness.json', 'w') as file:
#     file.write(weakness_json_data)

# fourFactors = pd.read_excel('ExcelData\All Four Factors.xlsx', engine='openpyxl')
# fourFactors_json_data = fourFactors.to_json(orient='records')
# with open('fourFactors.json', 'w') as file:
#     file.write(fourFactors_json_data)