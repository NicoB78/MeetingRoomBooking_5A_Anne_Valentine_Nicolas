//user.model.ts
export class Room {
  id: number | null;
  name: string;
  capacity: number;
  equipment: string;
  picture: string;

  constructor(id: number | null, name: string, capacity: number, equipment: string, picture: string) {
    this.id = id;
    this.name = name;
    this.capacity = capacity;
    this.equipment = equipment;
    this.picture = picture;
  }
}
