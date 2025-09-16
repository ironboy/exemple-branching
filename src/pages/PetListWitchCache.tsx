import { useLoaderData } from "react-router-dom";

interface Pet {
  id: number;
  name: string;
  species: string;
  ownerId: number | null;
}

// a memory for pets so that we don't fetch them multiple times
// (disadvantage: now we will never refresh the pet list until hard reload)
let pets: Pet[];

PetList.route = {
  path: '/pet-list',
  menuLabel: 'Pet List',
  index: 2,
  // return pets if truthy otherwise fetch and assign fetch values to pets
  loader: async () => pets || (pets = await (await fetch('/api/pets')).json())
}

export default function PetList() {
  const pets = useLoaderData() as Pet[];
  return <>
    {pets.map(({ id, name }) => <p key={id}>{name}</p>)}
  </>;
}

// Explanation/long version of loader
/*const longLoader = async () => {
  if (pets) {
    return pets;
  }
  pets = await(await fetch('/api/pets')).json();
  return pets;
}*/