import { useState } from "react";
// Hooks의 역할은?

export default defaultValue => {
  const [value, setValue] = useState(defaultValue);
  // use input은 하나의 value를 가지고,
  // useState는 해당 value를 사용할 것이다.
  // useState는 우리에게 value와 setValue를 줄 것이다.
  // onchange라는 함수 (이벤트의 value를 target의 value로 바꾸는)와 value를 최종적으로 리턴하게 될 것이다.
  const onChange = e => {
    const {
      target: { value }
    } = e;
    setValue(value);
  };

  return { value, onChange };
};
