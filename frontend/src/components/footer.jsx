import React from "react";

const Footer=({theme}) =>{
  return (
    <div className="flex flex-col justify-center items-center h-[6vh]" style={{backgroundColor:theme.light_bg_colour, color:theme.darker_bg_colour}}>
        <p className="text-[20px]">Made with ❤️ by Ananya Jain 23BCE0593</p>
    </div>
  );
}

export default Footer;
