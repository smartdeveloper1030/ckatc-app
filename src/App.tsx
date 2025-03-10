import { Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import LogInPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import SessionPage from "./pages/SessionPage";
import "@ionic/react/css/core.css";
import "@ionic/react/css/palettes/dark.system.css";

/* Theme variables */
import "./theme/variables.css";
import "./theme/tailwind.css";

import { UserProvider } from "./context/UserContext";
import { TargetProvider } from "./context/TargetContext";

setupIonicReact();

const App = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <UserProvider>
          <TargetProvider>
            <Route exact path="/" component={LogInPage} />
            <Route exact path="/dashboard" component={DashboardPage} />
            <Route exact path="/session" component={SessionPage} />
          </TargetProvider>
        </UserProvider>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
