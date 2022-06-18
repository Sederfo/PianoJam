import styled from "styled-components";

export const FormContainer = styled.div`

  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  
  
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }
  
  .formRow{
    display: flex;
    flexDirection: row;
    justifyContent: space-between;
    alignItems: center;
    gap: 10px;  
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #2a2b2a;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #EDE0D4;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #9b7874;
      outline: none;
    }
  }
  button {
    background-color: #EDE0D4;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #9b7874;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #9b7874 ;
      text-decoration: none;
      font-weight: bold;
    }
  }

  label{
    background-color: #EDE0D4;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    display: flex;
    align-items: center;  
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    
  }
`;
