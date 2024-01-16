

# React Hook

## Life cycle 
- Initialization // ตอนเริ่ม render component
- Mounting // ตอน component render เสร็จ
- Updation // ตอนค่า State มีการอัพเดท
- Unmonting // ตอน destroy component หรือ ออกจากหน้า component นั้นๆ


## Rules of hooks
- hooks ต้องใช้กับ function component เท่านั้น
- เรียกใช้ hooks ในส่วน top level ของ component ก่อนที่จะมีการ return ใดๆ
- ห้ามเรียกใช้ hooks ใน loop, เงื่อนไข, หรือ function ลึกๆ
- ไม่สามารถ เรียกใช้ hooks ใน function ธรรมดาของ javascript ได้ แต่เราสามารถใช้ใน custom hooks ได้

## useState
useState คือ function นึง ของ hooks ที่ใช้ในการจัดการ state ต่างๆ

และอีกอย่างที่สำคัญ function set state ทำงานแบบ asynchronous ถ้าหากเราเรียกใช้ set state แล้วมันจะทำงานถัดไปต่อโดยทันที โดยไม่รอให้ function set state ทำงานเสร็จ ถ้าหากเราเรียกใช้ set state ติดๆกัน บางทีอาจจะทำให้ state เกิดการผิดพลาดได้

## useEffect

useEffect คือ hook ที่ดำเนินการตาม side effects ต่างๆ (life cycle) ของ React 

## useContext

### React.createContext*
- มันเป็นตัวสร้างContext Objectขึ้นมาเพื่อเก็บข้อมูลที่ต้องการใช้ร่วมกัน, ใช้เป็นProvider, และใช้Subscribe Contextที่Componentsปลายทาง

### Context.Provider*
- การสร้างContext Objectจะมาพร้อมกับProvider ซึ่งเจ้าProviderจะช่วยให้Componentsปลายทางทั้งหลายสามารถSubscribeการเปลี่ยนแปลงข้อมูลภายในContextได้

### Class.contextType (for class component)
- ใช้เพื่อSubscribeข้อมูลภายในContextที่Componentsปลายทาง แต่จะใช้ได้กับ*Class Componentเท่านั้น* และหากSubscribe Contextด้วยวิธีนี้เพียงวิธีเดียวจะทำให้เราสามารถSubscribeได้เพียงหนึ่งContextเท่านั้น

### Context.Consumer
- ใช้เพื่อSubscribeข้อมูลภายในContextที่Componentปลายทาง โดยที่สามารถใช้ได้กับทั้งClassและFunctional Component การSubscribe Context ด้วยวิธีนี้จะทำให้เราสามารถSubscribeได้มากกว่าหนึ่งContext

### React.useContext
- ใช้เพื่อSubscribeข้อมูลภายในContextที่Componentปลายทาง ใช้ได้กับFunctional Componentเท่านั้น การSubscribe Contextด้วยวิธีนี้จะทำให้เราสามารถSubscribeได้มากกว่าหนึ่งContext

วิธีนี้เป็นวิธีที่ง่ายและนิยมที่สุดในการSubscribeข้อมูลจากContext


## useRef
useRef คือ React Hooks ที่สามารถเข้าถึงโดยการ Reference ไปที่ DOM element ใช้กับ Functional component สามารถทำ initialValue (.current) ได้

- createRef คือ วิธีการ Access DOM nodes ด้วยการ Reference ใช้กับ Class component (การทำงานคล้ายกับ useRef)

- forwardRef คือ การส่งต่อ Ref จาก Parent ไปที่ Child เมื่อสร้างเป็น Ref เป็น Component

แม้ว่า createRef ควรใช้กับ Class component
แต่ก็ใช้กับ Functional component ได้เช่นกัน
แต่เมื่อ Component มีการอัปเดต App ก็จะถูก Re-Render ใหม่
createRef ก็จะเริ่มต้น Reference ใหม่ทั้งหมด
ดังนั้นทำให้การอัปเดตค่า current ไม่มีผล
เป็นเหตุผลที่ควรใช้ Hooks useRef แทน

##  สรุป

useRef
- ใช้กับ Functional component
- สามารถกำหนด initialValue (.current) ได้
- เพื่อรักษาค่า Ref ปัจจุบันใช้อยู่ตลอดการใช้งานของ Functional component และเมื่อมีการ Re-Render จะไม่สร้างค่า Ref ขึ้นมาใหม่
- ความสามารถในการทำ Memorize
- อัปเดตค่า .current ได้ (แต่ต้องสั่ง Trigger อะไรบางอย่างให้ Re-Render จากนั้นค่าที่กำหนดถึงจะเปลี่ยนแปลง)

createRef
- ใช้กับ Class component
- เมื่อต้องการรีเช็ต Ref ใหม่ทุกครั้งที่มีการ Re-Render


- ใช้ forwardRef เมื่อต้องการส่งต่อ Ref จาก Parent ไปที่ Child เมื่อสร้างเป็น Ref เป็น Component

## useMemo
- useMemo คือการ Cache ค่า Value ถูกเรียกครั้งแรกเมื่อมีการ Render และครั้งต่อไปเมื่อมีการ Re-Render และ ค่าใน Array deps มีการเปลี่ยนแปลง โดย Return ออกเป็นค่า Value

- useMemo คือ Performance hook อีกตัวที่มีความสามารถสำหรับตัวดำเนินการทำ "memoize"

- สำหรับปัญหาการ Re-Render ที่ทำให้เกิดการ Render ที่หนักหน่วง ตามปกติทุกการ Render จะเกิดการจอง Memory (Memory allocation) และบางทีการ Render Component ซ้ำ ๆ เกินความจำเป็นอาจจะทำให้เกิดการจัดสรรหน่วยความจำอย่างไม่ถูกต้อง (Memory Leak) ได้

## useCallback
useCallback คือการ Cache Function ไม่ ถูกเรียกครั้งแรกเมื่อมีการ Render โดยจะถูกเรียกก็ต่อเมื่อสั่ง Call ฟังก์ชัน และ ค่าใน Array deps มีการเปลี่ยนแปลง โดย Return ออกเป็น Function

### Memoization 
- Memoization คือการทำการจดจำ หรือการ Caching ค่า Result ต่าง ๆ ที่เสียเวลาคำนวณหรือค่าที่ไม่จำเป็นต้องเปลี่ยนแปลงบ่อย ๆ และสามารถเรียกใช้งานได้ทันทีโดยไม่ต้องคำนวณใหม่ทุกครั้ง


## สรุป

หลักการของ useMemo คือการ Cache ข้อมูลไว้
- ถูกเรียกครั้งแรกเมื่อมีการ Render
- ถูกเรียกอีกครั้งเมื่อมีการ Re-Render และ ค่าใน Array deps มีการเปลี่ยนแปลง
- Return ออกเป็นค่า Value

หลักการของ useCallback คือการ Cache ฟังก์ชันไว้
- ไม่ ถูกเรียกเมื่อมีการ Render (จะถูกเรียกเมื่อเราสั่ง Call ฟังก์ชันเอง)
- ถูกเรียกอีกครั้งเมื่อสั่ง Call ฟังก์ชัน และ ค่าใน Array deps มีการเปลี่ยนแปลง
- Return ออกเป็น Function





## ข้อดีของ React Hooks

การที่เราเขียน React แบบใช้ Hooks จะช่วยให้เรา

1. Reuse Component ได้ง่ายขึ้น เนื่องจาก Hooks ได้แยกในส่วนของ Logic และ View ออกจากกัน
2. Code Clean ขึ้น เนื่องจาก Hooks เปลี่ยนวิธีการจัดการ Life Cycle ที่ยุ่งยาก ให้ง่ายขึ้นกว่าเดิม
3. ไม่ต้องใช้ this ในการ Bind Class แล้ว เนื่องจากการเขียน Hooks นั้นต้องเขียนบน Function Component เท่านั้น

