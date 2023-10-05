from flask import Blueprint, request, jsonify
from ..models import EnrolledClass, Ballot, Quiz, ClassElection, PolicyBallot, \
                     CandidateBallot
from ..extensions import db
from ..schemas import enrolled_class_schema, enrolled_classes_schema, \
                      ballot_schema, ballots_schema, class_elections_schema
import json

classes = Blueprint('classes', __name__)

@classes.route('/create_class')
def create_class():
    name = request.args.get("name")
    teacher = request.args.get("teacher")

    if EnrolledClass.query.filter_by(name=name, teacher=teacher).all():
        return jsonify({'class-added': False, 'Error': 'Class Already Exists'}), 418

    db.session.add(EnrolledClass(
        None,
        name,
        teacher
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

@classes.route('/create_quiz')
def create_quiz():
    ...

@classes.route('/get_quiz')
def get_quiz():
    ...

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

#     return jsonify(elections2)