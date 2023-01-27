from flask import Flask, request, jsonify
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import logging
from flask_cors import CORS
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
logging.basicConfig(level=logging.DEBUG)

cred = credentials.Certificate('cafe-y-vino-firebase-adminsdk-qdn8s-0f0ac07b32.json')
firebase_admin.initialize_app(cred)
fStore = firestore.client()

# server = smtplib.SMTP('smtp.gmail.com', 587)
# server.starttls()
# server.login("cafeyvinoapp@gmail.com", "hhgwneoltsmuyymn")

@app.route('/confirm-reservation')
def confirm_reservation():

    name = request.args.get('name')
    date = request.args.get('date')
    hour = request.args.get('hour')
    doc_id = request.args.get('id')

    fStore.document(f"reservas/{date}/reservas/{doc_id}").update({"confirmado": True})

    msg = MIMEMultipart()
    to = request.args.get('email')
    subject = "Confirmación de reserva"
    html = f'''
    <html><body>
    <p>Hola, {name}! Tu reserva para {date} a las {hour} está confirmada.<br>Nos vemos pronto!</p>
    </body></html>
    '''
    msg.attach(MIMEText(html, 'html'))
    msg['From'] = "cafeyvinoapp@gmail.com"
    msg['To'] = to
    msg['Subject'] = subject

    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.starttls()
    server.login("cafeyvinoapp@gmail.com", "hhgwneoltsmuyymn")
    server.sendmail(msg['From'], msg['To'], msg.as_string())
    server.quit()
    return jsonify({"message": "La confirmación está enviada exitosamente"})

@app.route('/reject-reservation')
def reject_reservation():

    name = request.args.get('name')
    date = request.args.get('date')
    hour = request.args.get('hour')
    doc_id = request.args.get('id')

@app.route('/reservations-request', methods = ['POST'])
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

    doc_ref = fStore.collection(f"reservas/{date}/reservas").add({
        "nombre": name,
        "telefono": tel,
        "hora": hour,
        "pax": pax,
        "comentario": comment,
        "timestamp": firestore.SERVER_TIMESTAMP,
        "confirmado": False
    })

    doc_id = doc_ref[1].id
    logging.info(f"the reservation's ID: {doc_id}")

    msg = MIMEMultipart()

    # to = "elliotponsic@hotmail.fr"
    to = "dimitriinc@proton.me"
    subject = "Solicitud de reserva"
    html = f'''
    <html><body>
    <div style='padding:2rem;background-color:#fcfaeb;color:#160b17;border:1px solid;border-radius:50px;margin-left:auto;margin-right:auto;margin-bottom:1rem;width:fit-content;'>
    <p>Nombre:  <em>{name}</em></p>
    <p>Fecha:  <em>{date}</em></p>
    <p>Hora:  <em>{hour}</em></p>
    <p>Pax:  <em>{pax}</em></p>
    <p>Comentario:  <em>{comment}</em></p>
    <p>Teléfono:  <em>{tel}</em></p>
    </div>
    <div style='align-text:center'>
    <a style='text-decoration:none' href="https://4c3b-190-238-135-197.sa.ngrok.io/confirm-reservation?email={email}&name={name}&date={date}&hour={hour}&id={doc_id}"><button style='background-color:#fcfaeb;color:#160b17;padding:1rem;border:1px solid;display:block;margin-bottom:1rem;margin-left:auto;margin-right:auto;border-radius:50px;'>Confirmar</button></a>
    <a style='text-decoration:none' href="https://4c3b-190-238-135-197.sa.ngrok.io/reject-reservation?email={email}&name={name}&date={date}&hour={hour}&id={doc_id}"><button style='background-color:#fcfaeb;color:#160b17;padding:1rem;border:1px solid;display:block;margin-left:auto;margin-right:auto;border-radius:50px;'>Rechazar</button></a>
    </div>
    </body></html>
    '''

    msg.attach(MIMEText(html, 'html'))
    msg['From'] = "cafeyvinoapp@gmail.com"
    msg['To'] = to
    msg['Subject'] = subject

    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.starttls()
    server.login("cafeyvinoapp@gmail.com", "hhgwneoltsmuyymn")
    server.sendmail(msg['From'], msg['To'], msg.as_string())
    server.quit()
    return jsonify({"message": "Email sent successfully"})

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response

if __name__ == '__main__':
    app.run(debug = True, port = 8000)
    
