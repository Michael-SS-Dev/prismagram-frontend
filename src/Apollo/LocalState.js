// Client에 존재하지 않는 State
// API의 state와 유사
// 이 경우 client가 하는 것이 별로 없기 때문에 복잡하지 않음(인증 단계만 수행)

export const defaults = {
  isLoggedIn: Boolean(localStorage.getItem("token")) || false
};

export const resolvers = {
  Mutation: {
    logUserIn: (_, { token }, { cache }) => {
      localStorage.setItem("token", token);
      cache.writeData({
        data: {
          isLoggedIn: true
        }
      });
      return null;
    },
    logUserOut: (_, __, { cache }) => {
      localStorage.removeItem("token");
      // 모든 캐쉬 등 정보 후 새로고침
      window.location.reload();
      return null;
    }
  }
};
