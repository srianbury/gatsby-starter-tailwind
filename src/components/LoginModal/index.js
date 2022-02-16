import * as React from "react";
import { createContext, useState, useContext, useEffect } from "react";
import { Dialog } from "@mui/material";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";

const LoginModalContext = createContext();

const LoginModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <LoginModalContext.Provider value={{ isOpen, closeModal, openModal }}>
      {children}
    </LoginModalContext.Provider>
  );
};

const LoginModal = () => {
  const { isOpen, closeModal } = useContext(LoginModalContext);
  const { route } = useAuthenticator(context => [context.route]);

  // close the modal after the user logs in
  useEffect(() => {
    if (route === "authenticated" && isOpen) {
      closeModal();
    }
  }, [route, closeModal, isOpen]);

  return (
    <Dialog
      open={isOpen}
      onClose={closeModal}
      aria-labelledby="login-modal-title"
      aria-describedby="login-modal-description"
    >
      <div>
        <Authenticator />
      </div>
    </Dialog>
  );
};

export { LoginModalContext, LoginModalProvider, LoginModal };
