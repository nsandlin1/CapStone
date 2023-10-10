from flask import Blueprint, request, jsonify
from ..models import EnrolledClass, Ballot, Quiz, ClassElection, PolicyBallot, \
                     CandidateBallot, Question, Choice, Student, Teacher, ClassQuiz, Question, StudentQuiz
from ..extensions import db
from ..schemas import enrolled_class_schema, enrolled_classes_schema, \
                      ballot_schema, ballots_schema, class_elections_schema, \
                      quiz_schema, quizes_schema, questions_schema, question_schema, \
                      choice_schema, choices_schema, students_schema, class_quizzes_schema, questions_schema, student_quizes_schema
import json
import random

classes = Blueprint('classes', __name__)

@classes.route('/create_class')
def create_class():
    name = request.args.get("name")
    teacher = request.args.get("teacher")
    start_time = request.args.get("start_time")
    end_time = request.args.get("end_time")
    class_code = ''
    
    for i in range(6):
        # Determines if next character will be an int ar letter
        cointFlip = random.randrange(0,2)
        if cointFlip:
            # Int (ASCII)
            class_code += chr(random.randrange(48, 57))
        else:
            # Uppercase Letter (ASCII)
            class_code += chr(random.randrange(65, 90))

    if EnrolledClass.query.filter_by(name=name, teacher=teacher).all():
        return jsonify({'class-added': False, 'Error': 'Class Already Exists'}), 418

    db.session.add(EnrolledClass(
        None,
        name,
        teacher,
        start_time,
        end_time,
        class_code
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
    email = request.args.get('email')

    print(title)
    print(questions)

    if not title or not questions:
        return jsonify({'quiz_created': False, 'Error': 'insufficient variables'})
    print('post-if')
    
    teacher_id = Teacher.query.filter_by(email=email).all()
    
    db.session.add(Quiz(
        None,
        teacher_id[0].id,
        title
    ))
    db.session.commit()

    quiz_id = Quiz.query.filter_by(title=title).all()[0].id
    print(quiz_id)

    
    
    # Assigning a quiz to a class needs to be done in its own api call
    # db.session.add(ClassQuiz(
    #     teacher_id,

    # ))

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
    email = request.args.get('email')



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


# Given studentsEmail, returns class the student is enrolled in 
def get_student_class(studentEmail):

    studentClass = Student.query.filter_by(email=studentEmail).all()

    if (len(studentClass) > 0):
        return studentClass[0].enrolled_class

    return (-1)
    

# Given classId returns quizzes assigned to that class
def get_quiz_for_class(classId, studentEmail):

    quizzesLinkedToClass = ClassQuiz.query.filter_by(classid=classId).all()
    student = Student.query.filter_by(email=studentEmail).all()

    quizzes = []

    # Iterate through each quiz found in the class
    for quiz in quizzesLinkedToClass:

        # Get information, like the title
        quizInfo = Quiz.query.filter_by(id=quiz.quizid).all()

        student_quiz_exists = StudentQuiz.query.filter_by(studentid=student[0].id, quizid=quizInfo[0].id).first()
        
        if (student_quiz_exists):
            quizzes.append(
                {
                    'quizId': quizInfo[0].id,
                    'title': quizInfo[0].title,
                    'grade': student_quiz_exists.grade
                }
            )
        else:
            db.session.add(StudentQuiz(
                student[0].id,
                quizInfo[0].id,
                None
            ))
            db.session.commit()

            quizzes.append(
                {
                    'quizId': quizInfo[0].id,
                    'title': quizInfo[0].title,
                    'grade': None
                }
            )

    #Return all found quizzes as an array of dicts, in the format of 
    # {quizId: 1, title: 'Test Title'}
    return  quizzes


# Given quizId returns questions for that quiz
def get_questions_for_quiz(quizId):

    # Find available questions for a quiz
    questionsFound = Question.query.filter_by(quiz_id=quizId).order_by(Question.question_id.asc()).all()

    questions = []

    # Iterate through each question
    for question in questionsFound:
        # The question is Multiple Chioce
        if (question.quiz_type == 'MC'):
            choices = []
            # Find the available choices for the question (sorted by descending order)
            choicesFound = Choice.query.filter_by(question_id=question.question_id).order_by(Choice.which.asc()).all()
            # Add each choice to an array
            for choice in choicesFound:
                choices.append(
                    {
                        'letter': choice.which,
                        'text': choice.the_choice
                    }
                )
            questions.append(
                {
                    'question_id': question.question_id,
                    'text': question.question,
                    'question_type': question.quiz_type,
                    'choices': choices
                }
            )
        # The question is T/F
        else:
            questions.append(
                {
                    'question_id': question.question_id,
                    'text': question.question,
                    'question_type': question.quiz_type
                }
            )

    return questions


# Gets the available quizzes for students to take
@classes.route('/get_student_quizzes')
def get_student_quiz():

    student = request.args.get("email")

    # Get the class the student is enrolled in
    enrolled_class = get_student_class(student)

    # If no enrolled classes are found, return error
    if (enrolled_class == -1):
        return jsonify({'error':'No classes exist for given student'}), 404


    # Get the quiz for the enrolled class
    quizzes_for_class = get_quiz_for_class(enrolled_class, student)

    # If no quizzes are present, return error
    if (quizzes_for_class == -1):
        return jsonify({'error':'No quizzes exist for class given'}), 404


    # Get the questions for the quiz

    return (jsonify(quizzes_for_class))


@classes.route('/get_quiz_questions')
def get_quiz_questions():

    quizId = request.args.get('quizId')

    questions = get_questions_for_quiz(quizId)

    return (jsonify(questions))


@classes.route('/submit_quiz')
def submit_quiz():
    email = request.args.get('email')
    answers = json.loads(request.args.get('answers'))
    quizId = request.args.get('quizId')

    student = Student.query.filter_by(email=email).all()

    # All needed values are recieved
    # TODO check the submited answers against the answers in the db with the quiz id, and set the score in the StudenQuiz table

    correct = 0

    for question in answers:
        question_id = question['question_id']
        answer = question['selected']

        # Query the current question to get the correct answer
        question = Question.query.filter_by(question_id=question_id).all()
        correctAnswer = question[0].correct_option

        if (correctAnswer == answer):
            correct += 1

    grade = int((correct / len(answers)) * 100)

    stud_quiz = StudentQuiz.query.filter_by(studentid=student[0].id, quizid=quizId).first()


    if (stud_quiz):
        # Update the students grade for that quiz
        stud_quiz.grade = grade
        db.session.commit()
    else:
        db.session.add(StudentQuiz(
                student[0].id,
                quizId,
                grade
        ))
        db.session.commit()

    return (jsonify({'success': 'quiz has been submitted'}))


@classes.route('/get_assigned_quizzes')
def get_assigned_quizzes():
    email = request.args.get('email')

    teacherId = Teacher.query.filter_by(email=email).first().id
    classes = EnrolledClass.query.filter_by(teacher=email).all()
    quizzes = Quiz.query.filter_by(teacher=teacherId).all()

    for quiz in quizzes:
        
        

        for clas in classes:



    return ('hello')

    ...
