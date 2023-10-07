
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Cookies from 'js-cookie'

export default function Profile() {

    function submit() {
        
    }

    if (1) {
        return (
            <div className="Logout">
                  <Form onSubmit={submit}>
                         <Button size="lg" type="submit">
                            Log Out
                        </Button>
                    </Form>
            </div>
        )
    }
}