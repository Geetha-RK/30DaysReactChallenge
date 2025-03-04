export default function ButtonsContainer({ onButtonClick }) {
    const buttonNames = ['C','1','2','+','3','4','-','5','6','*','7','8','/','=','9','0','.'];
  return (
    <>
      <div className="button-container">
        {buttonNames.map((buttonName) => (
            <button key={buttonName} className="button" onClick={() => onButtonClick(buttonName)}>{buttonName}</button>
            ))}
        
      </div>
    </>
  );
}