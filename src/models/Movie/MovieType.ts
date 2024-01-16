import { Exclude, Expose } from "class-transformer";

@Exclude()
export class MovieType {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  director: string;

  @Expose()
  year: number;

  @Expose()
  describe: string;

  @Expose()
  rating: string;
  
  @Expose()
  image: string;
}
