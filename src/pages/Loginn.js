import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
  background: #f6f5f7;
  padding: 20px;
  box-sizing: border-box;
`;

export const Container = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 100%;
  max-width: 900px;
  min-height: 500px;
  display: flex;
  flex-direction: row;

  @media (max-width: 1000px) {
    max-width: 95%;
  }

  @media (max-width: 768px) {
    max-width: 98%;
  }

  @media (max-width: 480px) {
    max-width: 100%;
    border-radius: 0;
  }
`;

export const SignUpContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: 50%;
  opacity: 0;
  z-index: 1;
  transition: all 0.6s ease-in-out;

  ${(props) =>
    props.signinIn !== true && `
      transform: translateX(0%);
      opacity: 1;
      z-index: 5;
    `}

  @media (max-width: 1000px) {
    position: absolute;
    top: 0;
    right: 0;
    width: 50%; /* Adjusts width on small screens */
    opacity: 1;
    transform: none;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;




export const SignInContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  left: 0;
  width: 50%;
  z-index: 2;

  ${(props) =>
    props.signinIn !== true && `
      transform: translateX(100%);
    `}

  @media (max-width: 1000px) {
    width: 50%;
    transform: translateX(${(props) => (props.signinIn ? '0' : '-100%')});
    opacity: ${(props) => (props.signinIn ? '1' : '0')};
    z-index: ${(props) => (props.signinIn ? '3' : '-1')};
    position: absolute;
  }
`;

export const Form = styled.form`
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 1rem clamp(1rem, 5vw, 2rem);
  height: 100%;
  text-align: center;
  width: 100%;
`;

export const Title = styled.h1`
  font-weight: bold;
  margin: 0;
  font-size: clamp(1.5rem, 5vw, 2.5rem);
`;

export const Input = styled.input`
  background-color: #eee;
  border: none;
  padding: 0.75rem 1rem;
  margin: 0.5rem 0;
  width: 100%;
  font-size: 1rem;
`;

export const Button = styled.button`
  border-radius: 20px;
  border: 1px solid #ff4b2b;
  background-color: #ff4b2b;
  color: #ffffff;
  font-size: clamp(0.75rem, 2vw, 1rem);
  font-weight: bold;
  padding: clamp(0.5rem, 2vw, 0.75rem) clamp(1.5rem, 5vw, 2rem);
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
  width: 100%;
  max-width: 240px;

  &:active {
    transform: scale(0.95);
  }

  &:focus {
    outline: none;
  }
`;

export const GhostButton = styled(Button)`
  background-color: transparent;
  border-color: #ffffff;
`;

export const Anchor = styled.a`
  color: #333;
  font-size: 0.875rem;
  text-decoration: none;
  margin: 1rem 0;
`;

export const OverlayContainer = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;

  ${(props) => props.signinIn !== true && `
    transform: translateX(-100%);
  `}
`;

export const Overlay = styled.div`
  background: linear-gradient(to right, #ff4b2b, #ff416c);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: #ffffff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;

  ${(props) => props.signinIn !== true && `
    transform: translateX(50%);
  `}
`;

export const OverlayPanel = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 clamp(1rem, 5vw, 2rem);
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
`;

export const LeftOverlayPanel = styled(OverlayPanel)`
  transform: translateX(-20%);
  ${(props) => props.signinIn !== true && `transform: translateX(0);`}
`;

export const RightOverlayPanel = styled(OverlayPanel)`
  right: 0;
  transform: translateX(0);
  ${(props) => props.signinIn !== true && `transform: translateX(20%);`}
`;

export const Paragraph = styled.p`
  font-size: clamp(0.875rem, 2vw, 1rem);
  font-weight: 100;
  line-height: 1.5;
  letter-spacing: 0.5px;
  margin: 1.25rem 0 2rem;
`;

export const MobileToggleButton = styled.button`
  display: none; // Optional, disable if you don't want it
  position: absolute;
  top: 15px;
  right: 15px;
  z-index: 999;
  background: #ff4b2b;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  cursor: pointer;

  @media (max-width: 1000px) {
    display: none; // ❗Hiding since we're keeping layout same across sizes
  }
`;
