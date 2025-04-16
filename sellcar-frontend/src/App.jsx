import './App.css';
import Chatbox from './components/ChatCar';
import Routers from './routes';

import { Buffer } from "buffer";
window.Buffer = Buffer;


function App() {
  return (
    <>
    <Chatbox/>
    <Routers/>
    </>
  );
}

export default App;