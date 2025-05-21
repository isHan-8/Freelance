// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import pages
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Feed from './pages/Feed/Feed';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import CreatePost from './pages/CreatePost';
import Longs from './pages/Longs';
import ViewLongFormContent from './pages/ViewLongFormContent';
import Messages from './pages/Messages';
import Notifications from './pages/Notifications';
import RateUser from './pages/RateUser';
import CreateDatingProfileForm from './pages/CreateDatingProfileForm';
import EditDatingProfile from './pages/EditDatingProfile';
import DatingHome from './pages/DatingHome';
import DatingChat from './pages/DatingChat';
import ViewDatingProfile from './pages/ViewDatingProfile';
import Events from './pages/Events';
import EventDetails from './pages/EventDetails';
import CreateEvent from './pages/CreateEvent';
import EventManage from './pages/EventManage';
import TicketDetails from './pages/TicketDetails'; 

import NotFound from './pages/NotFound';

// Import layouts
import PublicLayout from './components/PublicLayout';
import PrivateLayout from './components/PrivateLayout';
import ProtectedRoute from './components/ProtectedRoute';

// Import AuthProvider
import { AuthProvider } from './context/AuthContext';
import Chat from './pages/Chat/Chat.js';
// import ProfileSection from './pages/ProfileSection';
import Filter from './pages/Filter/Filter.js';
import Event from './pages/Event/Indexing.js';
import LoginSignup from './pages/LoginSignup'
import OriginalLogin from './pages/Login/OriginalLogin.jsx'
import Indexing from './pages/Event/Indexing';
import BookingDetails from './pages/Event/BookingDetails';
import Form from './pages/Form/Form.jsx';
import Ishane from './pages/Profile/Ishane.jsx';
import DatingModule from './pages/Dat/DatingModule.jsx';
import { ThemeProvider } from './ThemeContext.js'; 

function App() {
  return (
    <AuthProvider>
            <ThemeProvider> {/* Wrapping the app */}

      <Router>
        <Routes>
          {/* Public Routes with PublicLayout */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* Protected Routes with PrivateLayout */}
          <Route >

            {/* Ishan Routes */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/chat" element={<Chat />} /> 
            {/* <Route path="/ruf" element={<ProfileSection />} /> */}
            <Route path="/Profile" element={<Ishane />} />
            <Route path="/filter" element={<Filter />} />
            {/* <Route path="/event" element={<Event />} /> */}
            {/* <Route path="/loging" element={<LoginSignup />} /> */}
            <Route path="/loging" element={<OriginalLogin />} />
            <Route path="/eventing" element={<Indexing/>} />
            <Route path="/form" element={<Form/>} />
            <Route path="/booking-details" element={<BookingDetails/>} />
            <Route path="/dat" element={<DatingModule/>} />




            <Route path="/profile/:username" element={<Profile />} />
            <Route path="/edit_profile" element={<EditProfile />} />
            <Route path="/create_post" element={<CreatePost />} />
            <Route path="/longs" element={<Longs />} />
            <Route path="/long_form/:contentId" element={<ViewLongFormContent />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/rate_user/:username" element={<RateUser />} />

            {/* Dating App Routes */}
            <Route path="/dating" element={<DatingHome />}>
              <Route path="create_profile" element={<CreateDatingProfileForm />} />
              <Route path="edit_profile" element={<EditDatingProfile />} />
              <Route path="home" element={<DatingHome />} />
              <Route path="chat/:matchId" element={<DatingChat />} />
              <Route path="profile/:userId" element={<ViewDatingProfile />} />
            </Route>

            {/* Conversation/Chat Route */}
            <Route path="/messages/:conversationId" element={<Messages />} />

            {/* Events Routes */}
            <Route path="/events" element={<Events />} />
            <Route path="/events/create" element={<CreateEvent />} />
            <Route path="/events/:id" element={<EventDetails />} />
            <Route path="/events/:id/manage" element={<EventManage />} /> {/* New route */}
            <Route path="/tickets/:id" element={<TicketDetails />} />
          </Route>

          {/* Catch-all Route for 404 */}
          <Route element={<PublicLayout />}>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
      </ThemeProvider>

    </AuthProvider>
  );
}

export default App;
