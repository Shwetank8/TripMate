import { Link } from "react-router-dom";

function Header(){
    return(
    <div className="p-3 shadow-sm flex justify-between items-center px-5">
        <Link to="/">
            <img src="/logo.svg"/>
        </Link>
    </div>
    );
}
export default Header