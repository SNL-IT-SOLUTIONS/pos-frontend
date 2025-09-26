import { useRoutes } from 'react-router-dom'

//Auth
import AuthIndex from '../features/auth'

//super admin
import SuperAdminIndex from '../features/superadmin/SuperAdminIndex'



const AppRoutes = () => {

    const routes = useRoutes([

        { path: '/', element: <AuthIndex /> },




        // ███████╗██╗   ██╗██████╗ ███████╗██████╗      █████╗ ██████╗ ███╗   ███╗██╗███╗   ██╗
        // ██╔════╝██║   ██║██╔══██╗██╔════╝██╔══██╗    ██╔══██╗██╔══██╗████╗ ████║██║████╗  ██║
        // ███████╗██║   ██║██████╔╝█████╗  ██████╔╝    ███████║██║  ██║██╔████╔██║██║██╔██╗ ██║
        // ╚════██║██║   ██║██╔═══╝ ██╔══╝  ██╔══██╗    ██╔══██║██║  ██║██║╚██╔╝██║██║██║╚██╗██║
        // ███████║╚██████╔╝██║     ███████╗██║  ██║    ██║  ██║██████╔╝██║ ╚═╝ ██║██║██║ ╚████║
        // ╚══════╝ ╚═════╝ ╚═╝     ╚══════╝╚═╝  ╚═╝    ╚═╝  ╚═╝╚═════╝ ╚═╝     ╚═╝╚═╝╚═╝  ╚═══╝


        { path: '/super-admin', element: <SuperAdminIndex /> },

    ])

    return routes;
}



export default AppRoutes