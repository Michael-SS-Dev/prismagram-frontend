import ApolloClient from "apollo-boost";
import { defaults, resolvers } from "./LocalState";

export default new ApolloClient({
  // graphql 붙이지 않고 graphql이 현재 바라보고 있는 주소 입력
  // client와 graphql을 연결하기 위함
  uri: "http://localhost:4000",
  clientState: {
    defaults,
    resolvers
  },
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`
  }
});
