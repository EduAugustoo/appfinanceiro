import { QueryClientProvider } from "react-query";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import Dashboard from "./components/Dashboard";
import { Login } from "./components/Login";
import { PrivateRoute } from "./components/PrivateRoute";
import { useAuth } from "./hooks/useAuth";
import { queryClient } from "./services/queryClient";
import { GlobalStyle } from "./styles/global";

export default function App(): JSX.Element {
  const { signed } = useAuth();

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Switch>
          <Route path="/login" exact>
            {signed ? <Redirect to="/" /> : <Login />}
          </Route>
          <PrivateRoute path="/" exact component={Dashboard} />
        </Switch>
        <GlobalStyle />
      </QueryClientProvider>
    </BrowserRouter>
  );
}
