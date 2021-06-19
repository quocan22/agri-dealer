import React, { useEffect } from "react";
import useReactRouter from "use-react-router";
import Products from "../Products/Products";
import "./Search.css";

function Search() {
    const {location} = useReactRouter();
    const params = new URLSearchParams(location.search);
    const type = params.get("type");
    const value = params.get("value");

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <div className="root">
            {type === "name" ?
            <p className="search-result-text">Kết quả hiển thị cho: <strong>{value}</strong></p> :
            <p className="search-result-text">Sản phẩm theo danh mục: <strong>{value}</strong></p>
            }
            <p className="search-divider"></p>
            <Products type={type} value={value}/>
        </div>
    );
};

export default Search;