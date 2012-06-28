#if 0
/*
    BaseController.es - Base class for all controllers
 */

public class BaseController extends Controller {

    public var title: String = "switch"
    public var style: String

    function BaseController() {
        // style = home.join("web/style.css")
        before(authorize, { except: ["login", "/"] })
    }

    private function authorize() {
        if (config.app && config.app.autoLogin) {
            session["id"] = config.app.autoLogin
            return 
        }
        id = session["id"]
        if (id == "") {
            inform("Please Login")
            redirect("@User/login")
        }
    }

    public function get authorized(): Boolean
        session["id"] != "" ? true: false

    public function show() {}
}
#endif
