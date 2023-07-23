// export default function Fatch(request, setData, loader) {
//     loader(true)
//     request().then(({ data }) => {
//         console.log('dddata',data)
//         setData(data)
//     }).finally(() => {
//         loader(false)
//     });
// }

import { useEffect, useState } from "react";
import { Loader } from "rsuite";

export default function Fatch({ request, setData,reload, children }) {

    const [loader, setLoader] = useState(false);



    useEffect(() => {
        setLoader(true)
        request().then(({ data }) => {
             setData(data)
        }).finally(() => {
            setLoader(false)
        })
        
        console.log('invoked')
    }, [reload]);

    return !loader ? children : <Loader size="xs"  className='flex justify-center' />
    

}