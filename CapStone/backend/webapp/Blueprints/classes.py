from flask import Blueprint, request, jsonify
from ..models import EnrolledClass, Ballot, Quiz, ClassElection, PolicyBallot, \
                     CandidateBallot, Question, Choice, Student, ClassQuiz, Question
from ..extensions import db
from ..schemas import enrolled_class_schema, enrolled_classes_schema, \
                      ballot_schema, ballots_schema, class_elections_schema, \
                      quiz_schema, quizes_schema, questions_schema, question_schema, \
                      choice_schema, choices_schema, students_schema, class_quizzes_schema, questions_schema
import json

classes = Blueprint('classes', __name__)

@classes.route('/create_class')
def create_class():
    name = request.args.get("name")
    teacher = request.args.get("teacher")
    start_time = request.args.get("start_time")
    end_time = request.args.get("end_time")

    if EnrolledClass.query.filter_by(name=name, teacher=teacher).all():
        return jsonify({'class-added': False, 'Error': 'Class Already Exists'}), 418

    db.session.add(EnrolledClass(
        None,
        name,
        teacher,
        start_time,
        end_time
    ))
    db.session.commit()

    return jsonify({'class-added': True})

# query by 1 attribute: id, name, OR, teacher; all if no attributes given
@classes.route('/get_class')
def get_class():
    id = request.args.get("id")
    name = request.args.get("name")
    teacher = request.args.get("teacher")

    if id:
        print(id)
        return enrolled_class_schema.jsonify(EnrolledClass.query.get(id))
    
    if name:
        print(name)
        print(EnrolledClass.query.filter_by(name=name).all())
        return enrolled_classes_schema.jsonify(EnrolledClass.query.filter_by(name=name).all())
    
    if teacher:
        print(teacher)
        print(EnrolledClass.query.filter_by(teacher=teacher).all())
        return enrolled_classes_schema.jsonify(EnrolledClass.query.filter_by(teacher=teacher).all())
    
    return enrolled_classes_schema.jsonify(EnrolledClass.query.all())

@classes.route('/create_ballot')
def create_ballot():
    classid = request.args.get("classid")
    election_title = request.args.get("electionName")
    selected_forms = json.loads(request.args.get("selectedForms"))

    print(classid)
    print(election_title)
    print(selected_forms)

    if Ballot.query.filter_by(election_title=election_title).all():
        print('already exists')
        return jsonify({'ballot(s)-added': False, 'Error': 'Ballot with that Name Already Exists'}), 418
    else:
        db.session.add(Ballot(
            None,
            election_title,
            classid
        ))
        db.session.commit()
    # get ballot id for insertion of forms
    ballot_id = Ballot.query.filter_by(election_title=election_title).all()[0].id

    for form in selected_forms:
        print(form)
        if form["type"] == 'policy':
            db.session.add(PolicyBallot(
                None,           # id
                ballot_id,      # ballot id
                form["policy"], # policy
                None,           # votes for
                None            # votes againse
            ))
            print('1 added')
        else:
            # form["type"] == 'candidate'
            for candidate in form["contestants"]:
                db.session.add(CandidateBallot(
                    None,                 # id
                    ballot_id,            # ballot id
                    form["position"],     # position
                    None,                 # votes for
                    candidate["party"],   # pol aff
                    candidate["name"]     # candidate
                ))
    db.session.commit()

    return jsonify({'ballot(s)-added': True})

@classes.route('/get_ballot')
def get_ballot():
    id = request.args.get('id')
    election_title = request.args.get('election_title')
    classid = request.args.get('classid')

    if id:
        return ballot_schema.jsonify(Ballot.query.get(id))
    if election_title:
        return ballot_schema.jsonify(Ballot.query.filter_by(election_title=election_title).all()[0])
    if classid:
        return ballots_schema.jsonify(Ballot.query.filter_by(classid=classid).all())
    
    return ballots_schema.jsonify(Ballot.query.all())

abcs = {i: chr(64 + i) for i in range(1, 27)}

@classes.route('/create_quiz')
def create_quiz():
    title = request.args.get('title')
    questions = json.loads(request.args.get('questions'))

    print(title)
    print(questions)

    if not title or not questions:
        return jsonify({'quiz_created': False, 'Error': 'insufficient variables'})
    print('post-if')
    
    db.session.add(Quiz(
        None,
        title
    ))
    db.session.commit()

    quiz_id = Quiz.query.filter_by(title=title).all()[0].id
    print(quiz_id)

    for q in questions:

        if q["type"] == "MC":
            db.session.add(Question(
                None,
                quiz_id,
                q["type"],
                q["question"],
                abcs[int(q["correct"])]
            ))
            db.session.commit()
            questionid = Question.query.filter_by(quiz_id=quiz_id, question=q["question"]).all()[0].question_id
            for which,the_choice in q["answers"].items():
                db.session.add(Choice(
                    questionid,
                    abcs[int(which)],
                    the_choice
                ))
            db.session.commit()
        else:
            db.session.add(Question(
                None,
                quiz_id,
                q["type"],
                q["question"],
                q["correct"]
            ))
            db.session.commit()

    return jsonify({'quiz_created': True})

@classes.route('/get_quiz')
def get_quiz():
    classid = request.args.get('classid')

    if classid:
        return quizes_schema.jsonify(Quiz.query.filter_by(classid=classid).all())
    
    return quizes_schema.jsonify(Quiz.query.all())

    # if ClassElection.query.filter_by(classid=classid).all():
    #     return jsonify({'election-added': False, 'Error': 'Election Already Exists'}), 418

    # db.session.add(ClassElection(
    #     classid,
    # ))
    # db.session.commit()

    # return jsonify({'election-added': True})

# @classes.route('get_election')
# def get_election():
#     classid = request.args.get("classid")

#     elections = ClassElection.query.filter_by(classid=classid).all()
#     print(elections)

#     elections2 = []
#     for e in elections:
#         ballot = Ballot.query.get(e.ballotid)
#         elections2.append({
#             "classid": e.classid,
#             "ballotid": e.ballotid,
#             "election_title": ballot.election_title
#         })

#     print(elections2)


def get_student_class(studentUsername):

    studentClass = Student.query.filter_by(email=studentUsername).all()

    return studentClass[0].enrolled_class

def get_quiz_for_class(classId):

    quizzes = ClassQuiz.query.filter_by(classid=classId).all()

    return  quizzes

def get_questions_for_quiz(quizId):

    print(quizId)
    questions = Question.query.filter_by(quiz_id=quizId).all()
    print(questions)

    return questions

@classes.route('/get_student_quiz')
def get_student_quiz():

    student = request.args.get("email")

    # Get the class the student is enrolled in
    enrolled_class = get_student_class(student)

    # Get the quiz for the enrolled class
    quiz_for_class = get_quiz_for_class(enrolled_class)

    # Get the questions for the quiz
    questions = get_questions_for_quiz(quiz_for_class[0].quizid)

    return (questions_schema.jsonify(questions))
 #   return (students_schema.jsonify(Student.query.filter_by(username=student).all()))
#     return jsonify(elections2)