import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { ContactService } from '../services/ContactService'
import Spinner from './Spinner'

const ViewContact = () => {
  let {contactId}= useParams();

const [state, setState] = useState({
  loading: false,
  contact: {},
  errorMessage: '',
  group : ''
})

useEffect( () => {
  const fetchedData = async()=>{
    
    try {
      setState({...state, loading:true})
      let response = await ContactService.getContact(contactId);
      let groupResponse = await ContactService.getContact(response.data);
      console.log(groupResponse.data);
      setState({
        ...state,
        loading:false,
        contact:response.data,
        group: groupResponse.data,
      })
    } catch (error) {
      setState({
        ...state,
        loading:false,
        errorMessage:error.message,
      })
    }
  }
  fetchedData();
}, [contactId])

let {loading,errorMessage,contact,group}= state;

  return (
    <>
    <Navbar/>
    <div className="view-contact-intro py-3">
      <div className="container">
        <div className="row">
          <div className="column">
            <p className="h3 text-warning">View Contact</p>
            <p className='fst-italic'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Libero laboriosam nobis eos culpa laudantium, nesciunt ullam dolorum ipsam eum nisi error fuga veritatis nemo necessitatibus nulla expedita eaque officia exercitationem.</p>
          </div>
        </div>
      </div>
    </div>

{
  loading? <Spinner/> : <>
  {
   contact && Object.keys(contact).length> 0 && Object.keys(group).length> 0 &&
    <section className='view-contact py-3'>
<div className="container">
  <div className="row align-items-center">
    <div className="col-md-4">
<img src={contact.photo} alt="" className='contact-img' />
    </div>

    <div className="col-md-8">
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
                        <li className='list list-group-item list-group-item-action'>
                          Company: <span className='fw-bold'>{contact.company}</span>
                        </li>
                        <li className='list list-group-item list-group-item-action'>
                          Title: <span className='fw-bold'>{contact.title}</span>
                        </li>
                        <li className='list list-group-item list-group-item-action'>
                          Group: <span className='fw-bold'>{group.name}</span>
                        </li>
                      </ul>
    </div>
    <div className="row">
      <div className="col">
        <Link to='/' className='btn btn-warning'>Back</Link>
      </div>
    </div>
  </div>
</div>
    </section>
    
  }

  </>
}
    
    </>
  )
}

export default ViewContact