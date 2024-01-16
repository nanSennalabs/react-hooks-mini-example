import { XmarkIcon } from "components/icons/XmarkIcon";
import { useCallback, useRef, useState } from "react";

export function PlayerList({
  players,
  handleRemovePlayer,
}: {
  players: string[];
  handleRemovePlayer: (index: number) => void;
}) {
  return (
    <ul className="bg-white w-[400px] rounded-[8px] text-gray-1 p-[8px]">
      {players.map((player, key) => (
        <li key={key} className="flex gap-x-[8px]">
          {player}
          <button onClick={() => handleRemovePlayer(key)}>
            <XmarkIcon className="text-primary" width="16" height="16" />
          </button>
        </li>
      ))}
    </ul>
  );
}

export function UseCallbackExample() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [players, setPlayers] = useState(["Messi", "Ronaldo", "Laspada"]);

  const handleAddPlayer = useCallback(() => {
    const input = (inputRef.current && inputRef.current.value) || "";
    setPlayers([...players, input]);
  }, [players]);

  const handleRemovePlayer = useCallback(
    (index: number) => {
      players.splice(index, 1);
      setPlayers([...players]);
    },
    [players]
  );

  return (
    <div className="p-[40px] text-secondary flex flex-col items-center gap-y-[60px] justify-center">
      <div className="flex gap-x-[8px]">
        <input
          className="text-[16px] font-light placeholder:font-light text-black-1 border border-gray-4 rounded-[6px] h-[50px] px-[20px] placeholder:text-gray-3 disabled:bg-white-1 w-[300px] focus:outline-none"
          ref={inputRef}
          type="text"
          placeholder="Enter Player name ..."
        />
        <button
          className="bg-secondary px-[16px] py-[8px] rounded-[8px] text-black"
          onClick={handleAddPlayer}
        >
          Add Player
        </button>
      </div>
      <PlayerList players={players} handleRemovePlayer={handleRemovePlayer} />
    </div>
  );
}
