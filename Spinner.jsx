import React from 'react'
import loader from '../../src/assets/img/loader.gif'
const Spinner = () => {
  return (
    <>
    
<div>
  <img src={loader} alt="loading" className='d-block m-auto' style={{width:'200px'}} />
</div>
    </>
  )
}

export default Spinner