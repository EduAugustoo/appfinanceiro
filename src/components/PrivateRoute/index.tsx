import {
  Redirect,
  Route,
  RouteComponentProps,
  RouteProps,
} from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";

interface IPrivateRouteProps extends RouteProps {
  component: React.ComponentType<RouteComponentProps>;
}

export function PrivateRoute({
  component: Component,
  ...rest
}: IPrivateRouteProps): JSX.Element {
  const { signed } = useAuth();
  return (
    <Route
      {...rest}
      render={(props) =>
        signed ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
}
