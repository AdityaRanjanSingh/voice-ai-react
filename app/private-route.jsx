import { useContext } from "react";
import { AuthContext } from "@/src/providers/auth-provider";
import PropTypes from "prop-types";
import { useRouter } from "next/navigation";

const PrivateRoute = ({ children }) => {
  const { loading, user } = useContext(AuthContext);
  const router = useRouter();

  if (!router) return null;
  if (loading) {
    return <span className="loading loading-dots loading-lg">Loading</span>;
  }

  if (user) {
    console.log({ user });
    return children;
  }
  return children;
  return router.replace("/");
};

export default PrivateRoute;

PrivateRoute.propTypes = {
  children: PropTypes.node,
};
