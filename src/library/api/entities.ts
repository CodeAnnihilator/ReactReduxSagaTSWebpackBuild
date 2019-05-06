import {fetch} from 'library/utils/fetch';

export const requestTestData = () => fetch.get('testdata');
