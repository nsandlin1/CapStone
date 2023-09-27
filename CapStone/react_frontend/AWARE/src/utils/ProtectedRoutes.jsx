import { Outlet, Navigate} from 'react-router-dom';


export const ProtectedRoutes = ({loggedIn}) => {

    return (
        !loggedIn ? <Outlet />  : <Navigate to='/Login'/>
    )
}

export const TeacherRoutes = ({role}) => {

    console.log(role)

    return (
        role == 'Teacher' ? <Outlet />  : <Navigate to='/Login'/>
    )
}

export const StudentRoutes = ({role}) => {

    return (
        role == 'Student' ? <Outlet />  : <Navigate to='/Login'/>
    )
    
}