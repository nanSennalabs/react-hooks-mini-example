import { useNavigate } from "react-router-dom";
// import { HomePageProps } from "./interface";

export function HomePage() {
  const navigate = useNavigate();
  const menus: {
    path: string;
    name: string;
  }[] = [
    { path: "/use-state", name: "useState" },
    { path: "/use-effect", name: "useEffect" },
    { path: "/use-ref", name: "useRef" },
    { path: "/use-callback", name: "useCallback" },
    { path: "/use-memo", name: "useMemo" },
  ];
  return (
    <div className="w-screen h-screen overflow-y-auto  bg-black">
      <div className="flex flex-col w-full items-center justify-center py-[40px] gap-y-[24px]">
        <h1 className="text-secondary font-semibold text-[30px]">
          React Hooks
        </h1>
        <div className="grid grid-cols-3 gap-[16px] mx-[24px]">
          {/* {data.map((movie) => (
            <div
              key={movie.id}
              onClick={() => {
                console.log(movie.id);
              }}
              className="rounded-[8px] bg-white shadow-drop-1 flex flex-col"
            >
              <div className="relative">
                <div className="absolute text-primary font-bold text-[24px] right-[10px]">
                  {movie.rating}/10
                </div>
                <img
                  src={movie.image}
                  className="object-cover rounded-t-[8px]"
                />
              </div>
              <div className="p-[8px]">
                <p className="text-gray">{movie.name}</p>
                <p className="font-light text-gray-2">{movie.year}</p>
              </div>
            </div>
          ))} */}
          {menus.map((item) => (
            <button
              type="button"
              onClick={() => {
                navigate(item.path);
              }}
              className="rounded-[8px] w-[150px] h-[50px] bg-white text-primary shadow-drop-1 hover:w-[155px] hover:h-[55px] hover:bg-primary/10"
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
