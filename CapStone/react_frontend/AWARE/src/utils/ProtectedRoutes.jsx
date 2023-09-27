import { Outlet, Navigate} from 'react-router-dom';


export const ProtectedRoutes = ({loggedIn}) => {

    return (
        !loggedIn ? <Outlet />  : <Navigate to='/Login'/>
    )
}

export const TeacherRoutes = ({role}) => {

    return (
        role == 'teacher' ? <Outlet />  : <Navigate to='/Login'/>
    )
}

export const StudentRoutes = ({role}) => {

    return (
        role == 'student' ? <Outlet />  : <Navigate to='/Login'/>
    )
    
}