# Hook คืออะไร?

React Hooks เป็นฟีเจอร์ใน React 16.8 เพื่อให้นักพัฒนาสามารถใช้งาน state และ lifecycle ใน functional components โดยไม่ต้องใช้ class components ซึ่งทำให้การจัดการ state ได้สะดวกและรวดเร็วมากยิ่งขึ้น hook ที่นิยมใช้คือ useState เพื่อจัดการ state และ useEffect เพื่อจัดการ lifecycle ของ component นอกจากนี้ยังมี hooks อื่นๆ เช่น useContext, useReducer, และ useRef ที่มีประโยชน์ในการจัดการ state และการเข้าถึง DOM และการทำงานของ component ใน React เป็นต้น

# ทำไมต้องเป็น ReactJS Hooks ด้วย?

- Reuse Component ได้ง่ายขึ้น เนื่องจาก Hooks ได้แยกในส่วนของ Logic และ View ออกจากกัน
- Code Clean ขึ้น เนื่องจาก Hooks เปลี่ยนวิธีการจัดการ Life Cycle ที่ยุ่งยาก ให้ง่ายขึ้นกว่าเดิม
- ไม่ต้องใช้ this ในการ Bind Class แล้ว เนื่องจากการเขียน Hooks นั้นต้องเขียนบน Function Component เท่านั้น

# กฎการใช้ Hooks

- ต้องเรียก Hook ที่ส่วน Top Level ของ function เท่านั้น
- ต้องเรียก Hook ภายใน React function เท่านั้น (function components)

# Hook มีอะไรบ้าง

## useState

คือ Hook ที่สามารถเพิ่ม ReactJS state ไปยัง functional component ที่เคยเป็นแบบ stateless ให้เป็น stateful ได้ useState จะ return ค่าเป็น array ตัวแรกคือ state และ ตัวสองคือ function
และทุก ๆ ครั้งที่ state ของเรามีการเปลี่ยนแปลงค่า, component น้ันจะเข้าสู่กระบวนการ re-render ใหม่

```
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button
      type="button"
      onClick={() => setCount((prev) => prev + 1)}
    >
      Plus
    </button>
  )
}
```

## useEffect

คือ Hook ที่สามารถใช้เพื่อบอก React ว่า component ของคุณต้องการทำอะไรบางอย่างหลังจากที่ render แล้ว ซึ่งมันจะถูก execute จาก 3 React component lifecycle ได้แก่ componentDidMount, componentDidUpdate, และ componentWillUnmount lifecycle

```
import { useState, useEffect } from "react";

function FavoriteFood() {
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    setSelected([]);
  }, []);

  useEffect(() => {
    if (contentRef.current) {
      if (selected.length > 0) {
        contentRef.current.style.background = "#FF004D";
      } else {
        contentRef.current.style.background = "#FAEF5D";
      }
    }
  }, [selected]);

  return (
      <div>
        <MultipleSelect
          options={options}
          value={selected}
          onChange={(value) => {
            setSelected(value);
          }}
          placeholder="Favorite Foods"
        />
        <div
          id="content"
          ref={contentRef}
        >
          {selected.length > 0 ? (
            selected.map((item) => (
              <span key={item.value}>{item.label}</span>
            ))
          ) : (
            <>Not Select.</>
          )}
        </div>
      </div>
  )
}
```

## useMemo

คือการ Cache ค่า Value ถูกเรียกครั้งแรกเมื่อมีการ Render และครั้งต่อไปเมื่อมีการ Re-Render และ ค่าใน Array deps มีการเปลี่ยนแปลง โดย Return ออกเป็นค่า Value
useMemo หลักการทำงานก็คือ จะทำการ Cache ข้อมูลเพื่อจำค่าไว้ในหน่วยความจำแคช (Cache Memory) โดยฟังก์ชันจะถูกเรียกใช้งานในครั้งแรกของการ Render และเมื่อค่ามีการเปลี่ยนแปลงเท่านั้น useMemo นำมาแก้ไขปัญหาการ render ที่ซ้ำซ้อน 

```
import { useMemo } from "react";

function Calculation({ data }: { data: number[] }) {
  const result = useMemo(() => {
    return data.map((item) => item * 2);
  }, [data]); 

  return (
    <div>
      <h2>Expensive Calculation Result:</h2>
      <p>{result.join(", ")}</p>
    </div>
  );
}
```

## useCallback

 คือการ Cache Function ไม่ จะถูกเรียกครั้งแรกเมื่อมีการ Render โดยจะถูกเรียกก็ต่อเมื่อสั่ง Call ฟังก์ชัน และ ค่าใน Array deps มีการเปลี่ยนแปลง โดย Return ออกเป็น Function
useCallback มีหลักการทำงานคล้าย ๆ กับ useMemo เลย คือจะจำการทำงานของ “Function” ไว้ในหน่วยความจำแคช และจะถูกเรียกเมื่อค่าตัวแปรที่เซตไว้มีการเปลี่ยนแปลงหรือเมื่อฟังก์ชันถูกเรียกใช้ แต่ไม่ถูกเรียกตอน Re-Render จะต้องเรียกใช้ function เพื่อใช้งาน useCallback นำมาใช้เมื่อมีการเรียก function ซ้ำๆ หรือการคำนวณที่มีความซับซ้อน ทั้ง useMemo และ useCallback ช่วยในเรื่องการ render และ performance

```
import { useCallback, useState, useRef } from "react";

function Player({ data }: { data: number[] }) {
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
    <div>
         <input
          ref={inputRef}
          type="text"
          placeholder="Enter Player name ..."
        />
       <button
          onClick={handleAddPlayer}
        >
          Add Player
        </button>
      </div>
      <PlayerList players={players} handleRemovePlayer={handleRemovePlayer} />
    </div>
  );
}
```

## useContext 

คือ Hook ที่ช่วยในการจัดการกับ global state คล้าย ๆ กับ redux ซึ่งหลักการของเจ้าตัว Context มันจะเป็นการไปบอก component ที่ชั้น parent หรือ top level component ว่าจะให้ค่า context เป็นอย่างไร แล้ว component ลูกที่อยู่ใต้มันจะสามารถนำค่า context ไปใช้ได้

```
import { useContext, createContext, useState } from "react";

const ExampleContext = createContext<ContextType>({} as ContextType);

function Information() {
  const [name, setName] = useState<string>("");

  return (
    <ExampleContext.Provider value={{ name, setName }}>
      <div>
        <h1>Enter your name</h1>
        <FormSection />
        <ViewSection />
      </div>
    </ExampleContext.Provider>
  );
}
```

## useRef 

คือ Hook ที่สามารถเข้าถึงโดยการ Reference ไปที่ DOM element ใช้กับ Functional component สามารถทำ initialValue (.current) ได้ และเมื่อมีการ Re-Render จะไม่สร้างค่า Ref ขึ้นมาใหม่

```
import { useRef, useState } from "react";

function SearchText() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchText, setSearchText] = useState("");

  function handleKeyUp(e: React.KeyboardEvent<HTMLInputElement>) {
    const value = inputRef.current && inputRef.current.value || "";
    if (e.key === "Enter") {
      e.preventDefault();
      setSearchText(value);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  }

  return (
    <div>
      <h1>Enter your name</h1>
      <input
        ref={inputRef}
        onKeyUp={handleKeyUp}
        onKeyDown={handleKeyDown}
        type="text"
        placeholder="Enter text ..."
      />
      <div>
        <b>Name: </b> {searchText}
      </div>
    </div>
  );
}
```

## useReducer 

คือ hook ที่สามารถจัดการ complex state logic ใน components ซึ่งทำให้ code สะอาดและเข้าใจง่ายขึ้น ในอีกมุมมองหนึ่ง useReducer ก็คือ Redux ในเวอร์ชั่นที่ใช้ง่าย โดยตัด middlewares และ store ออก 
useReducer มีการจัดการ state management ที่คล้ายๆกับ useState และ redux โดย useReducer มีวิธีเรียกใช้แบบเดียวกับ useState แต่มีวิธีการทำงานแบบ redux ในเรื่อง stata mamagement มีข้อดีเรื่องเป็น pure function ทำให้ต่อยอดไปเขียน unit test ได้ง่าย

```
import { useReducer } from "react";

const reducer = (state: { count: number }, action: { type: string }) => {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    case "DECREMENT":
      return { count: state.count - 1 };
    default:
      return state;
  }
};

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <div>
      <h1>{state.count}</h1>
      <div>
        <button
          onClick={() => {
            dispatch({ type: "INCREMENT" });
          }}
        >
          Add
        </button>
        <button
          onClick={() => {
            dispatch({ type: "DECREMENT" });
          }}
        >
          Minus
        </button>
      </div>
    </div>
  );
}
```

# สรุป

React Hooks มี hooks ให้ใช้มากมายไม่ว่าจะเป็น useEffect หรือ useState สามารถนำมาใช้ในการพัฒนาซอฟต์แวร์เนื่องจาก React Hooks เป็นเครื่องมือที่สำคัญในการจัดการ state ของแอพพลิเคชันใน React ทำให้การทำงานกับ state และ lifecycle ของ component เป็นเรื่องง่ายและมีประสิทธิภาพ

# แหล่งที่มา

- [Introducing Hooks – React](https://legacy.reactjs.org/docs/hooks-intro.html)
- [React Hooks 101 hooks คืออะไรทำไมต้องใช้](https://devopenworld.com/post/react-hooks-%E0%B8%84%E0%B8%B7%E0%B8%AD%E0%B8%AD%E0%B8%B0%E0%B9%84%E0%B8%A3)
- [[ReactJS] พื้นฐานการใช้ Hook ใน React](https://medium.com/@pratya.yeekhaday/reactjs-%E0%B8%9E%E0%B8%B7%E0%B9%89%E0%B8%99%E0%B8%90%E0%B8%B2%E0%B8%99%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B9%83%E0%B8%8A%E0%B9%89-react-hook-80ffd09a8f42)
