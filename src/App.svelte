<script>
  import { Router, Route } from "svelte-navigator";
  import PrivateRoute from "./util/PrivateRoute.svelte";
  import Links from "./components/Links.svelte";
  import NavBar from "./components/NavBar.svelte";
  import Calendar from "./pages/Calendar.svelte";
  import Expenses from "./pages/Expenses.svelte";
  import Home from "./pages/Home.svelte";
  import Income from "./pages/Income.svelte";
  import Clients from "./pages/Clients.svelte";
  import Settings from "./pages/Settings.svelte";
  import Login from "./pages/Login.svelte";
</script>

<Router>
  <NavBar>
    <Links nameText={"Overblik"} pathText={"/"} />
    <Links nameText={"Kalender"} pathText={"/calendar"} />
    <Links nameText={"Indtægter"} pathText={"/income"} />
    <Links nameText={"Udgifter"} pathText={"/expenses"} />
    <Links nameText={"Kunder"} pathText={"/clients"} />
    <Links nameText={"Indstillinger"} pathText={"/settings"} />
  </NavBar>
  <div>
    <PrivateRoute path="/"><Home /></PrivateRoute>
    <PrivateRoute path="/calendar"><Calendar /></PrivateRoute>
    <PrivateRoute path="/income"><Income /></PrivateRoute>
    <PrivateRoute path="/expenses"><Expenses /></PrivateRoute>
    <PrivateRoute path="/clients"><Clients /></PrivateRoute>
    <PrivateRoute path="/settings"><Settings /></PrivateRoute>
    <Route path="/auth" primary={false} ><Login /></Route>
  </div>
</Router>
