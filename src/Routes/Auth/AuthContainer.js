import React, { useState } from "react";
import AuthPresenter from "./AuthPresenter";
import useInput from "../../Hooks/useInput";
import { useMutation } from "react-apollo-hooks";
import {
  LOG_IN,
  CREATE_ACCOUNT,
  CONFIRM_SECRET,
  LOCAL_LOG_IN
} from "./AuthQueries";
import { toast } from "react-toastify";

export default () => {
  const [action, setAction] = useState("logIn");
  const username = useInput("");
  const firstName = useInput("");
  const lastName = useInput("");
  const secret = useInput("");
  const email = useInput("");
  /*
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
  */

  // 변수로 사용할 requestSecret과의 중복을 필하기 위해 Mutation 붙여줌
  const [requestSecretMutation] = useMutation(LOG_IN, {
    variables: { email: email.value }
  });

  // graphql의 createAcoount 사용
  const [createAccountMutation] = useMutation(CREATE_ACCOUNT, {
    variables: {
      email: email.value,
      username: username.value,
      firstName: firstName.value,
      lastName: lastName.value
    }
  });
  const [confirmSecretMutation] = useMutation(CONFIRM_SECRET, {
    variables: {
      email: email.value,
      secret: secret.value
    }
  });
  const [localLogInMutation] = useMutation(LOCAL_LOG_IN);
  const onSubmit = async e => {
    e.preventDefault();
    //만약 action이 login이고 email이 empty가 아니면 requestSecret을 할 것
    if (action === "logIn") {
      if (email.value !== "") {
        //requestSecret();
        try {
          //const { requestSecret } = await requestSecretMutation();
          // 왜 바꿨는지?
          // returnt 받는게 requestSecret 다이렉트가 아니라 data로 일단 받아야 함
          const {
            data: { requestSecret }
          } = await requestSecretMutation();
          if (!requestSecret) {
            toast.error("You dont have an account yet, create one");
            setTimeout(() => setAction("signUp"), 3000);
          } else {
            toast.success("Check your inbox for your login secret");
          }
        } catch {
          toast.error("Can't request secret, try again");
        }
      } else {
        // validation 체크
        toast.error("Email is required");
      }
    } else if (action === "signUp") {
      // signUp인 경우 validation 체크
      if (
        email.value !== "" &&
        username.value !== "" &&
        firstName.value !== "" &&
        lastName.value !== ""
      ) {
        //createAcoount();
        try {
          //const { createAccount } = await createAccountMutation();
          const {
            data: { createAccount }
          } = await createAccountMutation();
          if (!createAccount) {
            toast.error("Can't create account");
          } else {
            toast.success("Account created! Log In now");
            setTimeout(() => setAction("logIn"), 3000);
          }
        } catch (e) {
          toast.error(e.message);
        }
      } else {
        toast.error("All field are required");
      }
    } else if (action === "confirm") {
      if (secret.value !== "") {
        try {
          const {
            data: { confirmSecret: token }
          } = await confirmSecretMutation();
          // Todo Log user in
          if (token !== "" && token !== undefined) {
            // 위쪽에 정의되어 있는 함수
            localLogInMutation({ variables: { token } });
          } else {
            throw Error();
          }
        } catch {
          toast.error("Cant confirm secret,check again");
        }
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
      secret={secret}
      onSubmit={onSubmit}
    />
  );
};
