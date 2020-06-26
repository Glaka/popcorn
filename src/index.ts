import { rootReducer } from './redux/rootReducer';
import { createStore } from './core/createStore';
import './scss/index.scss';
import Excel from './components/excel/Excel';
import Table from './components/table/Table';
import Header from './components/header/Header';
import Toolbar from './components/toolbar/Toolbar';
import Formula from './components/formula/Formula';

const initialState = {
    headerState: {},
    toolbarState: {},
    formulaState: {},
    tableState: {},
}
const store = createStore(rootReducer, initialState);

const excel = new Excel('#app', {
    components: [Header, Toolbar, Formula, Table],
    store
});

excel.render();