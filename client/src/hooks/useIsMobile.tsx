import { useEffect, useState } from "react";



function useIsMobile() {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 767);

    useEffect(() => {
        setIsMobile(window.innerWidth < 767)
    },[window.innerWidth])

    return isMobile
}


export default useIsMobile