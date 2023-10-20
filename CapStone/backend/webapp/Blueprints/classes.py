from flask import Blueprint, request, jsonify
from ..models import EnrolledClass, Ballot, Quiz, ClassElection, PolicyBallot, \
                     CandidateBallot, Question, Choice, Student, Teacher, ClassQuiz, Question, StudentQuiz, \
                     StudentVote, BallotInfo
from ..extensions import db
from ..schemas import enrolled_class_schema, enrolled_classes_schema, \
                      ballot_schema, ballots_schema, class_elections_schema, \
                      quiz_schema, quizes_schema, questions_schema, question_schema, \
                      choice_schema, choices_schema, students_schema, class_quizzes_schema, questions_schema, student_quizes_schema
import json
import random
from datetime import datetime

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
                0,           # votes for
                0           # votes againse
            ))
            print('1 added')
        else:
            # form["type"] == 'candidate'
            for candidate in form["contestants"]:
                db.session.add(CandidateBallot(
                    None,                 # id
                    ballot_id,            # ballot id
                    form["position"],     # position
                    candidate["party"],   # pol aff
                    0,                 # votes for
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
    due_date = datetime.strptime(request.args.get('due_date'), '%m-%d-%Y %H:%M:%S')

    print(title)
    print(questions)

    if not title or not questions:
        return jsonify({'quiz_created': False, 'Error': 'insufficient variables'})
    print('post-if')
    
    teacher_id = Teacher.query.filter_by(email=email).all()
    
    print("1")
    print("title " + title)
    print("due_date", due_date)
    db.session.add(Quiz(
        None,
        teacher_id[0].id,
        title,
        due_date
    ))
    db.session.commit()
    print("2")
    quiz_id = Quiz.query.filter_by(title=title).all()[0].id
    print(quiz_id)

    
    
    # Assigning a quiz to a class needs to be done in its own api call
    # db.session.add(ClassQuiz(
    #     teacher_id,

    # ))

    print("3")
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
    print("4")
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
                    'grade': student_quiz_exists.grade,
                    'due_date': quizInfo[0].due_date
                }
            )
        else:
            db.session.add(StudentQuiz(
                student[0].id,
                quizInfo[0].id,
                None,
            ))
            db.session.commit()

            quizzes.append(
                {
                    'quizId': quizInfo[0].id,
                    'title': quizInfo[0].title,
                    'grade': None,
                    'due_date': quizInfo[0].due_date,
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


# Called when the student submits their quiz
# Checks submitted answers, assigns a score to the database under StudentQuiz table
@classes.route('/submit_quiz')
def submit_quiz():
    email = request.args.get('email')
    answers = json.loads(request.args.get('answers'))
    quizId = request.args.get('quizId')

    student = Student.query.filter_by(email=email).all()

    correct = 0

    print(answers)

    for question in answers:
        question_id = question['question_id']
        answer = question['selected']

        print(answer)

        # Query the current question to get the correct answer
        question = Question.query.filter_by(question_id=question_id).all()
        correctAnswer = question[0].correct_option

        print(correctAnswer)

        # Check if answer is correct
        if (correctAnswer == answer):
            correct += 1

    # Get grade as a precentage
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


# Returns a list of all quizzes created by teacher
# Determines if quiz is assigned to class
@classes.route('/get_assigned_quizzes')
def get_assigned_quizzes():
    email = request.args.get('email')

    teacherId = Teacher.query.filter_by(email=email).first().id
    classes = EnrolledClass.query.filter_by(teacher=email).all()
    quizzes = Quiz.query.filter_by(teacher=teacherId).all()

    # Used to store the return information (array of quiz dicts)
    class_and_quizzes = []

    # For each quiz go through each taught class
    for quiz in quizzes:
        quiz_and_class = []

        # For each class determine if the quiz is assigned to the current class
        for clas in classes:
            selected = False
            assigned = ClassQuiz.query.filter_by(classid=clas.id, quizid=quiz.id).all()

            # If it is assigned, set selected to true
            if (assigned):
                selected = True
            
            quiz_and_class.append({
                'classId': clas.id,
                'classTitle': clas.name,
                'selected': selected
            })

        class_and_quizzes.append(
            {
                'quizId': quiz.id,
                'title': quiz.title,
                'listOfClasses': quiz_and_class
            }
        )   

    return (jsonify(class_and_quizzes))

# Updates which classes a quiz is assigned to
@classes.route('/update_quiz_assignments')
def update_quiz_assignments():
    data = json.loads(request.args.get('data'))

    for clas in data['classes']:
        selected = clas['selected']

        classQuiz = ClassQuiz.query.filter_by(classid=clas['classId'], quizid=data['quizId']).all()

        if (selected and not classQuiz):
            db.session.add(ClassQuiz(
                clas['classId'],
                data['quizId']
            ))
            db.session.commit()
        elif (classQuiz and not selected):
            db.session.delete(classQuiz[0])
            db.session.commit()

    return (jsonify({'success': 'Changes successfully saved.'}))


# Gets the ballots assigned to a students class, with a flag showing if the student has voted or not
@classes.route('/get_class_ballots')
def get_class_ballots():

    student = request.args.get('email')
    studentId = Student.query.filter_by(email=student).first()

    # get class the student is enrolled in
    studClass = get_student_class(student)
    # checks if class was found for the specified student
    if (studClass == -1):
        # returns error if no class found
        return (jsonify({'error': 'Could not find any classes for specified user.'}))

    # Finds all ballots for a class
    ballots = Ballot.query.filter_by(classid=studClass).all()

    returnBallots = []

    for ballot in ballots:
        print(ballot.election_title)
        hasVoted = StudentVote.query.filter_by(ballotid=ballot.id, studentid=studentId.id).all()
        print(hasVoted)
        voted = False
        if (hasVoted):
            voted = True

        returnBallots.append({
            'ballotNum': ballot.id,
            'electionTitle': ballot.election_title,
            'voted': voted
        })

    return (jsonify(returnBallots))


# Gets all contests for a given election
@classes.route('/get_ballot_contests')
def get_ballot_contests():

    # Get the requested ballot id
    ballotid = request.args.get('ballotNum')

    # Get all policy and candidate contests for an election
    policy_contests = PolicyBallot.query.filter_by(ballot_id=ballotid).all()
    candidate_contests = CandidateBallot.query.filter_by(ballot_id=ballotid).all()

    # Array of contests to be returned
    returnContests = []

    # Keep track of where the curent contest is in the return array 
    index = 0
    
    # Iterate through all policies and add them to the return array
    for policy in policy_contests:
        returnContests.append({
            'vote': None,
            'contestType': 'policy',
            'policyNum': policy.policy_num,
            'policy': policy.policy
        })
        index += 1

    # Dictionary to find where the contest for certain position is
    positions = {}

    print(candidate_contests)

    # Iterate through all candidates
    for candidate in candidate_contests:

        # If the current candidates position does no appear in the dictionary already
        # Add the contest to the return array and increment the index
        if (candidate.position not in positions):
            positions[candidate.position] = index
            index += 1
            returnContests.append({
                'vote': None,
                'contestNum': candidate.id,
                'contestType': 'candidate',
                'position': candidate.position,
                'candidates': [{
                    'name': candidate.candidate,
                    'candidate_id': candidate.id,
                    'party': candidate.pol_aff
                }]
            })

        # If the contest for that position already exists
        # Find its position in the return array and append the current candidates name 
        else:
            idx = positions[candidate.position]
            returnContests[idx]['candidates'].append({
                    'name': candidate.candidate,
                    'candidate_id': candidate.id,
                    'party': candidate.pol_aff
                })


    return (jsonify(returnContests))


# Submits a students votes
@classes.route('/submit_ballot_votes')
def submit_ballot_votes():

    email = request.args.get('email')
    votes = json.loads(request.args.get('votes'))
    ballotNum = request.args.get('ballotNum')

    studentId = Student.query.filter_by(email=email).first()


    # Iterate through the contests on the ballot
    for vote in votes:
        # Check the contest type
        if (vote['contestType'] == 'policy'):

            # Get policy ballot so we can update the votes for or against
            policy = PolicyBallot.query.filter_by(policy_num=vote['policyNum']).first()
            if (vote['vote'] == 'yay'):
                policy.votes_for = policy.votes_for + 1 
            elif (vote['vote'] == 'nay'):
                policy.votes_against += 1

        else:

            # Get candidate ballot so we can add votes to the respective candidate
            candidateBallot = CandidateBallot.query.filter_by(ballot_id=ballotNum, id=vote['vote']).first()

            candidateBallot.votes_for += 1
            
    # Make a record that the student has voted on that election
    db.session.add(StudentVote(
        ballotNum,
        studentId.id,
        1
    ))
        
    db.session.commit()

    return(jsonify({'success': 'Successfully submitted votes for the election'}))


# Gets the results of a given election
@classes.route('/get_election_results')
def get_election_results():

    # Get the requested ballot id
    ballotid = request.args.get('ballotNum')

    # Get all policy and candidate contests for an election
    policy_contests = PolicyBallot.query.filter_by(ballot_id=ballotid).all()
    candidate_contests = CandidateBallot.query.filter_by(ballot_id=ballotid).all()
    classId = Ballot.query.filter_by(id=ballotid).all()

    #enrolled_classid = EnrolledClass.query.filter_by(id=classId[0].classid).first()

    num_students_vote = StudentVote.query.filter_by(ballotid=ballotid).count()

    num_students_enrolled = Student.query.filter_by(enrolled_class=classId[0].classid).count()


    # Contains:
    # { All candidateContest with percentage of votes for each candidate }
    # { All policyContest with percentage of votes for and against}
    # { EligibleVotes: Int, TotalVote: Int}
    returnArr = {
        'contests': []
    }

    # Keep track of where the curent contest is in the return array 
    index = 0
    
    # Iterate through all policies and add them to the return array
    for policy in policy_contests:

        totalCastedVotes = policy.votes_for + policy.votes_against

        if (totalCastedVotes != 0):
            percentVotesFor = round((policy.votes_for/totalCastedVotes*100),2)
            percentVotesAgainst = round((policy.votes_against/totalCastedVotes*100),2)
        else:
            percentVotesAgainst, percentVotesFor = 0, 0


        returnArr['contests'].append({
            'votesFor': percentVotesFor,
            'votesAgainst': percentVotesAgainst,
            'contestType': 'policy',
            'policyNum': policy.policy_num,
            'policy': policy.policy
        })
        index += 1

    # Dictionary to find where the contest for certain position is
    positions = {}

    # Iterate through all candidates
    for candidate in candidate_contests:

        # If the current candidates position does no appear in the dictionary already
        # Add the contest to the return array and increment the index
        if (candidate.position not in positions):

            # Keep track of the positions index and total votes accounted for that position
            positions[candidate.position] = [index, candidate.votes_for]

            index += 1

            returnArr['contests'].append({
                'totalVotes': 0,
                'contestNum': candidate.id,
                'contestType': 'candidate',
                'position': candidate.position,
                'candidates': [{
                    'name': candidate.candidate,
                    'candidate_id': candidate.id,
                    'party': candidate.pol_aff,
                    'votesFor': candidate.votes_for
                }]
            })

        # If the contest for that position already exists
        # Find its position in the return array and append the current candidates name 
        else:
            idx = positions[candidate.position][0]

            positions[candidate.position][1] += candidate.votes_for

            returnArr['contests'][idx]['candidates'].append({
                    'name': candidate.candidate,
                    'candidate_id': candidate.id,
                    'party': candidate.pol_aff,
                    'votesFor': candidate.votes_for
                })

    for position in positions:
        returnArr['contests'][positions[position][0]]['totalVotes'] += positions[position][1]

    returnArr['totalVotes'] = num_students_vote
    returnArr['totalStudents'] = num_students_enrolled

    return(jsonify(returnArr))