export default interface Pet {
  id: number;
  name: string;
  species: string;
  ownerId: number | null;
  ownerFirstName: string | null;
  ownerLastName: string | null;
}
