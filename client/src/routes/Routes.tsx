import { Redirect, Route, Switch } from "react-router-dom";
import AddExpense from "../components/AddExpense";
import EditExpense from "../components/EditExpense";
import Expenses from "../components/Expenses";

function AppRoutes() {
  return (
    <Switch>
      <Route path="/add" component={AddExpense} />
      <Route path="/edit/:id" component={EditExpense} />
      <Route path="/expenses" component={Expenses} />
      <Redirect from="*" to="/" />
    </Switch>
  );
}

export default AppRoutes;
