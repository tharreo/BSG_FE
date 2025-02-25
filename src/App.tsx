import { ToastContainer } from 'react-toastify';
import { Route, Routes } from 'react-router-dom';
import BasePage from './components/BasePage.tsx';
import { routeList } from './routes/routes-list.ts';

function App() {
  return (
    <main className={'bg-slate-100 min-h-screen'}>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
        {routeList.map((item) => {
          const Element = item.element;
          return (
            <Route
              key={item.routes}
              path={item.routes}
              element={
                <div>
                  <BasePage type={item.type}>
                    <Element />
                  </BasePage>
                </div>
              }
            />
          );
        })}
      </Routes>
    </main>
  );
}

export default App;
