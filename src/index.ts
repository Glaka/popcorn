import { ANY_TODO, storage } from './core/utils';
import { rootReducer } from './redux/rootReducer';
import { createStore } from './core/createStore';
import './scss/index.scss';
import Excel from './components/excel/Excel';
import Table from './components/table/Table';
import Header from './components/header/Header';
import Toolbar from './components/toolbar/Toolbar';
import Formula from './components/formula/Formula';
import { initialState } from './redux/initialState';

const store = createStore(rootReducer, initialState);

store.subscribe((state: ANY_TODO) => {
    storage('app_state', state);
})

const excel = new Excel('#app', {
    components: [Header, Toolbar, Formula, Table],
    store
});

excel.render();