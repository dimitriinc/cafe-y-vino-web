from flask import Flask, request, jsonify
import smtplib
from email.mime.text import MIMEText
import logging
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
logging.basicConfig(level=logging.DEBUG)

@app.route('/reservations-request', methods=['POST'])
def reserv_request():
    data = request.get_json()
    name = data['name']
    tel = data['tel']
    date = data['date']
    hour = data['hour']
    pax = data['pax']
    comment = data['comment']
    email = data['email']

    logging.info(f"Received a request from {name}. The reservation date is {date}.")

    # to = "elliotponsic@hotmail.fr"
    to = "dimitriinc@proton.me"
    subject = "Solicitud de reserva"
    body = f'''
    <p>Nombre: {name}</p>
    <p>Fecha: {date}</p>
    <p>Hora: {hour}</p>
    <p>Pax: {pax}</p>
    <p>Comentario: {comment}</p>
    <p>Teléfono: {tel}</p>
    <p>Email: {email}</p>
    '''

    msg = MIMEText(body, 'html')
    msg['From'] = "cafeyvinoapp@gmail.com"
    msg['To'] = to
    msg['Subject'] = subject

    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.starttls()
    server.login("cafeyvinoapp@gmail.com", "admin&admin21")
    server.sendmail(msg['From'], msg['To'], msg.as_string())
    server.quit()
    return jsonify({"message": "Email sent successfully"})

if __name__ == '__main__':
    app.run(debug = True, port = 5000, host = '0.0.0.0')
    
