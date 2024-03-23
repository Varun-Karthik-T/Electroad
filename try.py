import os
from flask import Flask, jsonify, request
from flask_mail import Mail, Message

app = Flask(__name__)

# Retrieve sensitive information from environment variables
MAIL_USERNAME = os.environ.get('MAIL_USERNAME')
MAIL_PASSWORD = os.environ.get('MAIL_PASSWORD')

# Check if environment variables are set
if not MAIL_USERNAME or not MAIL_PASSWORD:
    raise ValueError("Please set MAIL_USERNAME and MAIL_PASSWORD environment variables.")

# Configuring Flask-Mail
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 465  # Use secure SMTP (SMTPS)
app.config['MAIL_USE_SSL'] = True  # Use SSL for enhanced security
app.config['MAIL_USERNAME'] = MAIL_USERNAME
app.config['MAIL_PASSWORD'] = MAIL_PASSWORD

mail = Mail(app)

@app.route('/send_email', methods=['POST'])
def send_email():
    try:
        data = request.get_json()
        recipient = data.get('recipient')
        subject = data.get('subject')
        body = data.get('body')

        # Validate input data
        if not recipient or not subject or not body:
            return jsonify({'error': 'Recipient, subject, and body are required.'}), 400

        # Creating the email message
        msg = Message(subject, sender=MAIL_USERNAME, recipients=[recipient])
        msg.body = body

        # Sending the email
        mail.send(msg)

        return jsonify({'message': 'Email sent successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
