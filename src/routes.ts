import type {JSX} from 'react';
import{createElement} from 'react';
// page components
import CreatePet from './pages/CreatePet.tsx';
import NotFoundPage from './pages/NotFoundPage.tsx';
import PetList from './pages/PetList.tsx';
import PetOwnerList from './pages/PetOwnerList.tsx';
import Start from './pages/Start.tsx';

interface Route {
  element: JSX.Element;
  path: string;
  loader?: Function;
  menuLabel?: string;
  index?: number;
  parent?: string;
}

export default [
  CreatePet,
  NotFoundPage,
  PetList,
  PetOwnerList,
  Start
]
  // map the route property of each page component to a Route
  .map(x => (({ element: createElement(x), ...x.route }) as Route))
  // sort by index (and if an item has no index, sort as index 0)
  .sort((a, b) => (a.index || 0) - (b.index || 0));