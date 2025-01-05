import { useContext } from "react";
import { AuthContext } from "./auth-provider";
import PropTypes from "prop-types";
import { useRouter } from "next/compat/router";

const PrivateRoute = ({ children }) => {
  const { loading, user } = useContext(AuthContext);
  const router = useRouter();

  if (loading) {
    return <span className="loading loading-dots loading-lg">Loading</span>;
  }

  if (user) {
    console.log({ user });
    return children;
  }

  return router.replace("/");
};

export default PrivateRoute;

PrivateRoute.propTypes = {
  children: PropTypes.node,
};
