function Button({buttonText, type}) {
  return (
    <>
    <button type={type}>
        {buttonText}
    </button>
    </>
  );
}

export default Button;