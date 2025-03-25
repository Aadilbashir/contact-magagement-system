import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ContactList from './components/ContactList'
import AddContact from './components/AddContact'
import EditContact from './components/EditContact'
import ViewContact from './components/ViewContact'
import NoPage from './components/NoPage'



function App() {
  return (
    <> 
   
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ContactList />}/>
          <Route path="/addcontact" element={<AddContact />} />
          <Route path="/editcontact/:contactId" element={<EditContact />} />
          <Route path="/viewcontact/:contactId" element={<ViewContact />} />
          <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
