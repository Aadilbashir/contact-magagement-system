import React, { useState,useEffect } from 'react'
import Navbar from './Navbar'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { ContactService } from '../services/ContactService';
import Spinner from './Spinner';
const EditContact = () => {

  let { contactId } = useParams();
  let navigate = useNavigate();
  const [state, setState] = useState({
    loading: false,
    contact: {
      name: '',
      photo: '',
      mobile: '',
      email:'',
      company:'',
      title:'',
      groupId :''
    },
    groups: '',
    errorMessage: ''
  })

  useEffect(() => {
    const myData = async()=>{
      try {
        setState({...state, loading:true})
        let response= await ContactService.getContact(contactId);
        let groupResponse = await ContactService.getGroups();
       setState({
        ...state, loading:false,
        contact:response.data,
        groups: groupResponse.data
       })
      } catch (error) {
        setState({...state,loading:false, errorMessage:error.message})
       
      }
    }
    myData();
  }, [contactId]);

  let {contact,groups,errorMessage,loading}= state;
  
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

//SUBMIT FORM
const handleSubmit  = async (event)=>{
  event.preventDefault();
  try {
    let response = await ContactService.updateContact(contact,contactId);
    if (response) {
      navigate("/", {replace:true})
      console.log(response.data);
    }
  } catch (error) {
    setState({...state, errorMessage:error.message})
    navigate(`/editcontact/${contactId}`, {replace:false})
  }
  
  }

  return (
    <>
      <>
        <Navbar />
        {
          loading ?<Spinner/> : <>
          <div className="edit-contact py-3">
          <div className="container">
            <div className="row">
              <div className="col">
                <p className="h4 text-primary fw-bold">Edit Contact</p>
                <p className=' fst-italic'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi deleniti delectus aperiam ut voluptatem atque incidunt, ad ipsa illo explicabo tenetur enim voluptatum dolores, saepe excepturi? Dolorum sunt iusto vero!</p>
              </div>
            </div>
           
            <div className="row" >
              <div className="col-md-6">
                <form onSubmit={handleSubmit}>
                  <div className="mb-2">
                    <input type="text" 
                    required={true}
                    name="name"
                   value={contact.name} 
                   onChange={updateInput}

                    className='form-control' placeholder='Name' />
                  </div>
                  <div className="mb-2">
                    <input type="text"
                     required={true}
                     name="photo"
                    value={contact.photo} 
                    onChange={updateInput}
                    className='form-control' placeholder='Photo URL' />
                  </div>
                  <div className="mb-2">
                    <input type="number" 
                     required={true}
                     name="mobile"
                    value={contact.mobile} 
                    onChange={updateInput}
                    className='form-control' placeholder='Mobile' />
                  </div>
                  <div className="mb-2">
                    <input type="email"
                     required={true}
                     name="email"
                    value={contact.email} 
                    onChange={updateInput}
                    
                    className='form-control' placeholder='Email'/>
                  </div>
                  <div className="mb-2">
                    <input type="text" 
                   required={true}
                   name="company"
                  value={contact.company} 
                  onChange={updateInput}
                    className='form-control' placeholder='Company' />
                  </div>
                  <div className="mb-2">
                    <input type="text"
                    required={true}
                    name="title"
                   value={contact.title} 
                   onChange={updateInput}
                    className='form-control' placeholder='Title' />
                  </div>
                  <div className="mb-2">
                    <select className='form-control'
                    required={true}
                    name="groupid"
                   value={contact.groupId} 
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
                    <input type="submit" className='btn btn-primary ' placeholder='Update' />
                    <Link to='/' className='btn btn-dark ms-2' placeholder='Cancel'> Cancel</Link>
                  </div>

                </form>
              </div>

              <div className="col-md-4">
                <img src={contact.photo} alt="" className='contact-img' />
              </div>
            </div>
          </div>
        </div>
          
          </>
        }
     
        
      </>
    </>
  )
}

export default EditContact