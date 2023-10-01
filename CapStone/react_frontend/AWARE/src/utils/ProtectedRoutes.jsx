import { Outlet, Navigate} from 'react-router-dom';


export const ProtectedRoutes = ({userExists}) => {

    console.log(!userExists ? '<Outlet /> ' : '<Navigate to=/Login/>')

    return (
        !userExists ? <Outlet />  : <Navigate to='/Login'/>
    )
}

export const TeacherRoutes = ({user}) => {

    console.log('therole:', user)

    return (
        !user ? <Navigate to='/Login'/> : (user.role == 'Teacher' ? <Outlet />  : <Navigate to='/Login'/>)
    )
}

export const StudentRoutes = ({user}) => {

    return (
        !user ? <Navigate to='/Login'/> : (user.role == 'Student' ? <Outlet />  : <Navigate to='/Login'/>)
    )
    
}