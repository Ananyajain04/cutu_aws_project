const LetterBox = ({value, onChange, disabled,status,theme}) => {
  const handleInputChange = (e) => {
    const uppercaseValue = e.target.value.toUpperCase(); // Convert input to uppercase
    onChange({ value: uppercaseValue }); // Call onChange with updated value
  
    console.log(status);
  };
  let className = `bg-[${theme.light_bg_colour}]`
  if (status === "correct") {
    className = "bg-green-600"; // Add green class for correct letters
  } else if (status === "wrong-position") {
    className = "bg-[#fff309]"; // Add yellow class for letters in the wrong position
  } else if (status === "incorrect") {
    className = "bg-[#ea0c0c]"; // Add red class for incorrect letters
  }
  return (
    <input
      type="text"
      value={value}
      onChange={handleInputChange}
      disabled={disabled}
      className={`w-[50px] h-[50px] text-[20px] p-[0px] text-center border-[2px] rounded-[5px] outline-none ${className}`}
      maxLength={1} // Ensure only one letter can be entered
      status={status}
      style={{ textTransform: 'uppercase', color:theme.darker_bg_colour }}
    />
  );
};
export default LetterBox;
