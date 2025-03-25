import React from 'react'
import { useState, useEffect } from 'react'
import Navbar from './Navbar'
import { Link } from 'react-router-dom'
import Spinner from './Spinner'
import { ContactService } from '../services/ContactService'

const ContactList = () => {
  const [state, setState] = useState({
    loading: false,
    contacts: [],
    filteredContacts:'',
    errorMessage: "",
    
  })

const[query,setQuery]= useState({
  text:''
})
//SEARCH CONTACTS
const searchContacts=(event)=>{
  setQuery({...query, text:event.target.value})

  let theContacts= state.contacts.filter(contact=>{
    return contact.name.toLowerCase().includes(event.target.value.toLowerCase());
  })
  console.log(theContacts);
  setState({
    ...state,
    filteredContacts:theContacts
  })
}

  useEffect(() => {
    const fetchedData = async () => {
      try {
        setState({ ...state, loading: true })
        let response = await ContactService.getAllContacts();
        setState({
          ...state,
          loading: false,
          contacts: response.data,
          filteredContacts:response.data
        })
      } catch (error) {
        setState({
          ...state,
          laoding: false,
          errorMessage: error.message,
        })
      }
    }
    fetchedData();
  }, [])

  //DELETE

  const clickDelete = async (contactId) => {
    try {
      let response = await ContactService.deleteContact(contactId);
      if (response) {
        setState({ ...state, loading: true })
        let response = await ContactService.getAllContacts();
        setState({
          ...state,
          loading: false,
          contacts: response.data,
          filteredContacts:response.data
        })
      }
    } catch (error) {
      setState({
        ...state,
        laoding: false,
        errorMessage: error.message,
      })
    }

  }
  let { contacts, loading, errorMessage,filteredContacts } = state;
  return (
    <>
      <Navbar />
      <div className="contact-search p-5">
        <div className="container">
          <div className="grid">
            <div className="row">
              <div className="col">
                <p className="h3 fw-bold">Contact Manager
                  <Link to='/addcontact' className='btn btn-primary ms-2 '>
                    <i class="bi bi-plus-circle me-3"></i>
                    New

                  </Link>
                </p>
                <p className='fst-italic'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci distinctio voluptas quibusdam est ducimus officiis quisquam nam, iure, assumenda quidem autem possimus exercitationem nulla quam consequuntur itaque ullam dolorum! Eos.</p>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="row">
                  <div className="col">
                    <div className="mb-2">
                      <input 
                      name='text'
                      value={query.text}
                      onChange={searchContacts}
                      type="text" className='form-control' placeholder='Search Names' />
                    </div>
                  </div>
                  <div className="col">
                    <div className="mb-2">
                      <input type="submit" className='btn btn-outline-dark' value='Search' />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {
        loading ? <Spinner /> : <>
          <div className="contact-list">
            <div className="container">
              <div className="row">

                {
                  filteredContacts.length > 0 && filteredContacts.map((contact) => {
                    return (
                      <>
                        <div className="col-md-6 p-2">
                          <div className="card">
                            <div className="card-body">
                              <div className="row align-items-center d-flex justify-content-around">
                                <div className="col-md-4">
                                  <img src={contact.photo} alt="" className='img-fluid contact-img' />
                                </div>

                                <div className="col-md-7">
                                  <ul className='list-group'>
                                    <li className='list list-group-item list-group-item-action'>
                                      Name: <span className='fw-bold'>{contact.name}</span>
                                    </li>
                                    <li className='list list-group-item list-group-item-action'>
                                      Mobile: <span className='fw-bold'>{contact.mobile}</span>
                                    </li>
                                    <li className='list list-group-item list-group-item-action'>
                                      Email: <span className='fw-bold'>{contact.email}</span>
                                    </li>
                                  </ul>
                                </div>

                                <div className="col-md-1 d-flex flex-column align-items-center">
                                  <Link to={`/viewcontact/${contact.id}`} className=' btn btn-warning my-1'><i class="bi bi-eye-fill "></i></Link>
                                  <Link to={`/editcontact/${contact.id}`} className=' btn btn-primary my-1'><i class="bi bi-pencil-square"></i></Link>
                                  <Link to='' className=' btn btn-danger my-1' onClick={() => clickDelete(contact.id)}>
                                    <i class="bi bi-trash3-fill text-white"></i></Link>
                                </div>
                              </div>

                            </div>
                          </div>
                        </div>
                      </>
                    )
                  })
                }
                {/* // }<h1><span style={{color:'red'}}> Oops</span> Name not found</h1> */}
                 

              </div>
            </div>
          </div>
        </>
      }



    </>

  )
}

export default ContactList