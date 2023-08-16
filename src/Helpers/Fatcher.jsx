// export default function Fatch(request, setData, loader) {
//     loader(true)
//     request().then(({ data }) => {
//         setData(data)
//     }).finally(() => {
//         loader(false)
//     });
// }

import { useEffect, useState } from "react";
import { Loader } from "rsuite";

export default function Fatch({ request,params, setData,setError,reload, children }) {

    const [loader, setLoader] = useState(false);

    useEffect(() => {
        setLoader(true)
        request(params).then(({ data }) => {
             setData(data)
        }).catch((err)=>{
            setError(err?.response?.data)
        }).finally(() => {
            setLoader(false)
        })
        
    }, [reload]);


    return <div className="p-2"> {!loader ?  children : <Loader size="xs"  className='flex justify-center p-2' />} </div>
    

}