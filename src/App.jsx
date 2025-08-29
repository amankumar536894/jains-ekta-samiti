import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Dashboard from './pages/admin/Dashboard/Dashboard'
import AddMembers from './pages/admin/AddMembers/AddMembers'
import ViewMembers from './pages/admin/ViewMembers/ViewMembers'
import WriteBlog from './pages/admin/WriteBlog/WriteBlog'
import AdminLogginPage from './pages/admin/AdminLogginPage/AdminLogginPage'
import ViewSingleFamily from './pages/admin/ViewSingleFamily/ViewSingleFamily'
import HomePage from './pages/user/HomePage/HomePage'
import UserLoggin from './pages/user/UserLoggin/UserLoggin'

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <HomePage />
    },
    {
      path: '/user/loggin',
      element: <UserLoggin />
    },
    {
      path: '/dashboard',
      element: <Dashboard />
    },
    {
      path: '/add-members',
      element: <AddMembers />
    },
    {
      path: '/view-members',
      element: <ViewMembers />
    },
    {
      path: '/member/:user_id',
      element: <ViewSingleFamily />
    },
    {
      path: '/blog',
      element: <WriteBlog />
    },
    {
      path: '/admin/loggin',
      element: <AdminLogginPage />
    },
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
