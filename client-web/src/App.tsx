import { Route, Routes } from "react-router-dom";
import { Home, Login, Register } from "./pages/public/";

import {
    AddNewCaretaker,
    AddNewDog,
    AddNewKennel,
    Caretakers,
    Dashboard,
    Dogs,
    Kennels,
    Settings,
} from "./pages/protected/adminDashboard/";
import { ProfileSettings, SecuritySettings, UserSettings, Welcome } from "./pages/protected/user";
import { DashboardLayout, Layout, PublicLayout, RequireAuth } from "./components/layout";
import { cn } from "./lib/utils";
import { AllDogsPanel, DogPanel, KennelPanel, UserDashboardLayout } from "./pages/protected/userDashboard";

function App() {
    return (
        <div className={cn("bg-background font-sans antialiased")}>
            <Routes>
                <Route path="/" element={<Layout />}>
                    {/* Public routes */}
                    <Route element={<PublicLayout />}>
                        <Route index element={<Home />} />
                        <Route path="login" element={<Login />} />
                        <Route path="register" element={<Register />} />
                    </Route>

                    {/* Protected routes */}
                    <Route element={<RequireAuth />}>
                        <Route path="/welcome" element={<Welcome />} />
                        {/* Profile Settings */}
                        <Route path="/settings" element={<UserSettings />}>
                            <Route index element={<ProfileSettings />} />
                            <Route path="security" element={<SecuritySettings />} />
                        </Route>
                        {/* Admin Dashboard */}
                        <Route path="/dashboard/:id" element={<DashboardLayout />}>
                            <Route index element={<Dashboard />} />
                            <Route path="settings" element={<Settings />} />
                            <Route path="addNewKennel" element={<AddNewKennel />} />
                            <Route path="kennels" element={<Kennels />} />
                            <Route path="addNewCaretaker" element={<AddNewCaretaker />} />
                            <Route path="caretakers" element={<Caretakers />} />
                            <Route path="addNewDog" element={<AddNewDog />} />
                            <Route path="dogs" element={<Dogs />} />
                        </Route>
                        {/* User Dashboard */}
                        <Route path="/panel/:shelterUuid" element={<UserDashboardLayout />}>
                            <Route index element={<KennelPanel />} />
                            <Route path="dogs" element={<AllDogsPanel />} />
                            <Route path="dog/:dogUuid">
                                <Route index element={<DogPanel />} />
                            </Route>
                        </Route>
                    </Route>
                </Route>
            </Routes>
        </div>
    );
}

export default App;
