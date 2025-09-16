PetList.route = {
  path: '/pet-list',
  menuLabel: 'Pet List',
  index: 2,
  loader: async () => await (await fetch('/api/pets')).json()
}

export default function PetList(props: any) {
  console.log(props);
  return <p>Here will show all pets</p>
}