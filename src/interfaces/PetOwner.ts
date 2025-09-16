import type Pet from "./Pet";

export default interface PetOwner {
  id: number;
  firstName: string
  lastName: string;
  email: string;
  pets?: Pet[]
}
