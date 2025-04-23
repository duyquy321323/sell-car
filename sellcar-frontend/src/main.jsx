import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import store from './redux/store';
import { Toaster } from './components/ui/sonner.js';

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <Toaster/>
            <BrowserRouter>
                <App />
            </BrowserRouter>
    </Provider>
)
