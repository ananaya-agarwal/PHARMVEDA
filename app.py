from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    user_query = data.get("message", "")
    # Sample Ayurveda responses
    if "cold" in user_query.lower():
        reply = "Drink Tulsi and Ginger tea with honey."
    elif "stress" in user_query.lower():
        reply = "Try Ashwagandha and meditation for stress relief."
    else:
        reply = "Please consult an Ayurvedic expert for detailed advice."
    return jsonify({"reply": reply})

if __name__ == "__main__":
    app.run(debug=True)
