import React, { useState } from "react";
import AuthPresenter from "./AuthPresenter";
import useInput from "../../Hooks/useInput";
import { useMutation } from "react-apollo-hooks";
import { LOG_IN, CREATE_ACCOUNT } from "./AuthQueries";
import { toast } from "react-toastify";

export default () => {
  const [action, setAction] = useState("logIn");
  const username = useInput("");
  const firstName = useInput("");
  const lastName = useInput("");
  const email = useInput("itnico.las.me@gmail.com");
  const requestSecret = useMutation(LOG_IN, {
    // hook의 useInput이 리턴값으로 value와 onchange를 반환함을 기억
    // 에러가 났을 때 오류 내용을 로깅할 알람이 필요함
    update: (_, { data }) => {
      const { requestSecret } = data;
      if (!requestSecret) {
        toast.error("You dont have an account yet, create one");
        setTimeout(() => setAction("signUp"), 3000);
      }
    },
    //위 내용이 알람을 구현한 내용
    variables: { email: email.value }
  });
  const createAccount = useMutation(CREATE_ACCOUNT, {
    variables: {
      email: email.value,
      username: username.value,
      firstName: firstName.value,
      lastName: lastName.value
    }
  });
  const onSubmit = e => {
    if (action === "logIn") {
      if (email.value !== "") {
        requestSecret();
      } else {
        toast.error("Email is required");
      }
    } else if (action === "signUp") {
      if (
        email.value !== "" &&
        username.value !== "" &&
        firstName.value !== "" &&
        lastName.value !== ""
      ) {
        createAccount();
      } else {
        toast.error("All field are required");
      }
    }
  };

  return (
    <AuthPresenter
      setAction={setAction}
      action={action}
      username={username}
      firstName={firstName}
      lastName={lastName}
      email={email}
      onSubmit={onSubmit}
    />
  );
};
