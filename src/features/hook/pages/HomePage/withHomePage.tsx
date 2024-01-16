import { useHomeAction } from "hooks/home/useHomeAction";
import { useQuery } from "react-query";
import { HomePageProps } from "./interface";

export function withHomePage(Component: React.FC<HomePageProps>) {
  function WithHomePage() {
    const { getMovieList } = useHomeAction();

    const { data } = useQuery(["movie-list"], () => getMovieList());

    const newProps = {
      data: data || [],
    };

    return <Component {...newProps} />;
  }

  return WithHomePage;
}
