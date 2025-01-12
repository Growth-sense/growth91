import { BrowserRouter as Router, Switch, Route, Redirect, } from "react-router-dom";
import { FutureUnicorn } from "../pages/future-unicorn/FutureUnicorn";


const WebsiteRouting = () => (
    <Router>
        <Route path="ui-design" element={<FutureUnicorn />} />
    </Router>
);
export { WebsiteRouting };