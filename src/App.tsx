import './App.css';
import { MainPage } from './pages/MainPage';
import { Header } from './components/Header';
import { useRef } from 'react';
import { Footer } from './components/Footer';

function App() {
  const contactsRef = useRef<HTMLDivElement>(null);
  const registerRef = useRef<HTMLDivElement>(null);

  const scrollToRegister = () => {
    registerRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContacts = () => {
    contactsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Header
        onUsersClick={scrollToContacts}
        onSignUpClick={scrollToRegister}
      />
      <MainPage
        contactsRef={contactsRef}
        registerRef={registerRef}
        onSignUpClick={scrollToRegister}
      />
      <Footer />
    </>
  );
}

export default App;