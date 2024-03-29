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
    teacher = Column(String(30), ForeignKey('teachers.email'))
    start_time = Column(String(5))
    end_time = Column(String(5))
    class_code = Column(String(6))

    __table_args__ = (UniqueConstraint("name", "teacher", "start_time", name="class_teacher_time_unique"),)

    def __init__(self, id, name, teacher, start_time, end_time, class_code):
        self.id = id
        self.name = name
        self.teacher = teacher
        self.start_time = start_time
        self.end_time = end_time
        self.class_code = class_code
    
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
    email = Column(String(30), ForeignKey('users.email'), nullable=False)

    __table_args__ = (
        UniqueConstraint("email", name="email_unique"),
    )
    
    def __init__(self, id, email):
        self.id = id
        self.email = email
    
    def __repr__(self):
        return f'<Teacher "{self.id}, {self.email}>'

class Student(db.Model):
    __tablename__ = 'students'

    id = Column(Integer, primary_key=True, autoincrement=True)
    email = Column(String(30), ForeignKey('users.email'))
    enrolled_class = Column(String(50), ForeignKey('enrolled_classes.id'))

    __table_args__ = (UniqueConstraint("email", name="email_unique"),)

    def __init__(self, id, email, enrolled_class):
        self.id = id
        self.email = email
        self.enrolled_class = enrolled_class
    
    def __repr__(self):
        return f'<Student "{self.id}, {self.email}">'

class Quiz(db.Model):
    __tablename__ = 'quizes'

    id = Column(Integer, primary_key=True)
    teacher = Column(String(30), ForeignKey('teachers.id'))
    title = Column(String(50))
    due_date = Column(DateTime)

    __table_args__ = (UniqueConstraint("title", name="title_unique"),)

    def __init__(self, id, teacher, title, due_date):
        self.id = id
        self.teacher = teacher
        self.title = title
        self.due_date = due_date

    def __repr__(self):
        return f'<Quiz "{self.id}, {self.teacher}, {self.title}">'
    
class Question(db.Model):
    __tablename__ = 'questions'

    question_id = Column(Integer, primary_key=True)
    quiz_id = Column(Integer, ForeignKey('quizes.id'))
    quiz_type = Column(String(2))
    question = Column(String(200))
    correct_option = Column(String(5))

    __table_args__ = (
        UniqueConstraint("quiz_id", "question", name="quizid_question_unique"),
    )
    
    def __init__(self, question_id, quiz_id, quiz_type, question, correct_option):
        self.question_id = question_id
        self.quiz_id = quiz_id
        self.quiz_type = quiz_type
        self.question = question
        self.correct_option = correct_option

    def __repr__(self):
        return f'<Question "{self.question}">'

class Choice(db.Model):
    __tablename__ = 'choices'

    question_id = Column(Integer, ForeignKey('questions.question_id'))
    which = Column(String(1)) # A, B, C, etc.
    the_choice = Column(String(200))

    __table_args__ = (
        PrimaryKeyConstraint(question_id, the_choice),
    )

    def __init__(self, question_id, which, the_choice):
        self.question_id = question_id
        self.which = which
        self.the_choice = the_choice

    def __repr__(self):
        return f'<Choice "{self.question_id, self.which, self.the_choice}"'

class Ballot(db.Model):
    __tablename__ = 'ballots'

    id = Column(Integer, primary_key=True)
    election_title = Column(String(100))
    classid = Column(Integer, ForeignKey('enrolled_classes.id'))

    __table_args__ = (
        UniqueConstraint("election_title", name="election_title_unique"),
    )

    def __init__(self, id, election_title, classid):
        self.id = id
        self.election_title = election_title
        self.classid = classid
    
    def __repr__(self):
        return f'<Ballot "{self.election_title}">'
    
class CandidateBallot(db.Model):
    __tablename__ = 'candidate_ballots'

    id = Column(Integer, primary_key=True)
    ballot_id = Column(Integer, ForeignKey('ballots.id'))
    position = Column(String(200))
    pol_aff = Column(String(50))
    votes_for = Column(Integer)
    candidate = Column(String(100))

    def __init__(self, id, ballot_id, position, pol_aff, votes_for, candidate):
        self.id = id
        self.ballot_id = ballot_id
        self.position = position
        self.pol_aff = pol_aff
        self.votes_for = votes_for
        self.candidate = candidate

    def __repr__(self):
        return f'<CandidateBallot "{self.ballot_id, self.id, self.position, self.candidate, self.pol_aff, self.votes_for}">'

class PolicyBallot(db.Model):
    __tablename__ = 'policy_ballots' 

    policy_num = Column(Integer, primary_key=True)
    ballot_id = Column(Integer, ForeignKey('ballots.id'))
    policy = Column(String(200))
    votes_for = Column(Integer)
    votes_against = Column(Integer)  

    def __init__(self, pol_num, ballot_id, policy, votes_for, votes_against):
        self.pol_num = pol_num
        self.ballot_id = ballot_id
        self.policy = policy
        self.votes_for = votes_for
        self.votes_against = votes_against

    def __repr__(self):
        return f'<PolicyBallot "{self.ballot_id, self.policy_num, self.policy, self.votes_for, self.votes_against}">'

class ClassElection(db.Model):
    __tablename__ = 'class_elections'

    classid = Column(Integer, ForeignKey('enrolled_classes.id'))
    ballotid = Column(Integer, ForeignKey('ballots.id'))
    
    __table_args__ = (
        PrimaryKeyConstraint(classid, ballotid),
    )

    def __init__(self, classid, election_name, ballotid):
        self.classid = classid
        self.election_name = election_name
        self.ballotid = ballotid

    def __repr__(self):
        return f'<Election "{self.classid}, {self.ballotid}">'
    
class ClassQuiz(db.Model):
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

class StudentQuiz(db.Model):
    __tablename__ = 'student_quizzes'

    studentid = Column(Integer, ForeignKey('students.id'))
    quizid = Column(Integer, ForeignKey('quizes.id'))
    grade = Column(Integer)

    __table_args__ = (
        PrimaryKeyConstraint(studentid, quizid),
    )

    def __init__(self, studentid, quizid, grade):
        self.studentid = studentid
        self.quizid = quizid
        self.grade = grade
    
    def __repr__(self):
        return f'<StudentQuiz "{self.studentid}, {self.quizid}">'
    
class BallotInfo(db.Model):
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

class StudentVote(db.Model):
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