import React from 'react'
import SideNav from "../components/Sidenav"
import TicketForm from "../components/TicketForm"

const CreateTicket = () => {
    return (
        <div className='create-ticket'>
            <div className="container">
                <SideNav />
                {/* <div className="chat-info">
                    <span>Create Ticket</span>
                </div> */}
                <TicketForm />
            </div>
        </div>
    )
}

export default CreateTicket;