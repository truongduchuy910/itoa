import { useApolloClient, useMutation, useSubscription } from "@apollo/client";
import gql from "graphql-tag";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
export const SignInMutation = gql`
  mutation($phone: String!, $password: String!) {
    authenticateUserWithPassword(phone: $phone, password: $password) {
      token
      item {
        id
        phone
        isAdmin
        isSeller
      }
    }
  }
`;
const SignUpMutation = gql`
  mutation($data: UserCreateInput) {
    createUser(data: $data) {
      id
      phone
    }
  }
`;
export const SignOutMutation = gql`
  mutation {
    unauthenticateUser {
      success
    }
  }
`;
const Auth = ({ UI }) => {
  const router = useRouter();
  const client = useApolloClient();
  const [signIn] = useMutation(SignInMutation);
  const [signUp] = useMutation(SignUpMutation);
  const [signOut] = useMutation(SignOutMutation);
  const [notification, setNoti] = useState({ content: "", color: "" });
  const redirect = router.query?.redirect;

  const onSignIn = async (event) => {
    event.preventDefault();
    const phone = event.currentTarget.elements.phone.value;
    const password = event.currentTarget.elements.password.value;
    try {
      await client.clearStore();
      const { data } = await signIn({
        variables: {
          phone: phone,
          password: password,
        },
      });
      if (data.authenticateUserWithPassword) {
        const {
          authenticateUserWithPassword: {
            token,
            item: { id },
          },
        } = data;
        localStorage.setItem("token", token);
        console.log(token);
        await client.resetStore();
        console.log("reset");
        await router.push({ pathname: redirect ? redirect : "/tai-khoan" });
        console.log("tai-khoan");
      }
    } catch (error) {
      console.log(error.toString());
      switch (error.toString()) {
        case `Error: [passwordAuth:failure] Authentication failed`:
          return setNoti({
            color: "var(--color-bg-warning)",
            content: "Sai tên đăng nhập hoặc mật khẩu.",
          });
      }
    }
  };

  const onSignUp = async (event) => {
    event.preventDefault();
    const phone = event.currentTarget.elements.phone?.value;
    const password = event.currentTarget.elements.password?.value;
    const name = event.currentTarget.elements.name?.value;
    // Sign up
    try {
      await client.clearStore();
      const { data, errors } = await signUp({
        variables: {
          data: { name, phone, password },
        },
      });
      setNoti({
        color: "var(--color-bg-success)",
        content: "Đăng kí thành công.",
      });
      await onSignIn({
        preventDefault: () => {},
        currentTarget: {
          elements: { phone: { value: phone }, password: { value: password } },
        },
      });
    } catch (error) {
      console.log(error.toString());
      switch (error.toString()) {
        case `Error: [password:minLength:User:password] Value must be at least 8 characters long.`:
          return setNoti({
            color: "var(--color-bg-warning)",
            content: "Mật khẩu phải dài hơn 8 kí tự.",
          });
        case `Error: E11000 duplicate key error collection: ecom.users index: phone_1 dup key: { phone: "${phone}" }`:
          return setNoti({
            color: "var(--color-bg-warning)",
            content: `Số điện thoại ${phone} đã được sử dụng`,
          });
      }
    }
  };
  const onSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    signOut()
      .then(() => {
        router.push({ pathname: "/signin" }).then(() => {
          reloadApolloState();
        });
      })
      .catch(() => {
        router.push("/");
      });

    client
      .resetStore()
      .then(() => {})
      .catch(() => {});
  };
  return (
    <Fragment>
      <Option
        UI={UI}
        onSignIn={onSignIn}
        onSignUp={onSignUp}
        onSignOut={onSignOut}
      />
      <p
        style={{
          padding: 5,
          backgroundColor: notification.color,
          textAlign: "center",
        }}
      >
        {notification.content}
      </p>
    </Fragment>
  );
};
export default Auth;

const Option = ({ UI, onSignIn, onSignOut, onSignUp }) => {
  return (
    <LUIak onSignIn={onSignIn} onSignUp={onSignUp} onSignOut={onSignOut} />
  );
};
