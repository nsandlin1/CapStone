from .extensions import ma
from .models import *

# marshmallow allows serialization for returning objects through RESTful-required json

class CongressmanSchema(ma.Schema):
    class Meta:
        model = Congressman
        fields = ('id', 'branch', 'first_name', 'last_name', 'state', 'dob', 'party', 'middle_name', 'contact_form', 'phone', 'facebook', 'twitter', 'youtube', 'website')
    
congressman_schema = CongressmanSchema()
congressmen_schema = CongressmanSchema(many=True)

class JpegUrlSchema(ma.Schema):
    class Meta:
        model = JpegUrl
        fields = ('id', 'image_url')

jpeg_url_schema = JpegUrlSchema()
jpeg_urls_schema = JpegUrlSchema(many=True)

class BillSchema(ma.Schema):
    class Meta:
        model = Bill
        fields = ("title",  "number", "content_url", "summary_short", "summary_med", "summary_long", "originChamber", "updateDate")

bill_schema = BillSchema()
bills_schema = BillSchema(many=True)

class UserSchema(ma.Schema):
    class Meta:
        model = User
        fields = ("email", "password", "username", "first_name", "last_name", "role")

user_schema = UserSchema()
users_schema = UserSchema(many=True)

class StateCongressmanSchema(ma.Schema):
    class Meta:
        model = StateCongressman
        fields = ("id", "name", "party", "branch", "district", "state", "image_url", "openstates_url")

state_congressman_schema = StateCongressmanSchema()
state_congressmen_schema = StateCongressmanSchema(many=True)

class StateMajority(ma.Schema):
    class Meta:
        model = StateMajority
        fields = ("state", "majority", "branch")

state_senate_majority_schema = StateMajority()
state_senate_majority_schema = StateMajority(many=True)
class NewsSchema(ma.Schema):
    class Meta:
        model = News
        fields = ("title", "abstract", "published_date", "url", "company", "imgURL")

news_schema = NewsSchema()
many_news_schema = NewsSchema(many=True)

class ElectionSchema(ma.Schema):
    class Meta:
        model = Election
        fields = ("id", "name", "election_day")

election_schema = ElectionSchema()
elections_schema = ElectionSchema(many=True)

class TeacherSchema(ma.Schema):
    class Meta:
        model = Teacher
        fields = ("id", "email")
    
teacher_schema = TeacherSchema()
teachers_schema = TeacherSchema(many=True)

class StudentSchema(ma.Schema):
    class Meta:
        model = Student
        fields = ("id", "email", "enrolled_class")

student_schema = StudentSchema()
students_schema = StudentSchema(many=True)

class EnrolledClassSchema(ma.Schema):
    class Meta:
        model = EnrolledClass
        fields = ("id", "name", "teacher", "start_time", "end_time", "class_code")

enrolled_class_schema = EnrolledClassSchema()
enrolled_classes_schema = EnrolledClassSchema(many=True)

class QuizSchema(ma.Schema):
    class Meta:
        model = Quiz
        fields = ("id", "title", "due_date")
    
quiz_schema = QuizSchema()
quizes_schema = QuizSchema(many=True)

class QuestionSchema(ma.Schema):
    class Meta:
        model = Question
        fields = ("question_id", "quiz_id", "quiz_type", "question", "correct_option")

question_schema = QuestionSchema()
questions_schema = QuestionSchema(many=True)

class ChoiceSchema(ma.Schema):
    class Meta:
        model = Choice
        fields = ("question_id", "which", "the_choice")

choice_schema = ChoiceSchema()
choices_schema = ChoiceSchema(many=True)

class BallotSchema(ma.Schema):
    class Meta:
        model = Ballot
        fields = ("id", "election_title", "classid")
    
ballot_schema = BallotSchema()
ballots_schema = BallotSchema(many=True)

class CandidateBallotSchema(ma.Schema):
    class Meta:
        model = CandidateBallot
        fields = ("id", "ballot_id", "position", "pol_aff", "votes_for", "candidate")

candidate_ballot_schema = CandidateBallotSchema()
candidate_ballot_schemas = CandidateBallotSchema(many=True)

class PolicyBallotSchema(ma.Schema):
    class Meta:
        model = PolicyBallot
        fields = ("pol_num", "ballot_id", "policy", "votes_for", "votes_against")

policy_ballot_schema = PolicyBallotSchema()
policy_ballot_schemas = PolicyBallotSchema(many=True)

class ClassElectionSchema(ma.Schema):
    class Meta:
        model = ClassElection
        fields = ("classid", "ballotid")

class_election_schema = ClassElectionSchema()
class_elections_schema = ClassElectionSchema(many=True)

class ClassQuizSchema(ma.Schema):
    class Meta:
        model = ClassQuiz
        fields = ("classid", "quizid")
    
class_quiz_schema = ClassQuizSchema()
class_quizzes_schema = ClassQuizSchema(many=True)

class StudentQuizSchema(ma.Schema):
    class Meta:
        model = StudentQuiz
        fields = ("studentid", "quizid", "grade")

student_quiz_schema = StudentQuizSchema()
student_quizes_schema = StudentQuizSchema(many=True)

class BallotInfoSchema(ma.Schema):
    class Meta:
        model = BallotInfo
        fields = ("ballotid", "candidateid", "policy_number")

ballot_info_schema = BallotInfoSchema()
ballot_infos_schema = BallotInfoSchema(many=True)

class StudentVoteSchema(ma.Schema):
    class Meta:
        model = StudentVote
        fields = ("ballotid", "studentid", "voted")

student_vote_schema = StudentVoteSchema()
student_votes_schema = StudentVoteSchema(many=True)