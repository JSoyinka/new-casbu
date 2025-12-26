
import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './router'

function App() {
  useEffect(() => {
    const htmlEl = document.documentElement;
    if (!htmlEl.classList.contains('dark')) {
      htmlEl.classList.add('dark');
    }
  }, []);

  return (
    <BrowserRouter basename={__BASE_PATH__}>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
