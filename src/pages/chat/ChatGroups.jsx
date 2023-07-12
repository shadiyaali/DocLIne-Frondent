import React from "react";
import Navbar from "../../components/User/Navbar";
 
import Footer from "../../components/User/Footer";
import Chat from "../../components/chat/chat"
 
 

const ChatGroup = () => {
    
  return (
    <div>
      <Navbar/>
      <Chat/>
      <Footer/>
       
      
    </div>
    
  );
};

export default ChatGroup;