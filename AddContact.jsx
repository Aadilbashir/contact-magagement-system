import React, { useState, useEffect } from 'react'
import { Link , useNavigate} from 'react-router-dom'
import { ContactService } from '../services/ContactService'
import Navbar from './Navbar'


const AddContact = () => {

const navigate = useNavigate();

  const [state, setState] = useState({
    loading: false,
    contact: {
      name: '',
      photo: '',
      mobile: '',
      email: '',
      company: '',
      title: '',
      groupId: ''
    },
    groups: [],
    errrorMessage: '',
  })

  let updateInput = (event) => {
    setState({
      ...state,

      contact: {
        ...state.contact,
        [event.target.name]: event.target.value

      }
    }
    )
  }

  let { loading, contact, errrorMessage, groups } = state

  useEffect(() => {
    const  getGroups =  async () => {
      try {
        let response = await ContactService.getGroups();
        setState({
          ...state,
          loading: false,
          groups: response.data,
        })
      } catch (error) {

      }

    }
    getGroups()

  }, [])

  
const handleSubmit  = async (event)=>{
event.preventDefault();
try {
  let response = await ContactService.createContact(state.contact);
  
  if (response) {
   
    navigate("/", {replace:true})
  }
} catch (error) {
  setState({...state, errorMessage:error.message})
  navigate("/addcontact", {replace:false})
}

}


  return (
    <>
      <Navbar />
    
      <div className="add-contact py-3">
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="h4 text-success fw-bold">Add Contact</p>
              <p className=' fst-italic'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi deleniti delectus aperiam ut voluptatem atque incidunt, ad ipsa illo explicabo tenetur enim voluptatum dolores, saepe excepturi? Dolorum sunt iusto vero!</p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <form onSubmit={handleSubmit}>
                <div className="mb-2">
                  <input
                    name="name"
                    value={contact.name}
                    onChange={updateInput}
                    type="text" className='form-control' placeholder='Name' />
                </div>
                <div className="mb-2">
                  <input
                    name="photo"
                    value={contact.photo}
                    onChange={updateInput}
                    type="text" className='form-control' placeholder='Photo URL' />
                </div>
                <div className="mb-2">
                  <input
                    name="mobile"
                    value={contact.mobile}
                    onChange={updateInput}
                    type="number" className='form-control' placeholder='Mobile' />
                </div>
                <div className="mb-2">
                  <input
                    name="email"
                    value={contact.email}
                    onChange={updateInput}
                    type="email" className='form-control' placeholder='Email' />
                </div>
                <div className="mb-2">
                  <input
                    name="company"
                    value={contact.company}
                    onChange={updateInput}
                    type="text" className='form-control' placeholder='Company' />
                </div>
                <div className="mb-2">
                  <input
                    name="title"
                    value={contact.title}
                    onChange={updateInput}
                    type="text" className='form-control' placeholder='Title' />
                </div>
                <div className="mb-2">
                  <select
                    className='form-control'
                    required={true}
                    value={contact.groupId}
                    name="groupId"
                    onChange={updateInput}
                  >
                    <option value="">Select a group</option>
                    {
                      groups && groups.length > 0 &&
                      groups.map(group => {
                        return (
                          <option key={group.id} value={group.id}>{group.name}</option>
                        )
                      })
                    }

                  </select>
                </div>
                <div className="mb-2 py-3">
                  <input type="submit" className='btn btn-success ' placeholder='Add' />
                  <Link to='/' className='btn btn-dark ms-2' placeholder='Cancel'> Cancel</Link>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </>

  )
}

export default AddContact