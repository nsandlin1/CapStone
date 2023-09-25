from sqlalchemy import Column, Integer,  String, ForeignKey, \
                       DateTime, Boolean, Date, UniqueConstraint, \
                       ForeignKeyConstraint, PrimaryKeyConstraint
from sqlalchemy.orm import relationship
from .extensions import db


class Congressman(db.Model):
    __tablename__ = 'congressmen'

    id = Column(String(7), primary_key=True)
    branch = Column(String(6))
    first_name = Column(String(50), nullable=False)
    last_name = Column(String(50), nullable=False)
    state = Column(String(2), nullable=False)
    dob = Column(Date, nullable=False)
    party = Column(String(1), nullable=False)
    middle_name = Column(String(50))
    contact_form = Column(String(255))
    phone = Column(String(13))
    facebook = Column(String(255))
    twitter = Column(String(255))
    youtube = Column(String(255))
    website = Column(String(255))

    def __init__(self, id, branch, first_name, last_name, state, dob, party, middle_name=None, contact_form=None, phone=None, facebook=None, twitter=None, youtube=None, website=None):
        self.id = id
        self.branch = branch
        self.first_name = first_name
        self.last_name = last_name
        self.state = state
        self.dob = dob
        self.party = party
        self.middle_name = middle_name
        self.contact_form = contact_form
        self.phone = phone
        self.facebook = facebook
        self.twitter = twitter
        self.youtube = youtube
        self.website = website

    def __repr__(self):
        return f'<Congressman "{self.id} {self.first_name} {self.last_name}">'

class JpegUrl(db.Model):
    __tablename__ = 'congressmen_images'

    id = Column(String(7), primary_key=True)
    image_url = Column(String(255), nullable=False)

    def __init__(self, id, image_url):
        self.id = id
        self.image_url = image_url

    def __repr__(self):
        return f'<JpegUrl "{self.id} {self.image_url}">'

class StateCongressman(db.Model):
    __tablename__ = 'state_congressmen'

    id = Column(String(100), primary_key=True)
    name = Column(String(50), nullable=False)
    party = Column(String(10), nullable=False)
    branch = Column(String(14), nullable=False)
    district = Column(Integer, nullable=False)
    state = Column(String(2), nullable=False)
    image_url = Column(String(255))
    openstates_url = Column(String(255))

    def __init__(self, id, name, party, branch, district, state, image_url=None, openstates_url=None):
        self.id = id
        self.name = name
        self.party = party
        self.branch = branch
        self.district = district
        self.state = state
        self.image_url = image_url
        self.openstates_url = openstates_url

    def __repr__(self):
        return f'<StateCongressman "{self.name}">'
        
class Bill(db.Model):
    __tablename__ = 'bills'

    title = Column(String(255), primary_key=True)
    number = Column(Integer, nullable=False)
    content_url = Column(String(255), nullable=False)
    summary_short = Column(String(1500))
    summary_med = Column(String(2000))
    summary_long = Column(String(2500))
    origin_chamber = Column(String(6))
    update_date = Column(Date)

    def __init__(self, title, number, content_url, summary_short=None, summary_med=None, summary_long=None, origin_chamber=None, update_date=None):
        self.title = title
        self.number = number
        self.content_url = content_url
        self.summary_short = summary_short
        self.summary_med = summary_med
        self.summary_long = summary_long
        self.origin_chamber = origin_chamber
        self.update_date = update_date

    def __repr__(self):
        return f'<Bill "{self.title}">'

class StateMajority(db.Model):
    __tablename__ = 'state_majority'

    state = Column(String(2), nullable=False, primary_key=True)
    majority = Column(String(1), nullable=False)
    branch = Column(String(8), nullable=True)

    def __init__(self, state, majority, branch):
        self.state = state
        self.majority = majority
        self.branch = branch

    def __repr__(self):
        return f'<StateSenateMajority "{self.state} {self.majority} {self.branch}">'
    
class News(db.Model):
    __tablename__ = 'news'

    title = Column(String(255), primary_key=True)
    abstract = Column(String(1000))
    published_date = Column(DateTime)
    url = Column(String(255))
    company = Column(String(100))
    imgURL = Column(String(255))

    def __init__(self, title, abstract, published_date, url, company, imgURL):
        self.title = title
        self.abstract = abstract
        self.published_date = published_date
        self.url = url
        self.company = company
        self.imgURL = imgURL
    
    def __repr__(self):
        return f'<News "{self.title[:30]}">'
    
class Election(db.Model):
    __tablename__ = 'elections'

    id = Column(Integer, primary_key=True)
    name = Column(String(75))
    election_day = Column(Date)

    def __init__(self, id, name, election_day):
        self.id = id
        self.name = name
        self.election_day = election_day
    
    def __repr__(self):
        return f'<Election "{self.name}">'

class EnrolledClass(db.Model):
    __tablename__ = 'enrolled_classes'

    id = Column(Integer, primary_key=True)
    name = Column(String(50))
    teacher = Column(String(30), ForeignKey('teachers.username'))

    __table_args__ = (UniqueConstraint("name", "teacher", name="name_teacher_unique"),)

    def __init__(self, id, name, teacher):
        self.id = id
        self.name = name
        self.teacher = teacher
    
    def __repr__(self):
        return f'<EnrolledClass "{self.name}">'

class User(db.Model):
    __tablename__ = 'users'

    email = Column(String(255), primary_key=True)
    password = Column(String(255))
    username = Column(String(30))
    first_name = Column(String(50))
    last_name = Column(String(50))
    role = Column(String(7))

    __table_args__ = (UniqueConstraint("username", name="username_unique"),)

    def __init__(self, email, password, username, first_name, last_name, role):
        self.email = email
        self.password = password
        self.username = username
        self.first_name = first_name
        self.last_name = last_name
        self.role = role
    
    def __repr__(self):
        return f'<User "{self.email}">'
    
class Teacher(db.Model):
    __tablename__ = 'teachers'

    id = Column(Integer, primary_key=True)
    username = Column(String(30), ForeignKey('users.username'), nullable=False)

    __table_args__ = (
        UniqueConstraint("username", name="username_unique"),
    )
    
    def __init__(self, id, username):
        self.id = id
        self.username = username
    
    def __repr__(self):
        return f'<Teacher "{self.id}, {self.username}>'

class Student(db.Model):
    __tablename__ = 'students'

    id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String(30), ForeignKey('users.username'))
    enrolled_class = Column(String(50), ForeignKey('enrolled_classes.id'))

    __table_args__ = (UniqueConstraint("username", name="username_unique"),)

    def __init__(self, id, username, enrolled_class):
        self.id = id
        self.username = username
        self.enrolled_class = enrolled_class
    
    def __repr__(self):
        return f'<Student "{self.id}, {self.username}">'

class Quiz(db.Model):
    __tablename__ = 'quizes'

    id = Column(Integer, primary_key=True)
    title = Column(String(50))

    __table_args__ = (UniqueConstraint("title", name="title_unique"),)

    def __init__(self, id, title):
        self.id = id
        self.title = title

    def __repr__(self):
        return f'<Quiz "{self.id}, {self.title}">'
    
class Question(db.Model):
    __tablename__ = 'questions'

    quiz_id = Column(Integer, ForeignKey('quizes.id'), primary_key=True)
    question = Column(String(200))
    option1 = Column(String(100))
    option2 = Column(String(100))
    option3 = Column(String(100))
    option4 = Column(String(100))
    correct_option = Column(String(1))
    
    def __init__(self, quiz_id, question, option1, option2, option3, option4, correct_option):
        self.quiz_id = quiz_id
        self.question = question
        self.option1 = option1
        self.option2 = option2
        self.option3 = option3
        self.option4 = option4
        self.correct_option = correct_option

    def __repr__(self):
        return f'<Question "{self.question}">'

class Ballot(db.Model):
    __tablename__ = 'ballots'

    id = Column(Integer, primary_key=True)
    election_title = Column(String(100))

    __table_args__ = (
        UniqueConstraint("election_title", name="election_title_unique"),
    )

    def __init__(self, id, election_title):
        self.id = id
        self.election_title = election_title
    
    def __repr__(self):
        return f'<Ballot "{self.election_title}">'
    
class CandidateBallot(db.Model):
    __tablename__ = 'candidate_ballots'

    id = Column(Integer, primary_key=True)
    position = Column(String(200))
    pol_aff = Column(String(50))
    votes_for = Column(String(200))
    candidate = Column(String(100))

    def __init__(self, id, position, pol_aff, votes_for, candidate):
        self.id = id
        self.position = position
        self.pol_aff = pol_aff
        self.votes_for = votes_for
        self.candidate = candidate

    def __repr__(self):
        ...

class PolicyBallot(db.Model):
    __tablename__ = 'policy_ballots' 

    policy_num = Column(Integer, primary_key=True)
    policy = Column(String(200))
    votes_for = Column(String(200))
    votes_against = Column(String(200))  

    def __init__(self, pol_num, policy, votes_for, votes_against):
        self.pol_num = pol_num
        self.policy = policy
        self.votes_for = votes_for
        self.votes_against = votes_against

    def __repr__(self):
        ...

class ClassElection(db.Model):
    __tablename__ = 'class_elections'

    classid = Column(Integer, ForeignKey('enrolled_classes.id'))
    ballotid = Column(Integer, ForeignKey('ballots.id'))
    
    __table_args__ = (
        PrimaryKeyConstraint(classid, ballotid),
    )

    def __init__(self, classid, ballotid):
        self.classid = classid
        self.ballotid = ballotid

    def __repr__(self):
        return f'<Election "{self.classid}, {self.ballotid}">'
    
class ClassQuiz:
    __tablename__ = 'class_quizzes'

    classid = Column(Integer, ForeignKey('enrolled_classes.id'))
    quizid = Column(Integer, ForeignKey('quizes.id'))

    __table_args__ = (
        PrimaryKeyConstraint(classid, quizid),
    )

    def __init__(self, classid, quizid):
        self.classid = classid
        self.quizid = quizid
    
    def __repr__(self):
        return f'<ClassQuiz "{self.classid}, {self.quizid}">'

class StudentQuiz:
    __tablename__ = 'student_quizzes'

    studentid = Column(Integer)
    quizid = Column(Integer)
    grade = Column(String(1))

    __table_args__ = (
        PrimaryKeyConstraint(studentid, quizid),
    )

    def __init__(self, studentid, quizid, grade):
        self.studentid = studentid
        self.quizid = quizid
        self.grade = grade
    
    def __repr__(self):
        return f'<StudentQuiz "{self.studentid}, {self.quizid}">'
    
class BallotInfo:
    __tablename__ = 'ballot_info'

    ballotid = Column(Integer, ForeignKey('ballots.id'))
    candidateid = Column(Integer, ForeignKey('candidate_ballots.id'))
    policy_number = Column(Integer, ForeignKey('policy_ballots.policy_num'))

    __table_args__ = (
        PrimaryKeyConstraint(ballotid, candidateid, policy_number),
    )

    def __init__(self, ballotid, candidateid, policy_number):
        self.ballotid = ballotid
        self.candidateid = candidateid
        self.policy_number = policy_number
    
    def __repr__(self):
        return f'<BallotInfo "{self.ballotid}, {self.candidateid}, {self.policy_number}">'

class StudentVote:
    __tablename__ = 'student_votes'

    ballotid = Column(Integer, ForeignKey('ballots.id'))
    studentid = Column(Integer, ForeignKey('students.id'))
    voted = Column(Boolean) # what type and fk to where

    __table_args__ = (
        PrimaryKeyConstraint(ballotid, studentid),
    )

    def __init__(self, ballotid, studentid, voted):
        self.ballotid = ballotid
        self.studentid = studentid
        self.voted = voted

    def __repr__(self):
        return f'<StudentVote "{self.ballotid}, {self.studentid}">'