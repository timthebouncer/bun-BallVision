import './layout.css'
import React, {ReactNode} from "react";

const Layout: React.FC<{children: ReactNode}>=({children})=>{
    return (
        <div className="container sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl">
            {children}
        </div>
    )

}

export {Layout}