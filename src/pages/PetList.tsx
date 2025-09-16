import { useLoaderData } from "react-router-dom";

interface Pet {
  id: number;
  name: string;
  species: string;
  ownerId: number | null;
}
PetList.route = {
  path: '/pet-list',
  menuLabel: 'Pet List',
  index: 2,
  loader: async () => await (await fetch('/api/pets')).json()
}

export default function PetList() {
  const pets = useLoaderData() as Pet[];
  return <>
    {pets.map(({ id, name }) => <p key={id}>{name}</p>)}
  </>;
}
