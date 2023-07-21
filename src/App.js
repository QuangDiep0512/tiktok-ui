import '~/App.scss';
import { publicRoutes } from './routes/routes';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main_layout from './layouts/Main_layout';
import { Fragment } from 'react';
import ModalForm from './components/ModalForm/ModalForm';
import { useState, createContext } from 'react';
export const MyContext = createContext();
function App() {
    const [closeModal, setCloseModal] = useState(true);

    const handleCloseModal = () => {
        setCloseModal(true);
    };

    const handleDisplayModal = () => {
        setCloseModal(false);
    };

    return (
        <MyContext.Provider value={handleDisplayModal}>
            <BrowserRouter>
                <div className="App">
                    <Routes>
                        {publicRoutes.map((routes, index) => {
                            let Layout = Main_layout;
                            if (routes.layout) {
                                Layout = routes.layout;
                            } else if (routes.layout === null) {
                                Layout = Fragment;
                            }
                            const Page = routes.component;
                            return (
                                <Route
                                    exact
                                    key={index}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                    path={routes.path}
                                />
                            );
                        })}
                    </Routes>
                </div>
                {closeModal === false && <ModalForm handleCloseModal={handleCloseModal} />}
            </BrowserRouter>
        </MyContext.Provider>
    );
}

export default App;
