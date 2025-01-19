import React, { useState } from 'react';

const useMenuButton = ()=>{
    const [open,setOpen] = useState(false)

    return {
        open,setOpen
    }
}
export default useMenuButton