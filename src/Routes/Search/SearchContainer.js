import React from "react";
import { withRouter } from "react-router-dom";
import SearchPresenter from "./SearchPresenter";
import { useQuery } from "react-apollo-hooks";
import { SEARCH } from "./SearchQueries";

export default withRouter(({ location: { search } }) => {
  const term = search.split("=")[1];
  console.log(term);
  const { data, loading } = useQuery(SEARCH, {
    skip: term === undefined,
    // 특정 변수가 들어오는 경우 쿼리 실행을 하지 않아 에러를 방지한다.
    variables: {
      term
    }
  });
  console.log(data);
  return <SearchPresenter term={term} loading={loading} data={data} />;
});
