import React, { useState } from 'react'
import './Day14.scss'
import { Link } from 'react-router-dom'
import {day11img} from '../../assets.js'

const Day14 = () => {
    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [email,setEmail] = useState("");
    const [phone,setPhone] = useState("");
    const [contactList,setContactList] = useState([]);
    const [search, setSearch] = useState("");
    const [editingIndex, setEditingIndex] = useState(null);

    const handleFirstName = (e) => setFirstName(e.target.value);
    const handleLastName = (e) => setLastName(e.target.value);
    const handleEmail = (e) => setEmail(e.target.value);
    const handlePhone = (e) => setPhone(e.target.value);
    const handleSearch = (e) => setSearch(e.target.value); 

  

    const handleAddContact= (e) => {
        e.preventDefault();
        if (firstName && lastName && email && phone){
            const newContact = { firstName,lastName,email,phone};

            if (editingIndex !== null) {
                const updatedContactList = [...contactList];
                updatedContactList[editingIndex] = newContact;
                setContactList(updatedContactList); // Update the contact list
                setEditingIndex(null); 
            } else {
                setContactList([...contactList, newContact]); 
            }

            
            setFirstName("");
            setLastName("");
            setEmail("");
            setPhone("");
        }else {
            alert("Please fill all the fields")
        }
    }

    const handleEdit = (index) => {
        setFirstName(contactList[index].firstName);
        setLastName(contactList[index].lastName);
        setEmail(contactList[index].email);
        setPhone(contactList[index].phone);
        setEditingIndex(index); 
    };

    // Delete Contact
    const handleDelete = (index) => {
        const updatedContactList = contactList.filter((_, i) => i !== index);
        setContactList(updatedContactList);
    };

    const filteredContacts = contactList.filter(contact =>
        contact.firstName.toLowerCase().includes(search.toLowerCase()) ||
        contact.lastName.toLowerCase().includes(search.toLowerCase()) ||
        contact.email.toLowerCase().includes(search.toLowerCase()) ||
        contact.phone.includes(search)
    );
    
  return (
    <div className='contact'>
        <div className="todo__box1">
        <p className="todo__title">
          <Link className='todo__link' to="/">Back</Link>
        </p>
        <div className="todo__title">Contact List App</div>
      </div>
      <div className='contact__container'>
            <div className="contact__form">
                <h2 className='contact__title'>{editingIndex !== null ? 'Edit Contact' : 'Add New Contact'}</h2>
                <form className="contact__formbox" action="submit" onSubmit={handleAddContact}>
                    <label  className="contact__label" htmlFor="fn">FirstName
                        <input className="contact__input" type="text" name="fn" id="fn" value={firstName} onChange={handleFirstName} />
                    </label>
                    <label  className="contact__label" htmlFor="ln" >LastName
                        <input  className="contact__input" type="text" name="ln" id="ln" value={lastName} onChange={handleLastName} />
                    </label>
                    <label className="contact__label" htmlFor="em">Email
                        <input   className="contact__input"type="email" name="em" id="em" value={email} onChange={handleEmail} />
                    </label>
                    <label  className="contact__label" htmlFor="ph">Phone
                        <input   className="contact__input" type="tel" name="ph" id="ph" value={phone} onChange={handlePhone} />
                    </label>
                    <button className='contact__button' type='submit' >{editingIndex !== null ? 'Update Contact' : 'Add Contact'}</button>
                </form>
            </div>
            
            <div className="contact__list">
            <div className="contact__search">
                    <input
                     className="contact__search" 
                        type="text"
                        placeholder="Search by Name, Email or Phone"
                        value={search}
                        onChange={handleSearch}
                        disabled={
                            contactList.length === 0
                        }
                    />
                </div>
            {filteredContacts.length > 0 ? ( 
                <>
                 
                <div className='contact__listContainer'>
                   {filteredContacts.map((contact,index)=> {
                    return(
                        <div className='contact__listbox' key={index}>
                            <div className='contact__namebox'>
                            <p>{contact.firstName}&nbsp;{contact.lastName}</p>
                            <div>
                            <img onClick={() => handleEdit(index)} className="icons-style" src={day11img.edit} alt="edit-icon" /><img onClick={() => handleDelete(index)} className="icons-style"src={day11img.trash} alt="delete-icon" />
                            </div>
                           
                            </div>
                            
                            <p>{contact.email}</p>
                            <p>{contact.phone}</p>
                            <p></p>
                        </div>
                    )
                   })}
                </div> 
                </>
            ):
                 <div  className='contact__listContainer'>No Contacts Found</div>}
            
            </div>
      </div>
    </div>
  )
}

export default Day14