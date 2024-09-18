import React from 'react';
import { RouterProvider, Router } from '@tanstack/router';
import Cafes from './components/Cafes';
import Employees from './components/Employees';
import EditEmployee from './components/EditEmployee';
import CafeForm from './components/CafeForm';
import EmployeeForm from './components/EmployeeForm';

// Define the routes
const router = new Router({
  routes: [
    {
      path: '/',
      element: () => <h1>Welcome to the Cafe & Employee App</h1>,
    },
    {
      path: '/cafes',
      element: <Cafes />,
    },
    {
      path: '/cafes/:cafeId/employees',
      element: <Employees />,
    },
    {
      path: '/cafes/new',
      element: <CafeForm />,  
    },
    {
      path: '/employees/new',
      element: <EmployeeForm />, 
    },
    {
      path: '/employees/:employeeId/edit',
      element: <EditEmployee />, 
    },
    {
      path: '/cafes/:cafeId/edit',
      element: <CafeForm />,  
    },
  ],
});

const App = () => {
  return (
    <div>
      <nav>
        <a href="/">Home</a> | <a href="/cafes">Cafes</a> | <a href="/employees">Employees</a>
      </nav>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
