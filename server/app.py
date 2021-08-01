from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///rucv.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)


class Sentence(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String)
    filename = db.Column(db.String)
    score = db.Column(db.Integer)

    speaker_id = db.Column(db.Integer, db.ForeignKey('speaker.id'), nullable=False)
    speaker = db.relationship('Speaker') # TODO need backref?

    def __repr__(self):
        return f'<Sentence {repr(self.id)}>'


class Speaker(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    gender = db.Column(db.String)

    def __repr__(self):
        return f'<Speaker {repr(self.id)}>'


@app.route('/')
def index():
    sentences = Sentence.query.order_by(Sentence.score.asc()).paginate()
    return render_template('page.html', sentences=sentences.items)
